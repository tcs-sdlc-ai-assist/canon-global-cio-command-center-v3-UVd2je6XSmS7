/**
 * Centralized mock data for Canon CIO Command Center
 * All dates relative to reference date 2024-06-12
 * @module mockData
 */

import {
  STATUS_EXCELLENT,
  STATUS_GOOD,
  STATUS_WARNING,
  STATUS_CRITICAL,
} from '../constants.js';

// ============================================
// Reference Date
// ============================================

/** @type {string} */
export const REFERENCE_DATE = '2024-06-12';

// ============================================
// Metric Cards by Business Area
// ============================================

/**
 * Business Impact metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const businessImpactMetrics = [
  {
    id: 'bi-revenue-contribution',
    label: 'IT Revenue Contribution',
    value: '$2.4B',
    change: 12.5,
    changeLabel: 'vs last quarter',
    status: STATUS_EXCELLENT,
    icon: 'dollar',
  },
  {
    id: 'bi-cost-optimization',
    label: 'Cost Optimization Savings',
    value: '$340M',
    change: 8.3,
    changeLabel: 'vs target',
    status: STATUS_GOOD,
    icon: 'trending-down',
  },
  {
    id: 'bi-digital-revenue',
    label: 'Digital Revenue Share',
    value: '34.2%',
    change: 5.1,
    changeLabel: 'YoY growth',
    status: STATUS_GOOD,
    icon: 'globe',
  },
  {
    id: 'bi-customer-satisfaction',
    label: 'Customer Satisfaction (IT)',
    value: '92.1%',
    change: 3.2,
    changeLabel: 'vs last survey',
    status: STATUS_EXCELLENT,
    icon: 'smile',
  },
];

/**
 * Risk & Governance metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const riskGovernanceMetrics = [
  {
    id: 'rg-compliance-score',
    label: 'Compliance Score',
    value: '96.8%',
    change: 1.2,
    changeLabel: 'vs last audit',
    status: STATUS_EXCELLENT,
    icon: 'shield',
  },
  {
    id: 'rg-open-risks',
    label: 'Open Risk Items',
    value: '23',
    change: -15.0,
    changeLabel: 'vs last month',
    status: STATUS_WARNING,
    icon: 'alert-triangle',
  },
  {
    id: 'rg-audit-findings',
    label: 'Unresolved Audit Findings',
    value: '7',
    change: -30.0,
    changeLabel: 'vs last quarter',
    status: STATUS_GOOD,
    icon: 'clipboard',
  },
  {
    id: 'rg-policy-adherence',
    label: 'Policy Adherence Rate',
    value: '98.1%',
    change: 0.5,
    changeLabel: 'vs target',
    status: STATUS_EXCELLENT,
    icon: 'check-circle',
  },
];

/**
 * Innovation metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const innovationMetrics = [
  {
    id: 'in-ai-initiatives',
    label: 'Active AI Initiatives',
    value: '47',
    change: 34.3,
    changeLabel: 'vs last quarter',
    status: STATUS_EXCELLENT,
    icon: 'cpu',
  },
  {
    id: 'in-patents-filed',
    label: 'IT Patents Filed (YTD)',
    value: '18',
    change: 28.6,
    changeLabel: 'vs same period LY',
    status: STATUS_GOOD,
    icon: 'award',
  },
  {
    id: 'in-poc-success',
    label: 'PoC Success Rate',
    value: '72.4%',
    change: 5.8,
    changeLabel: 'vs last quarter',
    status: STATUS_GOOD,
    icon: 'zap',
  },
  {
    id: 'in-rd-spend',
    label: 'R&D IT Spend Ratio',
    value: '14.2%',
    change: 2.1,
    changeLabel: 'vs budget plan',
    status: STATUS_GOOD,
    icon: 'bar-chart',
  },
];

/**
 * Operational Excellence metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const operationalExcellenceMetrics = [
  {
    id: 'oe-system-uptime',
    label: 'System Uptime (Global)',
    value: '99.97%',
    change: 0.02,
    changeLabel: 'vs SLA target',
    status: STATUS_EXCELLENT,
    icon: 'server',
  },
  {
    id: 'oe-mttr',
    label: 'Mean Time to Resolve',
    value: '2.3h',
    change: -18.5,
    changeLabel: 'vs last quarter',
    status: STATUS_GOOD,
    icon: 'clock',
  },
  {
    id: 'oe-change-success',
    label: 'Change Success Rate',
    value: '97.2%',
    change: 1.8,
    changeLabel: 'vs last quarter',
    status: STATUS_EXCELLENT,
    icon: 'refresh-cw',
  },
  {
    id: 'oe-incident-volume',
    label: 'P1/P2 Incidents (MTD)',
    value: '12',
    change: -25.0,
    changeLabel: 'vs last month',
    status: STATUS_GOOD,
    icon: 'alert-circle',
  },
];

/**
 * Business Value metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const businessValueMetrics = [
  {
    id: 'bv-portfolio-roi',
    label: 'Portfolio ROI',
    value: '287%',
    change: 14.2,
    changeLabel: 'vs forecast',
    status: STATUS_EXCELLENT,
    icon: 'trending-up',
  },
  {
    id: 'bv-project-on-time',
    label: 'Projects On-Time Delivery',
    value: '84.6%',
    change: -2.3,
    changeLabel: 'vs target 90%',
    status: STATUS_WARNING,
    icon: 'calendar',
  },
  {
    id: 'bv-budget-variance',
    label: 'Budget Variance',
    value: '+3.2%',
    change: 3.2,
    changeLabel: 'over budget',
    status: STATUS_WARNING,
    icon: 'dollar',
  },
  {
    id: 'bv-value-delivered',
    label: 'Value Delivered (YTD)',
    value: '$1.8B',
    change: 22.0,
    changeLabel: 'vs plan',
    status: STATUS_EXCELLENT,
    icon: 'target',
  },
];

/**
 * Operations metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const operationsMetrics = [
  {
    id: 'op-cloud-adoption',
    label: 'Cloud Adoption Rate',
    value: '68.4%',
    change: 7.2,
    changeLabel: 'vs last quarter',
    status: STATUS_GOOD,
    icon: 'cloud',
  },
  {
    id: 'op-automation-rate',
    label: 'Automation Coverage',
    value: '54.7%',
    change: 11.3,
    changeLabel: 'vs last quarter',
    status: STATUS_GOOD,
    icon: 'settings',
  },
  {
    id: 'op-security-score',
    label: 'Security Posture Score',
    value: '91.3',
    change: 2.8,
    changeLabel: 'vs last assessment',
    status: STATUS_EXCELLENT,
    icon: 'lock',
  },
  {
    id: 'op-tech-debt',
    label: 'Tech Debt Ratio',
    value: '18.6%',
    change: -4.2,
    changeLabel: 'vs last quarter',
    status: STATUS_WARNING,
    icon: 'layers',
  },
];

/**
 * Partnerships metrics
 * @type {Array<{id: string, label: string, value: string, change: number, changeLabel: string, status: string, icon: string}>}
 */
