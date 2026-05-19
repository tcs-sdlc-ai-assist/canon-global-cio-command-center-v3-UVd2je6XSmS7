# Canon Global CIO Command Center

Executive dashboard for IT portfolio management and strategic oversight. Built for Canon's Global CIO to provide real-time visibility into business impact, risk governance, innovation, operations, partnerships, and AI-driven insights across all regions.

## Tech Stack

- **[Vite](https://vitejs.dev/)** — Fast build tool and development server
- **[React 18](https://react.dev/)** — UI component library (JavaScript/JSX)
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Chart.js 4](https://www.chartjs.org/)** — Canvas-based charting library
- **[react-chartjs-2](https://react-chartjs-2.js.org/)** — React wrapper for Chart.js
- **[Vitest](https://vitest.dev/)** — Unit testing framework
- **[Testing Library](https://testing-library.com/)** — React component testing utilities

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd canon-cio-command-center
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and adjust values as needed:

```bash
cp .env.example .env
```

See the [Environment Variables](#environment-variables) section below for details.

### 4. Start the development server

```bash
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
```

The production build is output to the `dist/` directory.

### 6. Preview the production build

```bash
npm run preview
```

### 7. Run tests

```bash
npm test
```

To run tests in watch mode during development:

```bash
npm run test:watch
```

### 8. Lint the codebase

```bash
npm run lint
```

## Folder Structure

```
canon-cio-command-center/
├── index.html                          # HTML entry point
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── vitest.config.js                    # Vitest test configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── vercel.json                         # Vercel deployment configuration
├── .env.example                        # Example environment variables
├── src/
│   ├── main.jsx                        # React entry point
│   ├── App.jsx                         # Root application component
│   ├── App.test.jsx                    # Root application tests
│   ├── index.css                       # Global styles and Tailwind directives
│   ├── constants.js                    # Application-wide constants
│   ├── setupTests.js                   # Test setup file
│   ├── components/
│   │   ├── chat/
│   │   │   ├── AIChatAssistant.jsx     # Floating AI chat assistant overlay
│   │   │   └── AIChatAssistant.test.jsx
│   │   ├── common/
│   │   │   ├── ActionChip.jsx          # Chip-to-chat bridge component
│   │   │   ├── ActionChip.test.jsx
│   │   │   ├── AIInsightBlock.jsx      # AI insight block within metric cards
│   │   │   ├── AIInsightPanel.jsx      # AI intelligence summary panel
│   │   │   ├── ChartPanel.jsx          # Reusable Chart.js chart wrapper
│   │   │   ├── ChartPanel.test.jsx
│   │   │   ├── MetricCard.jsx          # KPI metric card component
│   │   │   ├── MetricCard.test.jsx
│   │   │   ├── MetricGroupPanel.jsx    # Grouped metric cards section
│   │   │   ├── StatusBadge.jsx         # Color-coded status badge
│   │   │   └── SummaryTablePanel.jsx   # Executive performance summary table
│   │   ├── layout/
│   │   │   ├── Header.jsx              # Fixed application header
│   │   │   ├── Header.test.jsx
│   │   │   ├── TabNavigation.jsx       # Horizontal tab navigation bar
│   │   │   └── TabNavigation.test.jsx
│   │   └── tabs/
│   │       ├── BusinessImpactTab.jsx   # Budget & Finance tab content
│   │       ├── ExecutiveSummaryTab.jsx  # Executive Summary tab content
│   │       ├── InnovationTab.jsx       # AI Insights tab content
│   │       ├── OperationsTab.jsx       # Infrastructure tab content
│   │       ├── PartnershipsTab.jsx     # Portfolio Health tab content
│   │       ├── RiskGovernanceTab.jsx   # Risk & Compliance tab content
│   │       └── StrategicCommandTab.jsx # Strategic Command tab (default)
│   ├── context/
│   │   └── AIChatContext.jsx           # AI chat state context provider
│   ├── data/
│   │   ├── chatResponses.js            # AI chat keyword-to-response mapping
│   │   └── mockData.js                 # Centralized mock data for all tabs
│   └── utils/
│       └── eventTracker.js             # UI event tracking utility
```

## Tabs & Features

### Strategic Command (Default)

The primary landing view for the CIO. Displays quick action chips, business impact & value creation metrics, risk & governance metrics, innovation & future readiness metrics, an AI intelligence summary panel with strategic priorities and executive actions, and a 12-month strategic performance trends line chart.

### Executive Summary

Operational excellence metric cards (system uptime, MTTR, change success rate, incident volume), a regional performance comparison radar chart, and an executive performance summary table with region-wise breakdowns.

### Budget & Finance

IT business value creation bar chart by category (revenue growth, cost reduction, risk mitigation, customer experience, operational efficiency, innovation) and business value metric cards (portfolio ROI, on-time delivery, budget variance, value delivered).

### Risk & Compliance

Risk & governance metric cards with AI-generated insight text for each metric including compliance score, open risk items, unresolved audit findings, and policy adherence rate.

### Infrastructure

Operations metric cards (cloud adoption, automation coverage, security posture, tech debt ratio) and an incident trends dual-axis chart showing total incidents and P1/P2 incidents as bars with MTTR as a line overlay.

### AI Insights

Innovation portfolio investment allocation doughnut chart across AI/ML, cloud transformation, IoT, blockchain, cybersecurity R&D, process automation, and data & analytics. Innovation & future readiness metric cards.

### Portfolio Health

TCS partnership metric cards (strategic partners, vendor satisfaction, contract compliance, vendor cost avoidance), a partnership timeline line chart, and a partnership strategic intelligence panel with performance excellence and expansion opportunity narratives.

### AI Chat Assistant

A floating chat assistant accessible from any tab via a toggle button in the bottom-right corner. Supports keyword-based canned responses covering board readiness, budget, risk, security, innovation, infrastructure, partnerships, projects, talent, predictive analysis, compliance, and cloud topics. Action chips throughout the dashboard bridge directly to the chat by pre-filling the input.

## Environment Variables

All environment variables are optional. The application uses mocked data by default.

| Variable | Description | Default |
|---|---|---|
| `VITE_APP_TITLE` | Application title displayed in the browser tab and header | `Canon CIO Command Center` |
| `VITE_API_BASE_URL` | API base URL (unused — app uses mocked data) | _(empty)_ |
| `VITE_USE_MOCK_DATA` | Enable or disable mock data | `true` |
| `VITE_LOG_LEVEL` | Log level for development (`debug`, `info`, `warn`, `error`) | `info` |

Environment variables are accessed via `import.meta.env.VITE_*` as per Vite conventions.

## Deployment

### Vercel (Recommended)

The project includes a `vercel.json` configuration file with SPA rewrites pre-configured.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/dashboard).
3. Vercel will auto-detect the Vite framework preset.
4. Set any required environment variables in the Vercel project settings.
5. Deploy. All routes are rewritten to `index.html` for client-side routing support.

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Serve the `dist/` directory with any static file server. Ensure all routes fall back to `index.html` for SPA support.

## Scripts Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Vite development server on port 3000 |
| `build` | `npm run build` | Create optimized production build in `dist/` |
| `preview` | `npm run preview` | Preview the production build locally |
| `test` | `npm test` | Run all tests once with Vitest |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `lint` | `npm run lint` | Lint all JS/JSX files with ESLint |

## License

This project is private and proprietary.