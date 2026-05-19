import { memo } from 'react';
import PropTypes from 'prop-types';
import { MetricCard } from './MetricCard.jsx';

/**
 * Renders a group of MetricCard components under a section heading.
 * Cards are displayed in a responsive CSS grid layout:
 * - 1 column on mobile
 * - 2 columns on tablet (sm)
 * - 3 columns on desktop (lg)
 *
 * @param {Object} props
 * @param {string} props.title - The section heading for the metric group
 * @param {Array<{title: string, value: string|number, trend: string, trendDirection: 'up'|'down'|'neutral', insight: string}>} props.metrics - Array of metric data objects
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement|null}
 */
function MetricGroupPanel({ title, metrics, className = '' }) {
  if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
    return null;
  }

  return (
    <section
      className={`w-full ${className}`.trim()}
      role="region"
      aria-label={`${title} metrics`}
    >
      {title && (
        <h2 className="section-title mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.id || metric.title || index}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            insight={metric.insight}
          />
        ))}
      </div>
    </section>
  );
}

MetricGroupPanel.propTypes = {
  title: PropTypes.string.isRequired,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      trend: PropTypes.string,
      trendDirection: PropTypes.oneOf(['up', 'down', 'neutral']),
      insight: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
};

export default memo(MetricGroupPanel);
export { MetricGroupPanel };