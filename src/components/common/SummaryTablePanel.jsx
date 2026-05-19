import { memo } from 'react';
import PropTypes from 'prop-types';
import { STATUS_BADGES } from '../../constants.js';

/**
 * Status badge component for table cells
 * @param {Object} props
 * @param {string} props.status - Status key (excellent, good, warning, critical)
 * @returns {React.ReactElement}
 */
function StatusBadge({ status }) {
  const badge = STATUS_BADGES[status];

  if (!badge) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-glass-light text-executive-300">
        <span className="inline-block w-2 h-2 rounded-full bg-executive-300" aria-hidden="true" />
        Unknown
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bgColor} ${badge.textColor}`}
      role="status"
      aria-label={`Status: ${badge.label}`}
    >
      <span className={`inline-block w-2 h-2 rounded-full ${badge.dotColor}`} aria-hidden="true" />
      {badge.label}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

/**
 * Returns a color class for budget utilization percentage
 * @param {number} value - Budget utilization percentage
 * @returns {string} Tailwind text color class
 */
function getUtilizationColor(value) {
  if (value >= 90) return 'text-status-amber';
  if (value >= 80) return 'text-status-blue';
  if (value >= 70) return 'text-status-green';
  return 'text-executive-300';
}

/**
 * Returns a color class for incident count
 * @param {number} value - Number of incidents
 * @returns {string} Tailwind text color class
 */
function getIncidentColor(value) {
  if (value >= 7) return 'text-status-amber';
  if (value >= 5) return 'text-executive-200';
  return 'text-status-green';
}

/**
 * Executive Performance Summary table component.
 * Renders a responsive table with region-wise metrics and color-coded status badges.
 * Scroll-safe on mobile with horizontal overflow.
 *
 * @param {Object} props
 * @param {string} props.title - The section heading for the table
 * @param {Array<{region: string, budget: string, budgetUtilization: number, activeProjects: number, onTrack: number, atRisk: number, critical: number, uptime: string, incidents: number, status: string}>} props.data - Array of region row objects
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement|null}
 */
function SummaryTablePanel({ title, data, className = '' }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <section
      className={`w-full ${className}`.trim()}
      role="region"
      aria-label={`${title} table`}
    >
      {title && (
        <h2 className="section-title mb-4">{title}</h2>
      )}
      <div className="glass-card p-0 overflow-hidden transition-all duration-300 hover:shadow-executive-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm" role="table" aria-label={title}>
            <thead>
              <tr className="border-b border-glass-medium">
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Region
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Budget
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Utilization
                </th>
                <th
                  scope="col"
                  className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Active Projects
                </th>
                <th
                  scope="col"
                  className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  On Track
                </th>
                <th
                  scope="col"
                  className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  At Risk
                </th>
                <th
                  scope="col"
                  className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Critical
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Uptime
                </th>
                <th
                  scope="col"
                  className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Incidents
                </th>
                <th
                  scope="col"
                  className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-executive-300"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.region || index}
                  className={`border-b border-glass-light transition-colors duration-200 hover:bg-glass-light ${
                    index === data.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                    {row.region}
                  </td>
                  <td className="px-4 py-3 text-executive-200 whitespace-nowrap">
                    {row.budget}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-glass-light overflow-hidden">
                        <div
                          className="h-full rounded-full bg-status-blue transition-all duration-500"
                          style={{ width: `${Math.min(row.budgetUtilization, 100)}%` }}
                          role="progressbar"
                          aria-valuenow={row.budgetUtilization}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Budget utilization ${row.budgetUtilization}%`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${getUtilizationColor(row.budgetUtilization)}`}>
                        {row.budgetUtilization}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-executive-200">
                    {row.activeProjects}
                  </td>
                  <td className="px-4 py-3 text-center text-status-green font-medium">
                    {row.onTrack}
                  </td>
                  <td className="px-4 py-3 text-center text-status-amber font-medium">
                    {row.atRisk}
                  </td>
                  <td className="px-4 py-3 text-center text-status-red font-medium">
                    {row.critical}
                  </td>
                  <td className="px-4 py-3 text-status-green whitespace-nowrap">
                    {row.uptime}
                  </td>
                  <td className={`px-4 py-3 text-center font-medium ${getIncidentColor(row.incidents)}`}>
                    {row.incidents}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

SummaryTablePanel.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      region: PropTypes.string.isRequired,
      budget: PropTypes.string.isRequired,
      budgetUtilization: PropTypes.number.isRequired,
      activeProjects: PropTypes.number.isRequired,
      onTrack: PropTypes.number.isRequired,
      atRisk: PropTypes.number.isRequired,
      critical: PropTypes.number.isRequired,
      uptime: PropTypes.string.isRequired,
      incidents: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
};

export default memo(SummaryTablePanel);
export { SummaryTablePanel };