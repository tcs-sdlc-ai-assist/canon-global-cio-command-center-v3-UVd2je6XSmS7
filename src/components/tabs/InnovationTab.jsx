import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { ChartPanel } from '../common/ChartPanel.jsx';
import {
  innovationMetrics,
  innovationDoughnutChart,
} from '../../data/mockData.js';
import { CHART_COLORS } from '../../constants.js';

/**
 * Transforms raw innovation metric data from mockData into the shape expected by MetricGroupPanel
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
 * Builds the Innovation metric group
 * @returns {Array} Transformed innovation metrics
 */
function getInnovationMetrics() {
  return transformMetrics(innovationMetrics);
}

/**
 * Builds Chart.js-compatible data from innovationDoughnutChart mock data
 * @returns {Object} Chart.js data object for doughnut chart
 */
function buildDoughnutChartData() {
  return {
    labels: innovationDoughnutChart.labels,
    datasets: innovationDoughnutChart.datasets.map((ds) => {
      const backgroundColors = ds.colorKeys.map((key) => {
        const color = CHART_COLORS[key] || CHART_COLORS.blue;
        return color.background;
      });
      const borderColors = ds.colorKeys.map((key) => {
        const color = CHART_COLORS[key] || CHART_COLORS.blue;
        return color.border;
      });
      return {
        label: ds.label,
        data: ds.data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverOffset: 8,
      };
    }),
  };
}

/**
 * Chart.js options for the innovation portfolio doughnut chart
 * @type {Object}
 */
const doughnutChartOptions = {
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: 'rgba(138, 162, 198, 0.9)',
        font: {
          family: 'Urbanist',
          size: 11,
        },
        padding: 12,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
  },
  cutout: '60%',
};

/**
 * Innovation tab content component.
 * Renders Innovation Portfolio doughnut chart showing investment allocation
 * across AI/ML, Cloud Transformation, IoT, Blockchain, Cybersecurity R&D,
 * Process Automation, and Data & Analytics categories, along with
 * Innovation metric cards.
 *
 * @returns {React.ReactElement}
 */
function InnovationTab() {
  const innovMetrics = getInnovationMetrics();
  const doughnutData = buildDoughnutChartData();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-ai-insights"
      aria-labelledby="tab-ai-insights"
    >
      {/* Innovation Portfolio Doughnut Chart */}
      <ChartPanel
        title="Innovation Portfolio Investment Allocation"
        chartType="doughnut"
        data={doughnutData}
        options={doughnutChartOptions}
        showExportButton={true}
        showPredictiveButton={false}
      />

      {/* Innovation Metric Cards */}
      <MetricGroupPanel
        title="Innovation & Future Readiness"
        metrics={innovMetrics}
      />
    </div>
  );
}

export default memo(InnovationTab);
export { InnovationTab };