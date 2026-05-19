/**
 * AI Chat canned response mapping and response selection logic
 * Maps keywords to executive-style canned responses for the AI chat assistant
 * @module chatResponses
 */

/**
 * Keyword-to-response mapping for AI chat assistant
 * Each key is a lowercase keyword; value is the canned executive-style response
 * @type {Object<string, string>}
 */
const responseMap = {
  board: 'Based on the latest portfolio analysis, here is your board-ready summary:\n\n' +
    '• IT portfolio ROI stands at 287%, exceeding forecast by 14.2%\n' +
    '• Global system uptime is 99.97%, surpassing SLA targets\n' +
    '• 47 active AI initiatives are driving $45M in estimated annual productivity gains\n' +
    '• ERP modernization (S/4HANA) is 12 days ahead of schedule with a 3.1% budget underrun\n' +
    '• Key risk: APAC phishing campaign requires immediate CISO escalation\n\n' +
    'Recommendation: Highlight AI-first strategy momentum and cloud transformation progress as key wins. Flag the APAC security threat and AI/ML talent gap as items requiring board awareness.',

  tcs: 'Technology Capability Summary (TCS) for Canon Global IT:\n\n' +
    '• Cloud Maturity: 68.4% adoption rate, up 7.2% QoQ — on track for 80% target by 2025\n' +
    '• Security Posture: Score of 91.3/100, with Zero Trust architecture at 48% deployment\n' +
    '• AI/ML Readiness: 47 active initiatives, GenAI platform at 12,400 users (180% above target)\n' +
    '• Automation Coverage: 54.7%, increasing 11.3% QoQ\n' +
    '• Data & Analytics: Data mesh framework at 41% completion\n\n' +
    'Japan HQ leads in cloud maturity (90%) and security posture (92%). APAC leads in innovation index (85%) and digital adoption (88%).',

  risk: 'Current Risk Landscape Overview:\n\n' +
    '• Open Risk Items: 23 (down 15% from last month)\n' +
    '• Compliance Score: 96.8% (up 1.2% from last audit)\n' +
    '• Unresolved Audit Findings: 7 (down 30% QoQ)\n' +
    '• Policy Adherence Rate: 98.1%\n\n' +
    'Critical Alert: AI threat detection has identified a 340% increase in sophisticated phishing attempts targeting Canon APAC employees, particularly in engineering and finance departments. Attacks use deepfake audio and highly personalized social engineering.\n\n' +
    'Recommended Actions:\n1. Deploy enhanced email filtering rules immediately\n2. Mandate security awareness refresher for targeted departments\n3. Review and update incident response plan per NIS2 directive requirements',

  innovation: 'Innovation Portfolio Status:\n\n' +
    '• Active AI Initiatives: 47 (up 34.3% QoQ)\n' +
    '• IT Patents Filed (YTD): 18 (up 28.6% vs same period last year)\n' +
    '• PoC Success Rate: 72.4% (up 5.8% QoQ)\n' +
    '• R&D IT Spend Ratio: 14.2%\n\n' +
    'Investment Allocation:\n- AI/ML: $120M | Cloud Transformation: $95M | Process Automation: $80M\n- Data & Analytics: $70M | Cybersecurity R&D: $65M | IoT & Edge: $45M\n\n' +
    'Highlight: Canon AI Assistant platform has reached 12,400 active users — 180% above Q2 target. Productivity gains measured at 2.4 hours per user per week, translating to an estimated $45M annual productivity gain. Recommend expanding API capacity by 3x and fast-tracking SAP/Salesforce integration.',

  budget: 'Budget & Financial Overview:\n\n' +
    '• Total IT Budget: $4.77B across all regions\n' +
    '• Current Spend (Jun 2024): $402M (Budget Plan: $395M)\n' +
    '• Budget Variance: +3.2% over budget\n' +
    '• Cost Optimization Savings: $340M (8.3% above target)\n' +
    '• IT Revenue Contribution: $2.4B (up 12.5% QoQ)\n\n' +
    'Regional Utilization:\n- Japan HQ: 85.3% of $1.5B | Americas: 78.4% of $1.2B\n- EMEA: 82.1% of $890M | APAC: 74.6% of $760M\n- Global Shared: 91.2% of $420M\n\n' +
    'Action Items: EMEA cloud costs increased 23% MoM — 340 instances running below 15% utilization. Right-sizing could yield $4.2M in annual savings. Also, $28M CapEx deferral opportunity identified through data center capacity reclamation.',

  security: 'Security Posture Assessment:\n\n' +
    '• Security Posture Score: 91.3/100 (up 2.8 from last assessment)\n' +
    '• Zero Trust Architecture: 48% deployed (target: 100% by Jun 2025)\n' +
    '• P1/P2 Security Incidents (MTD): 8 (down from 18 twelve months ago)\n' +
    '• Mean Time to Resolve: 2.3 hours (down 18.5% QoQ)\n\n' +
    'Critical Threat Alert: Coordinated phishing campaign targeting APAC employees detected — 340% increase in sophisticated attempts using deepfake audio and personalized social engineering.\n\n' +
    'Pending Action: Review updated Cybersecurity Incident Response Plan incorporating NIS2 directive requirements and Q1 tabletop exercise lessons learned (due Jun 20).',

  partnership: 'Strategic Partnership Portfolio:\n\n' +
    '• Active Strategic Partners: 24 (4 new this year)\n' +
    '• Vendor Satisfaction Score: 88.5%\n' +
    '• Contract Compliance: 95.2%\n' +
    '• Vendor Cost Avoidance: $52M (up 18.6% YoY)\n\n' +
    'Key Partnerships:\n- Microsoft ($85M/yr, Health: 94/100): Azure migration, Copilot rollout, joint AI imaging R&D\n- AWS ($62M/yr, Health: 88/100): APAC workloads, SageMaker AI training, IoT edge\n- SAP ($48M/yr, Health: 82/100): S/4HANA global rollout, IBP, Ariba\n- NVIDIA ($22M/yr, Health: 90/100): GPU clusters, joint imaging AI, Omniverse pilot\n- Accenture ($38M/yr, Health: 72/100): ERP delivery, cloud advisory — needs attention\n\n' +
    'Pending Action: Endorse strategic partnership with NVIDIA for AI accelerator access and preferential GPU pricing (due Jun 25).',

  predictive: 'Predictive Analysis & Forward-Looking Insights:\n\n' +
    '1. Cloud Spend Trajectory: At current growth rates, EMEA cloud costs will exceed budget by $12M by Q4 2024 unless optimization measures are implemented immediately.\n\n' +
    '2. AI/ML Talent Gap: Predictive workforce analytics indicate a 35% shortfall in AI/ML engineering talent by Q4 2024. Current time-to-fill for senior AI roles averages 127 days.\n\n' +
    '3. ERP Modernization: If Phase 2 savings patterns hold, Phase 3 (EMEA) can be accelerated by 6 weeks, potentially completing global rollout 2 months ahead of the Mar 2025 deadline.\n\n' +
    '4. GenAI Adoption: At current adoption velocity, the Canon AI Assistant will reach 20,000+ users by Q4 2024, requiring 3x API capacity expansion.\n\n' +
    '5. Vendor Consolidation: Reducing vendor count from 340 to 180 over 18 months is projected to yield $32M in annual savings and measurably reduce operational complexity.',

  cloud: 'Cloud Infrastructure Status:\n\n' +
    '• Cloud Adoption Rate: 68.4% (up 7.2% QoQ, target: 80% by 2025)\n' +
    '• Cloud-Native Transformation: 58% complete\n' +
    '• Primary Providers: Azure (EMEA/Americas), AWS (APAC/AI workloads)\n\n' +
    'Key Issues:\n- EMEA cloud costs up 23% MoM — 340 underutilized instances identified\n- APAC region requires $18M cloud capacity expansion for Q3 product launches\n- Three-year AWS commitment offers 32% discount\n\n' +
    'Recommendation: Approve APAC expansion ($18M, yielding $5.8M annual savings) and initiate EMEA right-sizing program ($4.2M annual savings potential).',

  project: 'Project Portfolio Summary:\n\n' +
    '• Total Active Projects: 547 across all regions\n' +
    '• On Track: 463 (84.6%)\n' +
    '• At Risk: 62 (11.3%)\n' +
    '• Critical: 22 (4.0%)\n' +
    '• On-Time Delivery Rate: 84.6% (target: 90%)\n' +
    '• Portfolio ROI: 287% (14.2% above forecast)\n' +
    '• Value Delivered (YTD): $1.8B (22% above plan)\n\n' +
    'Spotlight: ERP Modernization Program tracking 12 days ahead of schedule with 3.1% budget underrun. $8.4M buffer available for Phase 3 acceleration.\n\n' +
    'Pending Action: Sign-off on Q3 portfolio rebalancing — $24M reallocation from lower-priority initiatives to accelerate AI and cloud programs (due Jun 22).',

  talent: 'Talent & Workforce Analytics:\n\n' +
    '• Critical Skill Gap: 35% shortfall in AI/ML engineering talent projected by Q4 2024\n' +
    '• Time-to-Fill (Senior AI Roles): 127 days average\n' +
    '• Impact: 12 planned AI initiatives at risk in H2 2024\n\n' +
    'Recommended Three-Pronged Approach:\n1. Accelerate internal upskilling program (target: 200 engineers)\n2. Expand university partnerships (3 new institutions)\n3. Engage 2 specialized staffing firms for contract-to-hire positions\n\n' +
    'Regional Talent Readiness Scores:\n- Japan HQ: 80/100 | APAC: 82/100 | Americas: 75/100 | EMEA: 70/100',

  infrastructure: 'Infrastructure Health Overview:\n\n' +
    '• Global System Uptime: 99.97% (exceeding SLA target)\n' +
    '• Mean Time to Resolve: 2.3 hours (down 18.5% QoQ)\n' +
    '• Change Success Rate: 97.2% (up 1.8% QoQ)\n' +
    '• P1/P2 Incidents (MTD): 12 (down 25% MoM)\n' +
    '• Tech Debt Ratio: 18.6% (down 4.2% QoQ)\n\n' +
    'Data Center Optimization: ML analysis reveals 18% stranded capacity across 12 global data centers. Contributors: legacy test environments (42%), decommissioned project remnants (31%), over-provisioned DR (27%). Reclamation could defer $28M in planned CapEx and improve PUE by 0.12 points.',

  compliance: 'Compliance & Governance Status:\n\n' +
    '• Compliance Score: 96.8% (up 1.2% from last audit)\n' +
    '• Policy Adherence Rate: 98.1% (0.5% above target)\n' +
    '• Unresolved Audit Findings: 7 (down 30% QoQ)\n' +
    '• Open Risk Items: 23 (down 15% MoM)\n\n' +
    'Regulatory Updates:\n- NIS2 Directive: Incident response plan update pending CIO review (due Jun 20)\n- Data privacy: All regions compliant with local regulations\n- SOX IT controls: Fully compliant, next audit scheduled Q3 2024\n\n' +
    'Recommendation: Prioritize review of updated incident response plan to maintain regulatory compliance posture.',
};

