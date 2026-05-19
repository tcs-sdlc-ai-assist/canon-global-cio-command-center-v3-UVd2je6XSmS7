import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Trend arrow SVG icon pointing up
 * @returns {React.ReactElement}
 */
function TrendUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Trend arrow SVG icon pointing down
 * @returns {React.ReactElement}
 */
function TrendDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Neutral trend indicator (horizontal dash)
 * @returns {React.ReactElement}
 */
function TrendNeutralIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * AI pulse indicator dot
 * @returns {React.ReactElement}
 */
function AIPulseIndicator() {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full bg-status-blue animate-ai-pulse"
      aria-hidden="true"
    />
  );
}

/**
 * Returns the appropriate color classes for the trend direction
 * @param {'up'|'down'|'neutral'} direction - The trend direction
 * @returns {{ text: string, bg: string }} Color class strings
 */
function getTrendColors(direction) {
  switch (direction) {
    case 'up':
      return { text: 'text-status-green', bg: 'bg-status-green/15' };
    case 'down':
      return { text: 'text-status-red', bg: 'bg-status-red/15' };
    case 'neutral':
    default:
      return { text: 'text-executive-300', bg: 'bg-glass-light' };
  }
}

/**
 * Returns the trend icon component for the given direction
 * @param {'up'|'down'|'neutral'} direction - The trend direction
 * @returns {React.ReactElement}
 */
function getTrendIcon(direction) {
  switch (direction) {
    case 'up':
      return <TrendUpIcon />;
    case 'down':
      return <TrendDownIcon />;
    case 'neutral':
    default:
      return <TrendNeutralIcon />;
  }
}

/**
 * Reusable metric card component for the Canon CIO Command Center.
 * Displays a title, value, trend indicator with directional arrow and color,
 * and an optional AI Analysis insight block with a pulse indicator.
 * Uses glass-morphism styling with hover elevation effect.
 *
 * @param {Object} props
 * @param {string} props.title - The metric title/label
 * @param {string|number} props.value - The metric value to display
 * @param {string} props.trend - The trend description text (e.g., "+12.5% vs last quarter")
 * @param {'up'|'down'|'neutral'} [props.trendDirection='neutral'] - Direction of the trend
 * @param {string} [props.insight] - Optional AI-generated insight text
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function MetricCard({ title, value, trend, trendDirection = 'neutral', insight, className = '' }) {
  const trendColors = getTrendColors(trendDirection);
  const trendIcon = getTrendIcon(trendDirection);

  const trendAriaLabel =
    trendDirection === 'up'
      ? `Trending up: ${trend}`
      : trendDirection === 'down'
        ? `Trending down: ${trend}`
        : `Trend neutral: ${trend}`;

  return (
    <div
      className={`glass-card p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-executive-lg hover:-translate-y-0.5 ${className}`.trim()}
      role="region"
      aria-label={`${title} metric`}
    >
      {/* Title */}
      <p className="kpi-label">{title}</p>

      {/* Value */}
      <p className="kpi-value text-white">{value}</p>

      {/* Trend Indicator */}
      {trend && (
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${trendColors.bg} ${trendColors.text}`}
          aria-label={trendAriaLabel}
        >
          {trendIcon}
          <span>{trend}</span>
        </div>
      )}

      {/* AI Insight Block */}
      {insight && (
        <div className="mt-1 pt-3 border-t border-glass-light">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AIPulseIndicator />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-status-blue">
              AI Analysis
            </span>
          </div>
          <p className="text-xs text-executive-300 leading-relaxed">{insight}</p>
        </div>
      )}
    </div>
  );
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string,
  trendDirection: PropTypes.oneOf(['up', 'down', 'neutral']),
  insight: PropTypes.string,
  className: PropTypes.string,
};

export default memo(MetricCard);
export { MetricCard };