export const partnershipsMetrics = [
  {
    id: 'pt-strategic-partners',
    label: 'Strategic Partners',
    value: '24',
    change: 4,
    changeLabel: 'new this year',
    status: STATUS_GOOD,
    icon: 'users',
  },
  {
    id: 'pt-vendor-satisfaction',
    label: 'Vendor Satisfaction Score',
    value: '88.5%',
    change: 3.1,
    changeLabel: 'vs last survey',
    status: STATUS_GOOD,
    icon: 'thumbs-up',
  },
  {
    id: 'pt-contract-compliance',
    label: 'Contract Compliance',
    value: '95.2%',
    change: 1.4,
    changeLabel: 'vs target',
    status: STATUS_EXCELLENT,
    icon: 'file-text',
  },
  {
    id: 'pt-cost-avoidance',
    label: 'Vendor Cost Avoidance',
    value: '$52M',
    change: 18.6,
    changeLabel: 'vs last year',
    status: STATUS_EXCELLENT,
    icon: 'scissors',
  },
];

// ============================================
// Executive Summary Table Data
// ============================================

/**
 * Region-wise executive summary metrics
 * @type {Array<{region: string, budget: string, budgetUtilization: number, activeProjects: number, onTrack: number, atRisk: number, critical: number, uptime: string, incidents: number, status: string}>}
 */
