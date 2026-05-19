import { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { TABS } from '../../constants.js';
import { trackEvent } from '../../utils/eventTracker.js';

/**
 * Tab navigation component for the Canon CIO Command Center.
 * Renders a horizontal tab bar with ARIA tablist/tab roles,
 * keyboard navigation (ArrowLeft, ArrowRight, Home, End, Enter, Space),
 * and event tracking on tab switch.
 *
 * @param {Object} props
 * @param {string} props.activeTab - The currently active tab ID
 * @param {function(string): void} props.onTabChange - Callback invoked with the new tab ID when a tab is selected
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function TabNavigation({ activeTab, onTabChange, className = '' }) {
  const tabRefs = useRef([]);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, TABS.length);
  }, []);

  const handleTabClick = useCallback(
    (tabId) => {
      if (tabId === activeTab) {
        return;
      }
      onTabChange(tabId);
      trackEvent('tab_switch', 'switched_to_tab', tabId);
    },
    [activeTab, onTabChange],
  );

  const focusTab = useCallback((index) => {
    const clampedIndex = ((index % TABS.length) + TABS.length) % TABS.length;
    const tabEl = tabRefs.current[clampedIndex];
    if (tabEl) {
      tabEl.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e, index) => {
      let handled = false;

      switch (e.key) {
        case 'ArrowRight': {
          focusTab(index + 1);
          handled = true;
          break;
        }
        case 'ArrowLeft': {
          focusTab(index - 1);
          handled = true;
          break;
        }
        case 'Home': {
          focusTab(0);
          handled = true;
          break;
        }
        case 'End': {
          focusTab(TABS.length - 1);
          handled = true;
          break;
        }
        case 'Enter':
        case ' ': {
          handleTabClick(TABS[index].id);
          handled = true;
          break;
        }
        default:
          break;
      }

      if (handled) {
        e.preventDefault();
      }
    },
    [focusTab, handleTabClick],
  );

  return (
    <nav
      className={`w-full border-b border-glass-light bg-glass-dark backdrop-blur-md ${className}`.trim()}
      aria-label="Dashboard navigation"
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-1 overflow-x-auto -mb-px"
          role="tablist"
          aria-label="Dashboard tabs"
        >
          {TABS.map((tab, index) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`relative flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-status-blue/50 rounded-t-lg ${
                  isActive
                    ? 'text-white border-b-2 border-status-blue bg-glass-light'
                    : 'text-executive-300 border-b-2 border-transparent hover:text-white hover:bg-glass-light/50'
                }`}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

TabNavigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default memo(TabNavigation);
export { TabNavigation };