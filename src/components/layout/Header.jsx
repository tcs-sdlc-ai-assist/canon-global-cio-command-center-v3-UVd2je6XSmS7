import { memo } from 'react';
import { USER_IDENTITY, NOTIFICATION_COUNT, APP_TITLE } from '../../constants.js';

/**
 * Bell icon SVG for notification indicator
 * @returns {React.ReactElement}
 */
function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/**
 * User avatar component displaying initials
 * @param {Object} props
 * @param {string} props.initials - User initials to display
 * @returns {React.ReactElement}
 */
function UserAvatar({ initials }) {
  return (
    <div
      className="flex items-center justify-center w-9 h-9 rounded-full bg-canon-red text-white text-sm font-semibold select-none flex-shrink-0"
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/**
 * Notification bell button with badge count
 * @param {Object} props
 * @param {number} props.count - Number of unread notifications
 * @returns {React.ReactElement}
 */
function NotificationBell({ count }) {
  return (
    <button
      type="button"
      className="relative p-2 rounded-lg text-executive-300 hover:text-white hover:bg-glass-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-executive-900 focus:ring-executive-400/50"
      aria-label={`Notifications: ${count} unread`}
    >
      <BellIcon />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4.5 h-4.5 min-w-[18px] min-h-[18px] px-1 rounded-full bg-canon-red text-white text-[10px] font-bold leading-none"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * Fixed application header component for the Canon CIO Command Center.
 * Displays Canon brand text, subtitle, user identity with avatar,
 * and notification bell with badge count.
 * Uses glass-morphism styling with fixed positioning at the top of the viewport.
 *
 * @returns {React.ReactElement}
 */
function Header() {
  const { name, role, initials } = USER_IDENTITY;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-glass-dark backdrop-blur-lg border-b border-glass-light"
      role="banner"
      aria-label={APP_TITLE}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Section */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold text-white tracking-wide leading-tight lowercase">
                canon
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-executive-300 leading-tight truncate">
                global cio command center
              </span>
            </div>
          </div>

          {/* Right Section: Notifications + User Identity */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Notification Bell */}
            <NotificationBell count={NOTIFICATION_COUNT} />

            {/* Divider */}
            <div
              className="hidden sm:block w-px h-8 bg-glass-medium"
              aria-hidden="true"
            />

            {/* User Identity */}
            <div className="flex items-center gap-2.5" role="group" aria-label="User profile">
              <UserAvatar initials={initials} />
              <div className="hidden sm:flex flex-col min-w-0">
                <span className="text-sm font-semibold text-white leading-tight truncate">
                  {name}
                </span>
                <span className="text-[11px] text-executive-300 leading-tight truncate">
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
export { Header };