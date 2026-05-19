import { useState, useCallback } from 'react';
import { AIChatContextProvider } from './context/AIChatContext.jsx';
import { Header } from './components/layout/Header.jsx';
import { TabNavigation } from './components/layout/TabNavigation.jsx';
import { AIChatAssistant } from './components/chat/AIChatAssistant.jsx';
import { StrategicCommandTab } from './components/tabs/StrategicCommandTab.jsx';
import { ExecutiveSummaryTab } from './components/tabs/ExecutiveSummaryTab.jsx';
import { BusinessImpactTab } from './components/tabs/BusinessImpactTab.jsx';
import { OperationsTab } from './components/tabs/OperationsTab.jsx';
import { RiskGovernanceTab } from './components/tabs/RiskGovernanceTab.jsx';
import { InnovationTab } from './components/tabs/InnovationTab.jsx';
import { PartnershipsTab } from './components/tabs/PartnershipsTab.jsx';
import {
  TAB_EXECUTIVE_SUMMARY,
  TAB_PORTFOLIO_HEALTH,
  TAB_BUDGET_FINANCE,
  TAB_RISK_COMPLIANCE,
  TAB_INFRASTRUCTURE,
  TAB_AI_INSIGHTS,
} from './constants.js';

/**
 * Default active tab ID
 * @type {string}
 */
const DEFAULT_TAB = 'strategic-command';

/**
 * Returns the tab content component for the given active tab ID
 * @param {string} activeTab - The currently active tab ID
 * @returns {React.ReactElement}
 */
function renderTabContent(activeTab) {
  switch (activeTab) {
    case DEFAULT_TAB:
      return <StrategicCommandTab />;
    case TAB_EXECUTIVE_SUMMARY:
      return <ExecutiveSummaryTab />;
    case TAB_BUDGET_FINANCE:
      return <BusinessImpactTab />;
    case TAB_INFRASTRUCTURE:
      return <OperationsTab />;
    case TAB_RISK_COMPLIANCE:
      return <RiskGovernanceTab />;
    case TAB_AI_INSIGHTS:
      return <InnovationTab />;
    case TAB_PORTFOLIO_HEALTH:
      return <PartnershipsTab />;
    default:
      return <StrategicCommandTab />;
  }
}

/**
 * Root application component for Canon CIO Command Center.
 * Wraps everything in AIChatContextProvider.
 * Renders Header (fixed), TabNavigation, and conditionally renders
 * the active tab content component. Renders AIChatAssistant floating overlay.
 * Manages activeTab state with default 'strategic-command'.
 *
 * @returns {React.ReactElement}
 */
function App() {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <AIChatContextProvider>
      <div className="min-h-screen bg-executive-900 text-white font-urbanist">
        {/* Fixed Header */}
        <Header />

        {/* Tab Navigation - below fixed header */}
        <div className="fixed top-16 left-0 right-0 z-40">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Main Content Area - padded for fixed header + tab nav */}
        <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          {renderTabContent(activeTab)}
        </main>

        {/* AI Chat Assistant Floating Overlay */}
        <AIChatAssistant />
      </div>
    </AIChatContextProvider>
  );
}

export default App;