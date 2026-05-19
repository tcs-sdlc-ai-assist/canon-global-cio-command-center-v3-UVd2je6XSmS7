import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAIChatContext } from '../../context/AIChatContext.jsx';
import { trackEvent } from '../../utils/eventTracker.js';

/**
 * Reusable action chip component that bridges to the AI chat assistant.
 * On click, opens the AI chat panel, pre-fills the input with the chip label,
 * and tracks the interaction event.
 *
 * @param {Object} props
 * @param {string} props.label - The text displayed on the chip
 * @param {'action'|'ai-action'} [props.variant='action'] - Visual styling variant
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function ActionChip({ label, variant = 'action', className = '' }) {
  const { openChat, setInputValue } = useAIChatContext();

  const handleClick = useCallback(() => {
    openChat();
    setInputValue(label);
    trackEvent('chip_click', 'clicked_chip', label);
  }, [openChat, setInputValue, label]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  const baseClasses =
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-executive-900';

  const variantClasses =
    variant === 'ai-action'
      ? 'bg-status-blue/15 text-status-blue border border-status-blue/30 hover:bg-status-blue/25 hover:border-status-blue/50 focus:ring-status-blue/50'
      : 'bg-glass-light text-executive-200 border border-glass hover:bg-glass-medium hover:text-white hover:border-glass-medium focus:ring-executive-400/50';

  return (
    <button
      type="button"
      role="button"
      aria-label={label}
      tabIndex={0}
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {label}
    </button>
  );
}

ActionChip.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['action', 'ai-action']),
  className: PropTypes.string,
};

export default ActionChip;