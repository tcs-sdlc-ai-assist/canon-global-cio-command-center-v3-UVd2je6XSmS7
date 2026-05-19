import { memo } from 'react';
import PropTypes from 'prop-types';
import { STATUS_BADGES } from '../../constants.js';

/**
 * Reusable status badge component for table cells.
 * Renders a small pill-shaped badge with color coding based on status type.
 *
 * @param {Object} props
 * @param {string} props.status - Status key (excellent, good, warning, critical)
 * @param {string} [props.label] - Optional override label text; defaults to the status badge label from constants
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function StatusBadge({ status, label, className = '' }) {
  const badge = STATUS_BADGES[status];

  if (!badge) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-glass-light text-executive-300 ${className}`.trim()}
        role="status"
        aria-label={`Status: ${label || 'Unknown'}`}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-executive-300" aria-hidden="true" />
        {label || 'Unknown'}
      </span>
    );
  }

  const displayLabel = label || badge.label;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bgColor} ${badge.textColor} ${className}`.trim()}
      role="status"
      aria-label={`Status: ${displayLabel}`}
    >
      <span className={`inline-block w-2 h-2 rounded-full ${badge.dotColor}`} aria-hidden="true" />
      {displayLabel}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default memo(StatusBadge);
export { StatusBadge };