export const executiveSummaryTable = [
  {
    region: 'Americas',
    budget: '$1.2B',
    budgetUtilization: 78.4,
    activeProjects: 142,
    onTrack: 118,
    atRisk: 18,
    critical: 6,
    uptime: '99.98%',
    incidents: 3,
    status: STATUS_GOOD,
  },
  {
    region: 'EMEA',
    budget: '$890M',
    budgetUtilization: 82.1,
    activeProjects: 98,
    onTrack: 84,
    atRisk: 11,
    critical: 3,
    uptime: '99.96%',
    incidents: 5,
    status: STATUS_GOOD,
  },
  {
    region: 'APAC',
    budget: '$760M',
    budgetUtilization: 74.6,
    activeProjects: 87,
    onTrack: 71,
    atRisk: 12,
    critical: 4,
    uptime: '99.99%',
    incidents: 2,
    status: STATUS_EXCELLENT,
  },
  {
    region: 'Japan (HQ)',
    budget: '$1.5B',
    budgetUtilization: 85.3,
    activeProjects: 156,
    onTrack: 132,
    atRisk: 16,
    critical: 8,
    uptime: '99.95%',
    incidents: 7,
    status: STATUS_WARNING,
  },
  {
    region: 'Global Shared',
    budget: '$420M',
    budgetUtilization: 91.2,
    activeProjects: 64,
    onTrack: 58,
    atRisk: 5,
    critical: 1,
    uptime: '99.97%',
    incidents: 1,
    status: STATUS_EXCELLENT,
  },
];

// ============================================
// Chart Datasets
// ============================================

/** @type {string[]} */
const monthLabels = [
  'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023',
  'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024',
  'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
];

/**
 * 12-month IT spend trend data
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKey: string}>}}
 */
export const itSpendTrendChart = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Actual Spend ($M)',
      data: [312, 298, 325, 341, 318, 356, 330, 345, 362, 378, 390, 402],
      colorKey: 'blue',
    },
    {
      label: 'Budget Plan ($M)',
      data: [320, 310, 330, 335, 325, 350, 340, 350, 355, 370, 385, 395],
      colorKey: 'green',
    },
    {
      label: 'Forecast ($M)',
      data: [315, 305, 328, 338, 320, 352, 335, 348, 360, 375, 388, 400],
      colorKey: 'amber',
    },
  ],
};

/**
 * 12-month project delivery trend data
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKey: string}>}}
 */
export const projectDeliveryTrendChart = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Completed',
      data: [18, 22, 15, 24, 20, 28, 19, 23, 26, 21, 27, 30],
      colorKey: 'green',
    },
    {
      label: 'In Progress',
      data: [142, 138, 145, 140, 148, 135, 150, 147, 152, 155, 149, 156],
      colorKey: 'blue',
    },
    {
      label: 'At Risk',
      data: [12, 15, 10, 14, 11, 16, 13, 12, 15, 10, 14, 12],
      colorKey: 'amber',
    },
    {
      label: 'Critical',
      data: [3, 5, 2, 4, 3, 6, 4, 3, 5, 2, 4, 3],
      colorKey: 'red',
    },
  ],
};

/**
 * Regional capability radar chart data
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKey: string}>}}
 */
export const regionalRadarChart = {
  labels: [
    'Cloud Maturity',
    'Security Posture',
    'Innovation Index',
    'Operational Efficiency',
    'Talent Readiness',
    'Digital Adoption',
  ],
  datasets: [
    {
      label: 'Americas',
      data: [85, 88, 78, 82, 75, 80],
      colorKey: 'blue',
    },
    {
      label: 'EMEA',
      data: [78, 85, 72, 80, 70, 76],
      colorKey: 'green',
    },
    {
      label: 'APAC',
      data: [82, 80, 85, 78, 82, 88],
      colorKey: 'purple',
    },
    {
      label: 'Japan (HQ)',
      data: [90, 92, 88, 86, 80, 84],
      colorKey: 'canon',
    },
  ],
};

/**
 * Business value by category bar chart data
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKey: string}>}}
 */
export const businessValueBarChart = {
  labels: [
    'Revenue Growth',
    'Cost Reduction',
    'Risk Mitigation',
    'Customer Experience',
    'Operational Efficiency',
    'Innovation',
  ],
  datasets: [
    {
      label: 'Delivered ($M)',
      data: [480, 340, 220, 310, 280, 170],
      colorKey: 'blue',
    },
    {
      label: 'Target ($M)',
      data: [450, 380, 250, 300, 320, 200],
      colorKey: 'green',
    },
  ],
};

/**
 * Incident trends dual-axis chart data (bar + line)
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKey: string, type: string}>}}
 */
