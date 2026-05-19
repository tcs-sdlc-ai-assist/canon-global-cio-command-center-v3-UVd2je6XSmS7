import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { ChartPanel } from '../common/ChartPanel.jsx';
import {
  operationsMetrics,
  incidentTrendsDualAxisChart,
} from '../../data/mockData.js';
import { CHART_COLORS } from '../../constants.js';

/**
 * Transforms raw operations metric data from mockData into the shape expected by MetricGroupPanel
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
 * Builds the Operations metric group
 * @returns {Array} Transformed operations metrics
 */
function getOperationsMetrics() {
  return transformMetrics(operationsMetrics);
}

/**
 * Builds Chart.js-compatible data from incidentTrendsDualAxisChart mock data
 * @returns {Object} Chart.js data object for dual-axis (mixed) chart
 */
function buildDualAxisChartData() {
  return {
    labels: incidentTrendsDualAxisChart.labels,
    datasets: incidentTrendsDualAxisChart.datasets.map((ds) => {
      const color = CHART_COLORS[ds.colorKey] || CHART_COLORS.blue;
      if (ds.type === 'line') {
        return {
          label: ds.label,
          data: ds.data,
          type: 'line',
          borderColor: color.border,
          backgroundColor: color.backgroundOpacity,
          pointBackgroundColor: color.border,
          pointBorderColor: color.border,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2,
          fill: false,
          tension: 0.3,
          yAxisID: 'y1',
        };
      }
      return {
        label: ds.label,
        data: ds.data,
        type: 'bar',
        backgroundColor: color.background,
        borderColor: color.border,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
        yAxisID: 'y',
      };
    }),
  };
}

/**
 * Chart.js options for the incident trends dual-axis chart
 * @type {Object}
 */
const dualAxisChartOptions = {
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
      position: 'left',
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
      title: {
        display: true,
        text: 'Incidents',
        color: 'rgba(138, 162, 198, 0.7)',
        font: {
          family: 'Urbanist',
          size: 11,
        },
      },
    },
    y1: {
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: 'rgba(245, 158, 11, 0.7)',
        font: {
          family: 'Urbanist',
          size: 10,
        },
      },
      title: {
        display: true,
        text: 'MTTR (hours)',
        color: 'rgba(245, 158, 11, 0.7)',
        font: {
          family: 'Urbanist',
          size: 11,
        },
      },
    },
  },
};

/**
 * Operations tab content component.
 * Renders operations metric cards and an incident trends dual-axis chart
 * with incidents (bar) and MTTR (line) over 12 months.
 *
 * @returns {React.ReactElement}
 */
function OperationsTab() {
  const opsMetrics = getOperationsMetrics();
  const dualAxisData = buildDualAxisChartData();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-infrastructure"
      aria-labelledby="tab-infrastructure"
    >
      {/* Operations Metric Cards */}
      <MetricGroupPanel
        title="Operations"
        metrics={opsMetrics}
      />

      {/* Incident Trends Dual-Axis Chart */}
      <ChartPanel
        title="Incident Trends & Resolution Time"
        chartType="mixed"
        data={dualAxisData}
        options={dualAxisChartOptions}
        showExportButton={true}
        showPredictiveButton={true}
      />
    </div>
  );
}

export default memo(OperationsTab);
export { OperationsTab };