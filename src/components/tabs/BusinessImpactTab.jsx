import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { ChartPanel } from '../common/ChartPanel.jsx';
import {
  businessValueMetrics,
  businessValueBarChart,
} from '../../data/mockData.js';
import { CHART_COLORS } from '../../constants.js';

/**
 * Transforms raw business value metric data from mockData into the shape expected by MetricGroupPanel
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
 * Builds the Business Value metric group
 * @returns {Array} Transformed business value metrics
 */
function getBusinessValueMetrics() {
  return transformMetrics(businessValueMetrics);
}

/**
 * Builds Chart.js-compatible data from businessValueBarChart mock data
 * @returns {Object} Chart.js data object for bar chart
 */
function buildBarChartData() {
  return {
    labels: businessValueBarChart.labels,
    datasets: businessValueBarChart.datasets.map((ds) => {
      const color = CHART_COLORS[ds.colorKey] || CHART_COLORS.blue;
      return {
        label: ds.label,
        data: ds.data,
        backgroundColor: color.background,
        borderColor: color.border,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      };
    }),
  };
}

/**
 * Chart.js options for the business value bar chart with legend hidden
 * @type {Object}
 */
const barChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.06)',
      },
      ticks: {
        color: 'rgba(138, 162, 198, 0.7)',
        font: {
          family: 'Urbanist',
          size: 10,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.06)',
      },
      ticks: {
        color: 'rgba(138, 162, 198, 0.7)',
        font: {
          family: 'Urbanist',
          size: 10,
        },
      },
    },
  },
};

/**
 * Business Impact tab content component.
 * Renders IT Business Value Creation bar chart by category and
 * Business Value metric cards with insight text.
 *
 * @returns {React.ReactElement}
 */
function BusinessImpactTab() {
  const valueMetrics = getBusinessValueMetrics();
  const barData = buildBarChartData();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-budget-finance"
      aria-labelledby="tab-budget-finance"
    >
      {/* IT Business Value Creation Bar Chart */}
      <ChartPanel
        title="IT Business Value Creation"
        chartType="bar"
        data={barData}
        options={barChartOptions}
        showExportButton={true}
        showPredictiveButton={false}
      />

      {/* Business Value Metric Cards */}
      <MetricGroupPanel
        title="Business Value"
        metrics={valueMetrics}
      />
    </div>
  );
}

export default memo(BusinessImpactTab);
export { BusinessImpactTab };