export const incidentTrendsDualAxisChart = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Total Incidents',
      data: [145, 132, 158, 121, 140, 165, 128, 135, 118, 112, 105, 98],
      colorKey: 'blue',
      type: 'bar',
    },
    {
      label: 'P1/P2 Incidents',
      data: [18, 22, 15, 20, 17, 24, 14, 16, 12, 10, 9, 8],
      colorKey: 'red',
      type: 'bar',
    },
    {
      label: 'MTTR (hours)',
      data: [4.2, 3.8, 4.5, 3.5, 4.0, 4.8, 3.2, 3.4, 2.8, 2.6, 2.4, 2.3],
      colorKey: 'amber',
      type: 'line',
    },
  ],
};

/**
 * Innovation portfolio doughnut chart data
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKeys: string[]}>}}
 */
export const innovationDoughnutChart = {
  labels: [
    'AI / Machine Learning',
    'Cloud Transformation',
    'IoT & Edge Computing',
    'Blockchain / Web3',
    'Cybersecurity R&D',
    'Process Automation',
    'Data & Analytics',
  ],
  datasets: [
    {
      label: 'Investment Allocation ($M)',
      data: [120, 95, 45, 15, 65, 80, 70],
      colorKeys: ['blue', 'green', 'purple', 'amber', 'red', 'teal', 'indigo'],
    },
  ],
};

/**
 * Partnership timeline chart data
 * @type {{labels: string[], datasets: Array<{label: string, data: number[], colorKey: string}>}}
 */
export const partnershipTimelineChart = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Active Partnerships',
      data: [18, 18, 19, 19, 20, 20, 21, 21, 22, 23, 23, 24],
      colorKey: 'blue',
    },
    {
      label: 'Joint Initiatives',
      data: [32, 34, 35, 37, 38, 40, 42, 43, 45, 46, 48, 51],
      colorKey: 'green',
    },
    {
      label: 'Value Generated ($M)',
      data: [28, 31, 33, 36, 38, 42, 44, 47, 50, 54, 58, 62],
      colorKey: 'purple',
    },
  ],
};

// ============================================
// AI Insights
// ============================================

/**
 * AI-generated insight texts for the command center
 * @type {Array<{id: string, category: string, title: string, summary: string, detail: string, impact: string, confidence: number, status: string, generatedAt: string}>}
 */