/**
 * Default fallback response when no keyword matches
 * @type {string}
 */
const defaultResponse = 'Thank you for your question. As Canon\'s AI Strategic Advisor, I can help you with:\n\n' +
  '• **Board Readiness** — Ask about "board" for a board-ready executive summary\n' +
  '• **Budget & Finance** — Ask about "budget" for financial overview and variance analysis\n' +
  '• **Risk & Security** — Ask about "risk" or "security" for threat landscape and compliance status\n' +
  '• **Innovation** — Ask about "innovation" for AI initiatives and R&D portfolio status\n' +
  '• **Infrastructure** — Ask about "infrastructure" or "cloud" for operational health\n' +
  '• **Partnerships** — Ask about "partnership" for vendor portfolio and strategic alliances\n' +
  '• **Projects** — Ask about "project" for portfolio delivery status\n' +
  '• **Talent** — Ask about "talent" for workforce analytics and skill gap analysis\n' +
  '• **Predictive Analysis** — Ask about "predictive" for forward-looking insights\n' +
  '• **Compliance** — Ask about "compliance" for governance and audit status\n\n' +
  'Please try one of these topics, or ask a specific question about Canon\'s IT portfolio.';

/**
 * Ordered list of keywords for matching priority
 * More specific keywords should appear first
 * @type {string[]}
 */
const keywordPriority = [
  'predictive',
  'board',
  'tcs',
  'partnership',
  'innovation',
  'infrastructure',
  'compliance',
  'security',
  'budget',
  'cloud',
  'project',
  'talent',
  'risk',
];

/**
 * Matches a user message against keyword mappings and returns the appropriate
 * executive-style canned response.
 *
 * @param {string} message - The user's chat message
 * @returns {string} The matched canned response or the default fallback
 */
export function getAIResponse(message) {
  if (!message || typeof message !== 'string') {
    return defaultResponse;
  }

  const lowerMessage = message.toLowerCase().trim();

  if (lowerMessage.length === 0) {
    return defaultResponse;
  }

  for (let i = 0; i < keywordPriority.length; i++) {
    const keyword = keywordPriority[i];
    if (lowerMessage.includes(keyword)) {
      return responseMap[keyword];
    }
  }

  return defaultResponse;
}

/**
 * The full keyword-to-response mapping (exported for testing/reference)
 * @type {Object<string, string>}
 */
export const AI_RESPONSE_MAP = responseMap;

/**
 * The default fallback response (exported for testing/reference)
 * @type {string}
 */
export const AI_DEFAULT_RESPONSE = defaultResponse;