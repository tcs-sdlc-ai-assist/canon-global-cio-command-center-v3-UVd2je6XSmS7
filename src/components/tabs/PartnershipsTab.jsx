import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { ChartPanel } from '../common/ChartPanel.jsx';
import { AIInsightPanel } from '../common/AIInsightPanel.jsx';
import {
  partnershipsMetrics,
  partnershipTimelineChart,
} from '../../data/mockData.js';
import { CHART_COLORS } from '../../constants.js';

/**
 * Transforms raw partnerships metric data from mockData into the shape expected by MetricGroupPanel
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
 * Builds the TCS Partnership metric group
 * @returns {Array} Transformed partnerships metrics
 */
function getPartnershipsMetrics() {
  return transformMetrics(partnershipsMetrics);
}

/**
 * Builds Chart.js-compatible data from partnershipTimelineChart mock data
 * @returns {Object} Chart.js data object for bar chart
 */
function buildPartnershipChartData() {
  return {
    labels: partnershipTimelineChart.labels,
    datasets: partnershipTimelineChart.datasets.map((ds) => {
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
        tension: 0.3,
      };
    }),
  };
}

/**
 * Builds AI Intelligence Summary sections for Partnership Strategic Intelligence
 * @returns {Array<{title: string, narrative: string, chips: string[]}>}
 */
function buildPartnershipAISections() {
  return [
    {
      title: 'Performance Excellence',
      narrative:
        'Canon\'s strategic partnership portfolio demonstrates exceptional performance across all key indicators:\n\n' +
        '• Partnership ROI: 287% across 24 active strategic partners, exceeding industry benchmark by 42%\n' +
        '• SLA Compliance: 95.2% contract compliance rate with 88.5% vendor satisfaction score\n' +
        '• Annual Investment: $255M across top-tier technology partners (Microsoft, AWS, SAP, NVIDIA, Accenture)\n' +
        '• Value Delivered: $62M in cumulative value generated through joint initiatives this fiscal year\n' +
        '• Global Footprint: 51 active joint initiatives spanning cloud, AI, ERP, and cybersecurity domains\n\n' +
        'Microsoft partnership health score leads at 94/100, driven by Azure migration progress and Copilot enterprise rollout. Accenture partnership (72/100) requires attention — recommend executive review of delivery KPIs.',
      chips: ['Business Case', 'Contract Strategy'],
    },
    {
      title: 'Expansion Opportunity',
      narrative:
        'Strategic analysis identifies high-value expansion opportunities across the partnership ecosystem:\n\n' +
        '• AI/ML Acceleration: NVIDIA partnership expansion for GPU cluster access and joint imaging AI R&D — projected 40% reduction in AI training costs\n' +
        '• Security Operations Center: Microsoft co-managed SOC leveraging Sentinel and Defender XDR — estimated $8M annual savings vs. standalone deployment\n' +
        '• Intelligent Automation: SAP integration with AI-powered process mining — targeting 30% reduction in manual ERP workflows\n' +
        '• Contract Optimization: Three-year AWS commitment offers 32% discount on reserved capacity — $5.8M annual savings\n' +
        '• Expected Portfolio Value: $420M+ in combined annual value by FY2025 through strategic partner consolidation and deepened co-innovation\n\n' +
        'Recommend prioritizing NVIDIA strategic partnership endorsement (due Jun 25) and AWS capacity expansion approval ($18M investment) to maintain competitive advantage.',
      chips: ['Board Approval', 'Contract Strategy', 'Business Case'],
    },
  ];
}

/**
 * Chart.js options for the partnership timeline chart
 * @type {Object}
 */
const partnershipChartOptions = {
  plugins: {
    legend: {
      position: 'top',
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
 * Partnerships tab content component.
 * Renders TCS Partnership metric cards (Service Excellence, Partnership ROI,
 * Innovation Velocity, Global Delivery Excellence), Partnership Timeline
 * line chart showing active partnerships, joint initiatives, and value
 * generated over 12 months, and a Partnership Strategic Intelligence Panel
 * with Performance Excellence and Expansion Opportunity narratives with
 * action chips.
 *
 * @returns {React.ReactElement}
 */
function PartnershipsTab() {
  const partnerMetrics = getPartnershipsMetrics();
  const chartData = buildPartnershipChartData();
  const aiSections = buildPartnershipAISections();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-portfolio-health"
      aria-labelledby="tab-portfolio-health"
    >
      {/* TCS Partnership Metric Cards */}
      <MetricGroupPanel
        title="TCS Partnership"
        metrics={partnerMetrics}
      />

      {/* Partnership Timeline Chart */}
      <ChartPanel
        title="Partnership Timeline"
        chartType="line"
        data={chartData}
        options={partnershipChartOptions}
        showExportButton={true}
        showPredictiveButton={true}
      />

      {/* Partnership Strategic Intelligence Panel */}
      <AIInsightPanel
        badge="High Confidence"
        sections={aiSections}
      />
    </div>
  );
}

export default memo(PartnershipsTab);
export { PartnershipsTab };