export const aiInsights = [
  {
    id: 'ai-001',
    category: 'Cost Optimization',
    title: 'Cloud Spend Anomaly Detected in EMEA',
    summary: 'EMEA cloud infrastructure costs have increased 23% month-over-month, significantly above the 8% seasonal norm.',
    detail: 'Analysis of EMEA cloud consumption patterns reveals a 23% MoM increase driven primarily by unoptimized compute instances in the Frankfurt and London regions. Approximately 340 instances are running at less than 15% utilization. Right-sizing these instances could yield $4.2M in annual savings without impacting service levels.',
    impact: 'Potential $4.2M annual savings',
    confidence: 94,
    status: STATUS_WARNING,
    generatedAt: '2024-06-12T08:30:00Z',
  },
  {
    id: 'ai-002',
    category: 'Security',
    title: 'Emerging Threat Pattern in APAC Region',
    summary: 'AI threat detection has identified a 340% increase in sophisticated phishing attempts targeting Canon APAC employees.',
    detail: 'Our AI-powered threat intelligence platform has detected a coordinated phishing campaign targeting Canon APAC employees, particularly in the engineering and finance departments. The attacks use deepfake audio in voicemail attachments and highly personalized social engineering. Recommend immediate deployment of enhanced email filtering rules and mandatory security awareness refresher for targeted departments.',
    impact: 'High risk — immediate action recommended',
    confidence: 91,
    status: STATUS_CRITICAL,
    generatedAt: '2024-06-12T07:15:00Z',
  },
  {
    id: 'ai-003',
    category: 'Portfolio Performance',
    title: 'ERP Modernization Program Ahead of Schedule',
    summary: 'The global ERP modernization program is tracking 12 days ahead of schedule with 3.1% budget underrun.',
    detail: 'The SAP S/4HANA migration across all four regions is progressing exceptionally well. Phase 2 (Americas rollout) completed 12 days early due to effective reuse of APAC deployment playbooks. Current budget utilization is at 96.9% of plan, creating a $8.4M buffer that could be reallocated to accelerate Phase 3 (EMEA) by Q3 2024.',
    impact: 'Potential to accelerate EMEA rollout by 6 weeks',
    confidence: 97,
    status: STATUS_EXCELLENT,
    generatedAt: '2024-06-12T09:00:00Z',
  },
  {
    id: 'ai-004',
    category: 'Talent & Workforce',
    title: 'Critical Skill Gap in AI/ML Engineering',
    summary: 'Predictive workforce analytics indicate a 35% shortfall in AI/ML engineering talent by Q4 2024.',
    detail: 'Based on current hiring pipeline velocity, attrition trends, and planned AI initiative expansion, the organization will face a 35% shortfall in qualified AI/ML engineers by Q4 2024. Current time-to-fill for senior AI roles averages 127 days. Recommend a three-pronged approach: accelerate internal upskilling program (200 engineers), expand university partnerships (3 new institutions), and engage 2 specialized staffing firms for contract-to-hire positions.',
    impact: 'Risk to 12 planned AI initiatives in H2 2024',
    confidence: 88,
    status: STATUS_WARNING,
    generatedAt: '2024-06-12T06:45:00Z',
  },
  {
    id: 'ai-005',
    category: 'Infrastructure',
    title: 'Data Center Capacity Optimization Opportunity',
    summary: 'Machine learning analysis of global data center utilization reveals 18% stranded capacity that can be reclaimed.',
    detail: 'Cross-referencing workload patterns, cooling efficiency data, and hardware lifecycle status across 12 global data centers reveals 18% stranded capacity. Primary contributors: legacy test environments (42%), decommissioned project remnants (31%), and over-provisioned disaster recovery allocations (27%). A structured reclamation program could defer $28M in planned capacity expansion while improving PUE by 0.12 points.',
    impact: '$28M CapEx deferral opportunity',
    confidence: 92,
    status: STATUS_GOOD,
    generatedAt: '2024-06-12T10:20:00Z',
  },
  {
    id: 'ai-006',
    category: 'Innovation',
    title: 'Generative AI Adoption Accelerating Beyond Forecast',
    summary: 'Internal GenAI tool adoption has reached 12,400 active users — 180% above the Q2 target of 4,400.',
    detail: 'The Canon AI Assistant platform launched in Q1 2024 has seen explosive adoption across all regions. Key usage patterns: code generation (34%), document summarization (28%), data analysis (22%), and customer communication drafting (16%). Productivity gains measured at 2.4 hours per user per week. Recommend expanding API capacity by 3x and fast-tracking the planned integration with SAP and Salesforce platforms.',
    impact: 'Estimated $45M annual productivity gain',
    confidence: 95,
    status: STATUS_EXCELLENT,
    generatedAt: '2024-06-12T11:00:00Z',
  },
];

// ============================================
// Strategic Priorities
// ============================================

/**
 * Strategic priorities for the CIO
 * @type {Array<{id: string, title: string, description: string, progress: number, status: string, owner: string, dueDate: string}>}
 */
export const strategicPriorities = [
  {
    id: 'sp-001',
    title: 'Global ERP Modernization (S/4HANA)',
    description: 'Complete migration of all regional ERP systems to SAP S/4HANA, enabling real-time analytics and unified business processes across all Canon entities.',
    progress: 64,
    status: STATUS_GOOD,
    owner: 'VP Enterprise Applications',
    dueDate: '2025-03-31',
  },
  {
    id: 'sp-002',
    title: 'Zero Trust Security Architecture',
    description: 'Implement comprehensive Zero Trust security framework across all networks, applications, and data stores to meet evolving threat landscape and regulatory requirements.',
    progress: 48,
    status: STATUS_GOOD,
    owner: 'CISO',
    dueDate: '2025-06-30',
  },
  {
    id: 'sp-003',
    title: 'AI-First Enterprise Strategy',
    description: 'Embed AI capabilities across all major business processes, from manufacturing optimization to customer experience, targeting 50+ production AI use cases by end of FY2024.',
    progress: 72,
    status: STATUS_EXCELLENT,
    owner: 'VP AI & Data',
    dueDate: '2024-12-31',
  },
  {
    id: 'sp-004',
    title: 'Cloud-Native Transformation',
    description: 'Migrate 80% of workloads to cloud-native architectures, reducing on-premises footprint and enabling elastic scalability for global operations.',
    progress: 58,
    status: STATUS_WARNING,
    owner: 'VP Infrastructure & Cloud',
    dueDate: '2025-09-30',
  },
  {
    id: 'sp-005',
    title: 'Digital Customer Experience Platform',
    description: 'Launch unified digital experience platform integrating e-commerce, service portal, and partner ecosystem to drive 40% increase in digital engagement.',
    progress: 35,
    status: STATUS_GOOD,
    owner: 'VP Digital Platforms',
    dueDate: '2025-06-30',
  },
  {
    id: 'sp-006',
    title: 'Data Mesh & Governance Framework',
    description: 'Establish enterprise-wide data mesh architecture with federated governance, enabling self-service analytics while maintaining data quality and compliance.',
    progress: 41,
    status: STATUS_WARNING,
    owner: 'Chief Data Officer',
    dueDate: '2025-03-31',
  },
];

