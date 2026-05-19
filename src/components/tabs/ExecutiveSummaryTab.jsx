import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { ChartPanel } from '../common/ChartPanel.jsx';
import { SummaryTablePanel } from '../common/SummaryTablePanel.jsx';
import {
  operationalExcellenceMetrics,
  regionalRadarChart,
  executiveSummaryTable,
} from '../../data/mockData.js';
import { CHART_COLORS } from '../../constants.js';

/**
 * Transforms raw operational excellence metric data from mockData into the shape expected by MetricGroupPanel
 * @param {Array} metrics - Raw metric array from mockData
 * @returns {Array} Transformed metric objects for MetricGroupPanel
 */
function transformMetrics(metrics) {
  return metrics.map((m) => {
    const changePrefix = m.change > 0 ? '+' : '';
    const trendDirection = m.change > 0 ? 'up' : m.change < 0 ? 'down' : 'neutral';
    return {
      id: m.id,
      title: m.label,
      value: m.value,
      trend: `${changePrefix}${m.change}% ${m.changeLabel}`,
      trendDirection,
    };
  });
}

/**
 * Builds the Operational Excellence metric group
 * @returns {Array} Transformed operational excellence metrics
 */
function getOperationalExcellenceMetrics() {
  return transformMetrics(operationalExcellenceMetrics);
}

/**
 * Builds Chart.js-compatible data from regionalRadarChart mock data
 * @returns {Object} Chart.js data object for radar chart
 */
function buildRadarChartData() {
  return {
    labels: regionalRadarChart.labels,
    datasets: regionalRadarChart.datasets.map((ds) => {
      const color = CHART_COLORS[ds.colorKey] || CHART_COLORS.blue;
      return {
        label: ds.label,
        data: ds.data,
        borderColor: color.border,
        backgroundColor: color.backgroundOpacity,
        pointBackgroundColor: color.border,
        pointBorderColor: color.border,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: true,
      };
    }),
  };
}

/**
 * Executive Summary tab content component.
 * Renders operational excellence metric cards, regional performance comparison
 * radar chart, and executive performance summary table.
 *
 * @returns {React.ReactElement}
 */
function ExecutiveSummaryTab() {
  const opExMetrics = getOperationalExcellenceMetrics();
  const radarData = buildRadarChartData();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-executive-summary"
      aria-labelledby="tab-executive-summary"
    >
      {/* Operational Excellence Metrics */}
      <MetricGroupPanel
        title="Operational Excellence"
        metrics={opExMetrics}
      />

      {/* Regional Performance Comparison Radar Chart */}
      <ChartPanel
        title="Regional Performance Comparison"
        chartType="radar"
        data={radarData}
        showExportButton={true}
        showPredictiveButton={false}
      />

      {/* Executive Performance Summary Table */}
      <SummaryTablePanel
        title="Executive Performance Summary"
        data={executiveSummaryTable}
      />
    </div>
  );
}

export default memo(ExecutiveSummaryTab);
export { ExecutiveSummaryTab };