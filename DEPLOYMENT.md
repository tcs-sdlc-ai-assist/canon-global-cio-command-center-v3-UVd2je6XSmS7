# Deployment Guide

Comprehensive deployment documentation for the Canon Global CIO Command Center application.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Environment Variables](#environment-variables)
- [CI/CD via Vercel Git Integration](#cicd-via-vercel-git-integration)
- [Preview Deployments](#preview-deployments)
- [Rollback Procedures](#rollback-procedures)
- [Manual Deployment](#manual-deployment)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Canon CIO Command Center is a static single-page application (SPA) built with Vite and React. It produces a fully static `dist/` directory that can be served by any static hosting provider. Vercel is the recommended hosting platform due to its seamless Git integration, automatic preview deployments, and global CDN.

**Key deployment characteristics:**

- **Build tool:** Vite 5
- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **Routing:** Client-side SPA — all routes must rewrite to `index.html`
- **Runtime dependencies:** None — the app uses mocked data and requires no backend API

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A [Vercel account](https://vercel.com/signup) (for Vercel deployment)
- Repository hosted on GitHub, GitLab, or Bitbucket (for Git integration)

---

## Build Process

### Local Build

```bash
# Install dependencies
npm install

# Run the production build
npm run build
```

This generates an optimized production build in the `dist/` directory with:

- Minified JavaScript bundles with tree-shaking
- Hashed filenames for cache busting (e.g., `index-a1b2c3d4.js`)
- Source maps for debugging (`sourcemap: true` in `vite.config.js`)
- Optimized CSS with Tailwind CSS purging and Autoprefixer

### Preview the Production Build Locally

```bash
npm run preview
```

This starts a local static server serving the `dist/` directory, allowing you to verify the production build before deploying.

### Run Tests Before Deploying

```bash
# Run all tests once
npm test

# Lint the codebase
npm run lint
```

Always ensure tests pass and linting is clean before deploying to production.

---

## Vercel Deployment (Recommended)

### Initial Setup

1. **Push the repository** to GitHub, GitLab, or Bitbucket.

2. **Import the project** in the [Vercel Dashboard](https://vercel.com/dashboard):
   - Click **"Add New…" → "Project"**
   - Select your Git provider and repository
   - Vercel will auto-detect the **Vite** framework preset

3. **Verify build settings** (Vercel auto-detects these, but confirm):

   | Setting | Value |
   |---|---|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
   | Node.js Version | 18.x (or later) |

4. **Configure environment variables** (see [Environment Variables](#environment-variables) below).

5. **Deploy.** Click the deploy button. Vercel will build and deploy the application to a global CDN.

### SPA Rewrite Configuration

The project includes a `vercel.json` file that configures SPA rewrites so that all routes are served by `index.html`. This is essential for client-side routing to work correctly.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This file is committed to the repository and is automatically picked up by Vercel during deployment. **Do not remove or modify this file** unless you are changing the routing strategy.

**What this does:**

- Any request to a path like `/executive-summary` or `/budget-finance` is rewritten to serve `index.html`
- The React application then handles routing on the client side via tab navigation state
- Static assets (JS, CSS, images) are served directly without rewriting

### Custom Domain (Optional)

1. Navigate to your project in the Vercel Dashboard.
2. Go to **Settings → Domains**.
3. Add your custom domain (e.g., `cio.canon.com`).
4. Configure DNS records as instructed by Vercel (CNAME or A record).
5. Vercel automatically provisions and renews SSL certificates.

---

## Environment Variables

All environment variables are **optional**. The application uses mocked data by default and functions fully without any environment configuration.

### Variable Reference

| Variable | Description | Default | Required |
|---|---|---|---|
| `VITE_APP_TITLE` | Application title displayed in the browser tab and header | `Canon CIO Command Center` | No |
| `VITE_API_BASE_URL` | API base URL (unused — app uses mocked data) | _(empty)_ | No |
| `VITE_USE_MOCK_DATA` | Enable or disable mock data | `true` | No |
| `VITE_LOG_LEVEL` | Log level for development (`debug`, `info`, `warn`, `error`) | `info` | No |

### Setting Environment Variables in Vercel

1. Navigate to your project in the Vercel Dashboard.
2. Go to **Settings → Environment Variables**.
3. Add each variable with the appropriate value.
4. Select the target environments:
   - **Production** — applied to production deployments
   - **Preview** — applied to preview deployments (pull request branches)
   - **Development** — applied when using `vercel dev` locally
5. Click **Save**.

> **Important:** Vite environment variables must be prefixed with `VITE_` to be exposed to the client-side bundle. Variables are embedded at build time, not at runtime. Any change to environment variables requires a redeployment.

### Local Development

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env
```

The `.env` file is listed in `.gitignore` and will not be committed to the repository. See `.env.example` for all available variables and their defaults.

---

## CI/CD via Vercel Git Integration

Vercel provides automatic CI/CD through its Git integration. No additional CI/CD configuration (GitHub Actions, CircleCI, etc.) is required for deployment.

### How It Works

1. **Push to the production branch** (typically `main` or `master`):
   - Vercel automatically triggers a production deployment
   - The build runs `npm install` followed by `npm run build`
   - On success, the `dist/` output is deployed to the global CDN
   - The production URL is updated immediately

2. **Push to any other branch or open a pull request:**
   - Vercel automatically creates a [preview deployment](#preview-deployments)
   - A unique URL is generated for the preview
   - The preview URL is posted as a comment on the pull request (GitHub/GitLab)

### Build Pipeline

Each deployment follows this pipeline:

```
Git Push → Vercel Webhook → Install Dependencies → Build → Deploy to CDN
                                (npm install)     (npm run build)
```

### Configuring the Production Branch

By default, Vercel uses the repository's default branch as the production branch. To change this:

1. Go to **Settings → Git** in the Vercel Dashboard.
2. Under **Production Branch**, set the desired branch name.

### Ignored Build Step (Optional)

If you want to skip deployments for certain commits (e.g., documentation-only changes), you can configure an **Ignored Build Step** in Vercel:

1. Go to **Settings → Git → Ignored Build Step**.
2. Set a custom command, for example:

   ```bash
   git diff --quiet HEAD^ HEAD -- src/ index.html package.json vite.config.js tailwind.config.js
   ```

   This skips the build if only files outside the listed paths were changed.

---

## Preview Deployments

Preview deployments are one of Vercel's most powerful features for team collaboration and QA.

### How Preview Deployments Work

- Every push to a non-production branch generates a unique preview URL
- Preview URLs follow the pattern: `https://<project>-<hash>-<team>.vercel.app`
- Each pull request receives a comment with the preview URL
- Preview deployments use the **Preview** environment variables (if configured separately)

### Using Preview Deployments

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/new-dashboard-widget
   ```

2. **Make changes and push:**

   ```bash
   git add .
   git commit -m "Add new dashboard widget"
   git push origin feature/new-dashboard-widget
   ```

3. **Open a pull request** on GitHub/GitLab/Bitbucket.

4. **Vercel automatically deploys** and posts the preview URL as a PR comment.

5. **Share the preview URL** with stakeholders for review.

6. **Merge the pull request** — Vercel automatically deploys to production.

### Preview Environment Variables

To use different environment variable values for preview deployments:

1. Go to **Settings → Environment Variables** in the Vercel Dashboard.
2. When adding or editing a variable, select only the **Preview** checkbox.
3. Set the preview-specific value (e.g., a different `VITE_APP_TITLE` for staging).

---

## Rollback Procedures

Vercel maintains a full deployment history, making rollbacks straightforward.

### Instant Rollback via Dashboard

1. Navigate to your project in the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to the **Deployments** tab.
3. Find the previous stable deployment in the list.
4. Click the **three-dot menu (⋯)** next to the deployment.
5. Select **"Promote to Production"**.
6. The selected deployment is instantly promoted to production with zero downtime.

> **Note:** Rollbacks are instant because Vercel serves pre-built static assets from its CDN. There is no rebuild step — the previous deployment's artifacts are simply re-promoted.

### Rollback via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# List recent deployments
vercel ls

# Promote a specific deployment to production
vercel promote <deployment-url>
```

### Rollback via Git Revert

If you prefer a Git-based rollback:

```bash
# Revert the problematic commit
git revert <commit-hash>

# Push the revert to the production branch
git push origin main
```

Vercel will automatically build and deploy the reverted code.

### Best Practices for Rollbacks

- **Always verify the target deployment** before promoting — click the deployment URL to confirm it works correctly.
- **Check environment variables** — if the issue was caused by an environment variable change, rolling back the deployment alone may not fix it. Revert the environment variable as well.
- **Communicate rollbacks** — notify the team when a rollback is performed and document the reason.

---

## Manual Deployment

If you are not using Vercel, the application can be deployed to any static hosting provider.

### Build and Serve

```bash
# Build the production bundle
npm run build

# The dist/ directory contains all static assets
ls dist/
```

### Static Hosting Requirements

Any static hosting provider must support:

1. **SPA fallback routing** — all non-asset requests must serve `index.html`
2. **Proper MIME types** — JavaScript files served as `application/javascript`, CSS as `text/css`
3. **HTTPS** — recommended for all production deployments

### Example: Nginx Configuration

```nginx
server {
    listen 80;
    server_name cio.canon.com;
    root /var/www/canon-cio-command-center/dist;
    index index.html;

    # SPA fallback — serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively (hashed filenames)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Do not cache index.html
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

### Example: Apache (.htaccess)

```apache
RewriteEngine On
RewriteBase /

# If the requested file or directory does not exist, serve index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

### Example: Docker (Multi-Stage Build)

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Performance Optimization

### Bundle Size

Vite automatically optimizes the production bundle with:

- **Tree-shaking** — removes unused code from dependencies
- **Code splitting** — splits vendor code from application code
- **Minification** — compresses JavaScript and CSS
- **CSS purging** — Tailwind CSS removes unused utility classes in production

To analyze the bundle size:

```bash
# Build and inspect output
npm run build

# Check the dist/ directory size
du -sh dist/

# For detailed bundle analysis, temporarily add rollup-plugin-visualizer:
# (Do not commit this change — use it for local analysis only)
```

**Expected bundle sizes (approximate):**

| Asset | Approximate Size (gzipped) |
|---|---|
| JavaScript (app + vendor) | ~120–160 KB |
| CSS (Tailwind purged) | ~15–25 KB |
| Total initial load | ~140–190 KB |

### CDN Caching

Vercel's global CDN automatically handles caching with optimal headers:

- **Hashed static assets** (`/assets/*.js`, `/assets/*.css`): Served with `Cache-Control: public, max-age=31536000, immutable` — cached for 1 year. Safe because filenames change on every build.
- **`index.html`**: Served with short cache TTL or `stale-while-revalidate` to ensure users always get the latest deployment.
- **Fonts** (Google Fonts): Loaded via `<link rel="preconnect">` in `index.html` for optimal loading performance.

### Additional Performance Notes

- **Font loading:** The Urbanist font is loaded from Google Fonts with `rel="preconnect"` hints in `index.html` to minimize latency.
- **Chart.js lazy rendering:** Charts are rendered only when their respective tab is active, avoiding unnecessary canvas operations on initial load.
- **Memoization:** All tab content components and reusable components use `React.memo()` to prevent unnecessary re-renders during tab switching.
- **Source maps:** Enabled in production (`sourcemap: true` in `vite.config.js`). These are useful for debugging but increase the build output size. To disable for production, set `sourcemap: false` in `vite.config.js`.
- **Image optimization:** The application currently uses no raster images — all icons are inline SVGs, which are included in the JavaScript bundle and require no additional HTTP requests.

### Lighthouse Score Targets

| Category | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 90+ |

---

## Troubleshooting

### Build Failures on Vercel

**Symptom:** Deployment fails during the build step.

**Common causes and fixes:**

1. **Node.js version mismatch:**
   - Go to **Settings → General → Node.js Version** in the Vercel Dashboard.
   - Set to **18.x** or later.

2. **Missing dependencies:**
   - Ensure `package-lock.json` is committed to the repository.
   - Vercel uses `npm ci` by default, which requires a lockfile.

3. **Environment variable issues:**
   - Verify all required `VITE_*` variables are set in the Vercel Dashboard.
   - Remember that Vite embeds environment variables at build time.

### SPA Routing Not Working

**Symptom:** Navigating directly to a URL (e.g., refreshing the page) returns a 404.

**Fix:** Ensure `vercel.json` is present in the repository root with the SPA rewrite rule:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Stale Content After Deployment

**Symptom:** Users see an old version of the application after a new deployment.

**Fix:** This is typically a browser caching issue. Vite uses content-hashed filenames for all assets, so a hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) should load the latest version. If the issue persists, verify that `index.html` is not being aggressively cached by a CDN or proxy.

### Preview Deployment Not Appearing

**Symptom:** No preview URL is generated for a pull request.

**Fix:**
1. Verify the Vercel Git integration is properly connected in **Settings → Git**.
2. Check that the branch is not excluded in **Settings → Git → Ignored Build Step**.
3. Ensure the repository webhook is active in your Git provider's settings.

---

## Quick Reference

| Task | Command / Action |
|---|---|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Run tests | `npm test` |
| Run tests in watch mode | `npm run test:watch` |
| Lint codebase | `npm run lint` |
| Deploy to Vercel | Push to `main` branch |
| Create preview deployment | Push to any non-`main` branch |
| Rollback | Vercel Dashboard → Deployments → Promote previous deployment |