// ============================================
// Executive Actions
// ============================================

/**
 * Pending executive actions requiring CIO attention
 * @type {Array<{id: string, title: string, description: string, priority: string, category: string, requestedBy: string, dueDate: string, estimatedImpact: string}>}
 */
export const executiveActions = [
  {
    id: 'ea-001',
    title: 'Approve $18M Cloud Infrastructure Expansion',
    description: 'APAC region requires additional cloud capacity to support Q3 product launches and growing AI workloads. Three-year commitment with AWS provides 32% discount.',
    priority: STATUS_CRITICAL,
    category: 'Budget Approval',
    requestedBy: 'VP Infrastructure & Cloud',
    dueDate: '2024-06-18',
    estimatedImpact: '$18M investment, $5.8M annual savings',
  },
  {
    id: 'ea-002',
    title: 'Review Cybersecurity Incident Response Plan Update',
    description: 'Updated incident response plan incorporating lessons learned from Q1 tabletop exercises and new regulatory requirements from NIS2 directive.',
    priority: STATUS_WARNING,
    category: 'Governance',
    requestedBy: 'CISO',
    dueDate: '2024-06-20',
    estimatedImpact: 'Regulatory compliance, risk reduction',
  },
  {
    id: 'ea-003',
    title: 'Endorse Strategic Partnership with NVIDIA',
    description: 'Proposed strategic partnership for AI accelerator access, joint R&D on imaging AI, and preferential pricing on enterprise GPU clusters.',
    priority: STATUS_GOOD,
    category: 'Partnership',
    requestedBy: 'VP AI & Data',
    dueDate: '2024-06-25',
    estimatedImpact: '40% reduction in AI training costs',
  },
  {
    id: 'ea-004',
    title: 'Sign-off on Q3 IT Portfolio Rebalancing',
    description: 'Proposed reallocation of $24M from lower-priority initiatives to accelerate AI and cloud transformation programs based on H1 performance review.',
    priority: STATUS_WARNING,
    category: 'Portfolio Management',
    requestedBy: 'VP PMO',
    dueDate: '2024-06-22',
    estimatedImpact: 'Accelerate 8 strategic initiatives by 2-3 months',
  },
  {
    id: 'ea-005',
    title: 'Approve Vendor Consolidation Roadmap',
    description: 'Reduce enterprise software vendor count from 340 to 180 over 18 months, consolidating overlapping tools and negotiating enterprise agreements.',
    priority: STATUS_GOOD,
    category: 'Vendor Management',
    requestedBy: 'VP Procurement',
    dueDate: '2024-06-28',
    estimatedImpact: '$32M annual savings, reduced complexity',
  },
];

// ============================================
// Partnership Narratives
// ============================================

/**
 * Strategic partnership narratives and details
 * @type {Array<{id: string, partner: string, type: string, status: string, description: string, keyInitiatives: string[], annualValue: string, renewalDate: string, healthScore: number}>}
 */
