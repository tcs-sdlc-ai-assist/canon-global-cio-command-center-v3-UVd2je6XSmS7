import { memo } from 'react';
import { MetricGroupPanel } from '../common/MetricGroupPanel.jsx';
import { riskGovernanceMetrics } from '../../data/mockData.js';

/**
 * Transforms raw risk governance metric data from mockData into the shape expected by MetricGroupPanel
 * @param {Array} metrics - Raw metric array from mockData
 * @returns {Array} Transformed metric objects for MetricGroupPanel
 */
function transformMetrics(metrics) {
  return metrics.map((m) => {
    const changePrefix = m.change > 0 ? '+' : '';
    const trendDirection = m.change > 0 ? 'up' : m.change < 0 ? 'down' : 'neutral';

    let insight = '';
    switch (m.id) {
      case 'rg-compliance-score':
        insight =
          'Compliance score trending upward across all regions. NIS2 directive alignment at 94% — recommend finalizing incident response plan update by Jun 20 deadline to maintain regulatory posture.';
        break;
      case 'rg-open-risks':
        insight =
          'Open risk items reduced 15% month-over-month through accelerated remediation cycles. APAC phishing campaign remains the highest-priority item requiring immediate CISO escalation.';
        break;
      case 'rg-audit-findings':
        insight =
          'Unresolved audit findings down 30% quarter-over-quarter. Remaining 7 findings are concentrated in EMEA data residency controls — targeted remediation plan in progress for Q3 closure.';
        break;
      case 'rg-policy-adherence':
        insight =
          'Policy adherence rate exceeds target by 0.5%. Automated policy enforcement coverage expanded to 87% of IT assets, reducing manual compliance overhead by an estimated 1,200 hours per quarter.';
        break;
      default:
        break;
    }

    return {
      id: m.id,
      title: m.label,
      value: m.value,
      trend: `${changePrefix}${m.change}% ${m.changeLabel}`,
      trendDirection,
      insight,
    };
  });
}

/**
 * Builds the Risk & Governance metric group with AI insights
 * @returns {Array} Transformed risk governance metrics
 */
function getRiskGovernanceMetrics() {
  return transformMetrics(riskGovernanceMetrics);
}

/**
 * Risk & Governance tab content component.
 * Renders risk governance metric cards with AI insight text for each metric
 * including Compliance Score, Open Risk Items, Unresolved Audit Findings,
 * and Policy Adherence Rate.
 *
 * @returns {React.ReactElement}
 */
function RiskGovernanceTab() {
  const riskMetrics = getRiskGovernanceMetrics();

  return (
    <div
      className="flex flex-col gap-6 w-full animate-fade-in"
      role="tabpanel"
      id="tabpanel-risk-compliance"
      aria-labelledby="tab-risk-compliance"
    >
      {/* Risk & Governance Metric Cards */}
      <MetricGroupPanel
        title="Risk & Governance"
        metrics={riskMetrics}
      />
    </div>
  );
}

export default memo(RiskGovernanceTab);
export { RiskGovernanceTab };