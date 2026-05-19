import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { ChartPanel } from '../common/ChartPanel.jsx';
import { AIInsightPanel } from '../common/AIInsightPanel.jsx';
import { ActionChip } from '../common/ActionChip.jsx';
import {
  businessImpactMetrics,
  businessValueMetrics,
  riskGovernanceMetrics,
  innovationMetrics,
  itSpendTrendChart,
  strategicPriorities,
  executiveActions,
} from '../../data/mockData.js';
import { CHART_COLORS } from '../../constants.js';

/**
 * Quick action chip labels for the Strategic Command tab
 * @type {string[]}
 */
const QUICK_ACTION_LABELS = [
  'Q4 board presentation ready',
  'TCS contract expansion analysis',
  'Risk mitigation recommendations',
  'Innovation portfolio ROI',
  'Budget variance deep dive',
  'Predictive workforce analytics',
];

/**
 * Transforms raw metric data from mockData into the shape expected by MetricGroupPanel
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
 * Builds the Business Impact & Value Creation metric group
 * Combines businessImpactMetrics and businessValueMetrics
 * @returns {Array} Combined and transformed metrics
 */
function getBusinessImpactMetrics() {
  return transformMetrics(businessImpactMetrics);
}

/**
 * Builds the Risk & Governance metric group
 * @returns {Array} Transformed risk governance metrics
 */
function getRiskGovernanceMetrics() {
  return transformMetrics(riskGovernanceMetrics);
}

/**
 * Builds the Innovation & Future Readiness metric group
 * @returns {Array} Transformed innovation metrics
 */
function getInnovationMetrics() {
  return transformMetrics(innovationMetrics);
}

/**
 * Builds Chart.js-compatible data from itSpendTrendChart mock data
 * @returns {Object} Chart.js data object
 */
function buildChartData() {
  return {
    labels: itSpendTrendChart.labels,
    datasets: itSpendTrendChart.datasets.map((ds) => {
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
 * Builds AI Intelligence Summary sections from strategic priorities and executive actions
 * @returns {Array<{title: string, narrative: string, chips: string[]}>}
 */
function buildAISections() {
  const priorityNarrative = strategicPriorities
    .slice(0, 3)
    .map((sp) => `• ${sp.title}: ${sp.progress}% complete — ${sp.description.split(',')[0]}`)
    .join('\n');

  const actionNarrative = executiveActions
    .slice(0, 3)
    .map((ea) => `• ${ea.title} (Due: ${ea.dueDate}) — ${ea.estimatedImpact}`)
    .join('\n');

  return [
    {
      title: 'Strategic Priorities',
      narrative: `Top strategic initiatives driving Canon's IT transformation:\n\n${priorityNarrative}\n\nAll priorities are being tracked against quarterly milestones with executive sponsorship confirmed.`,
      chips: ['View all priorities', 'Risk mitigation recommendations', 'Innovation portfolio ROI'],
    },
    {
      title: 'Executive Actions Requiring Attention',
      narrative: `Pending decisions that require CIO sign-off:\n\n${actionNarrative}\n\nTimely action on these items will maintain strategic momentum and unlock projected savings.`,
      chips: ['Budget variance deep dive', 'TCS contract expansion analysis', 'Predictive workforce analytics'],
    },
  ];
}

/**
 * Strategic Command tab content component.
 * Renders quick actions, grouped metric cards, AI intelligence summary,
 * and a 12-month strategic performance trends chart.
 *
 * @returns {React.ReactElement}
 */
function StrategicCommandTab() {
  const businessMetrics = getBusinessImpactMetrics();
  const riskMetrics = getRiskGovernanceMetrics();
  const innovMetrics = getInnovationMetrics();
  const chartData = buildChartData();
  const aiSections = buildAISections();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-executive-summary"
      aria-labelledby="tab-executive-summary"
    >
      {/* Quick Actions Section */}
      <section
        className="w-full"
        role="region"
        aria-label="Quick Actions"
      >
        <h2 className="section-title mb-4">Quick Actions</h2>
        <div className="flex flex-wrap items-center gap-2">
          {QUICK_ACTION_LABELS.map((label) => (
            <ActionChip key={label} label={label} variant="ai-action" />
          ))}
        </div>
      </section>

      {/* Business Impact & Value Creation Metrics */}
      <MetricGroupPanel
        title="Business Impact & Value Creation"
        metrics={businessMetrics}
      />

      {/* Risk & Governance Metrics */}
      <MetricGroupPanel
        title="Risk & Governance"
        metrics={riskMetrics}
      />

      {/* Innovation & Future Readiness Metrics */}
      <MetricGroupPanel
        title="Innovation & Future Readiness"
        metrics={innovMetrics}
      />

      {/* Strategic AI Intelligence Summary Panel */}
      <AIInsightPanel
        badge="High Confidence"
        sections={aiSections}
      />

      {/* 12-Month Strategic Performance Trends Chart */}
      <ChartPanel
        title="12-Month Strategic Performance Trends"
        chartType="line"
        data={chartData}
        showExportButton={true}
        showPredictiveButton={true}
      />
    </div>
  );
}

export default memo(StrategicCommandTab);
export { StrategicCommandTab };