export const partnershipNarratives = [
  {
    id: 'pn-001',
    partner: 'Microsoft',
    type: 'Strategic Alliance',
    status: STATUS_EXCELLENT,
    description: 'Comprehensive enterprise agreement covering Azure cloud, M365, Dynamics 365, and co-innovation on AI-powered imaging solutions.',
    keyInitiatives: [
      'Azure cloud migration (Phase 3)',
      'Copilot enterprise rollout',
      'Joint AI imaging research',
      'Teams-integrated workflow platform',
    ],
    annualValue: '$85M',
    renewalDate: '2026-03-31',
    healthScore: 94,
  },
  {
    id: 'pn-002',
    partner: 'AWS',
    type: 'Cloud Provider',
    status: STATUS_GOOD,
    description: 'Primary cloud provider for APAC workloads and global AI/ML training infrastructure with reserved capacity agreements.',
    keyInitiatives: [
      'APAC workload hosting',
      'SageMaker AI training pipeline',
      'IoT Greengrass edge deployment',
      'Disaster recovery infrastructure',
    ],
    annualValue: '$62M',
    renewalDate: '2025-12-31',
    healthScore: 88,
  },
  {
    id: 'pn-003',
    partner: 'SAP',
    type: 'Enterprise Platform',
    status: STATUS_GOOD,
    description: 'Global ERP backbone with S/4HANA migration program and integrated supply chain management across all manufacturing sites.',
    keyInitiatives: [
      'S/4HANA global rollout',
      'Integrated Business Planning',
      'Ariba procurement network',
      'SuccessFactors HR transformation',
    ],
    annualValue: '$48M',
    renewalDate: '2027-06-30',
    healthScore: 82,
  },
  {
    id: 'pn-004',
    partner: 'NVIDIA',
    type: 'Technology Partner',
    status: STATUS_GOOD,
    description: 'AI accelerator partnership providing GPU compute access, joint R&D on imaging AI, and enterprise AI platform licensing.',
    keyInitiatives: [
      'GPU cluster for AI training',
      'Joint imaging AI research',
      'Omniverse digital twin pilot',
      'Edge AI inference optimization',
    ],
    annualValue: '$22M',
    renewalDate: '2025-09-30',
    healthScore: 90,
  },
  {
    id: 'pn-005',
    partner: 'Accenture',
    type: 'Systems Integrator',
    status: STATUS_WARNING,
    description: 'Primary systems integration partner for large-scale transformation programs including ERP modernization and cloud migration.',
    keyInitiatives: [
      'ERP migration delivery',
      'Cloud transformation advisory',
      'Change management program',
      'Managed services transition',
    ],
    annualValue: '$38M',
    renewalDate: '2025-03-31',
    healthScore: 72,
  },
];

// ============================================
// Quick Action Chips
// ============================================

/**
 * Quick action chip labels for the command center interface
 * @type {Array<{id: string, label: string, category: string}>}
 */
export const quickActionChips = [
  { id: 'qa-001', label: 'View Budget Details', category: 'finance' },
  { id: 'qa-002', label: 'Open Risk Register', category: 'risk' },
  { id: 'qa-003', label: 'Project Portfolio', category: 'portfolio' },
  { id: 'qa-004', label: 'Security Dashboard', category: 'security' },
  { id: 'qa-005', label: 'AI Initiative Tracker', category: 'innovation' },
  { id: 'qa-006', label: 'Vendor Scorecard', category: 'partnerships' },
  { id: 'qa-007', label: 'Infrastructure Health', category: 'infrastructure' },
  { id: 'qa-008', label: 'Compliance Report', category: 'governance' },
  { id: 'qa-009', label: 'Talent Dashboard', category: 'workforce' },
  { id: 'qa-010', label: 'Generate CIO Brief', category: 'ai' },
  { id: 'qa-011', label: 'Schedule Review', category: 'actions' },
  { id: 'qa-012', label: 'Export to PDF', category: 'export' },
];

// ============================================
// Aggregated Metric Groups
// ============================================

/**
 * All metric card groups organized by business area
 * @type {Object<string, Array>}
 */
export const metricGroups = {
  businessImpact: businessImpactMetrics,
  riskGovernance: riskGovernanceMetrics,
  innovation: innovationMetrics,
  operationalExcellence: operationalExcellenceMetrics,
  businessValue: businessValueMetrics,
  operations: operationsMetrics,
  partnerships: partnershipsMetrics,
};

/**
 * All chart datasets organized by chart type
 * @type {Object<string, Object>}
 */
export const chartDatasets = {
  itSpendTrend: itSpendTrendChart,
  projectDeliveryTrend: projectDeliveryTrendChart,
  regionalRadar: regionalRadarChart,
  businessValueBar: businessValueBarChart,
  incidentTrendsDualAxis: incidentTrendsDualAxisChart,
  innovationDoughnut: innovationDoughnutChart,
  partnershipTimeline: partnershipTimelineChart,
};