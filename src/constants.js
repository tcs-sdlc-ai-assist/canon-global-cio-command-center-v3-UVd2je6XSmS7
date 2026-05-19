/**
 * Application-wide constants for Canon CIO Command Center
 * @module constants
 */

// ============================================
// Tab Configuration
// ============================================

/** @type {string} */
export const TAB_EXECUTIVE_SUMMARY = 'executive-summary';
/** @type {string} */
export const TAB_PORTFOLIO_HEALTH = 'portfolio-health';
/** @type {string} */
export const TAB_BUDGET_FINANCE = 'budget-finance';
/** @type {string} */
export const TAB_RISK_COMPLIANCE = 'risk-compliance';
/** @type {string} */
export const TAB_INFRASTRUCTURE = 'infrastructure';
/** @type {string} */
export const TAB_AI_INSIGHTS = 'ai-insights';

/**
 * Array of tab definitions with IDs and labels
 * @type {Array<{id: string, label: string}>}
 */
export const TABS = [
  { id: TAB_EXECUTIVE_SUMMARY, label: 'Executive Summary' },
  { id: TAB_PORTFOLIO_HEALTH, label: 'Portfolio Health' },
  { id: TAB_BUDGET_FINANCE, label: 'Budget & Finance' },
  { id: TAB_RISK_COMPLIANCE, label: 'Risk & Compliance' },
  { id: TAB_INFRASTRUCTURE, label: 'Infrastructure' },
  { id: TAB_AI_INSIGHTS, label: 'AI Insights' },
];

// ============================================
// Status Badge Types
// ============================================

/** @type {string} */
export const STATUS_EXCELLENT = 'excellent';
/** @type {string} */
export const STATUS_GOOD = 'good';
/** @type {string} */
export const STATUS_WARNING = 'warning';
/** @type {string} */
export const STATUS_CRITICAL = 'critical';

/**
 * Status badge configuration with labels and color classes
 * @type {Object<string, {label: string, bgColor: string, textColor: string, dotColor: string}>}
 */
export const STATUS_BADGES = {
  [STATUS_EXCELLENT]: {
    label: 'Excellent',
    bgColor: 'bg-status-green/20',
    textColor: 'text-status-green',
    dotColor: 'bg-status-green',
  },
  [STATUS_GOOD]: {
    label: 'Good',
    bgColor: 'bg-status-blue/20',
    textColor: 'text-status-blue',
    dotColor: 'bg-status-blue',
  },
  [STATUS_WARNING]: {
    label: 'Warning',
    bgColor: 'bg-status-amber/20',
    textColor: 'text-status-amber',
    dotColor: 'bg-status-amber',
  },
  [STATUS_CRITICAL]: {
    label: 'Critical',
    bgColor: 'bg-status-red/20',
    textColor: 'text-status-red',
    dotColor: 'bg-status-red',
  },
};

// ============================================
// Chart Color Mappings
// ============================================

/**
 * Color palette for chart datasets
 * @type {Object<string, {background: string, border: string, backgroundOpacity: string}>}
 */
export const CHART_COLORS = {
  blue: {
    background: 'rgba(59, 130, 246, 0.8)',
    border: 'rgba(59, 130, 246, 1)',
    backgroundOpacity: 'rgba(59, 130, 246, 0.15)',
  },
  green: {
    background: 'rgba(16, 185, 129, 0.8)',
    border: 'rgba(16, 185, 129, 1)',
    backgroundOpacity: 'rgba(16, 185, 129, 0.15)',
  },
  red: {
    background: 'rgba(239, 68, 68, 0.8)',
    border: 'rgba(239, 68, 68, 1)',
    backgroundOpacity: 'rgba(239, 68, 68, 0.15)',
  },
  amber: {
    background: 'rgba(245, 158, 11, 0.8)',
    border: 'rgba(245, 158, 11, 1)',
    backgroundOpacity: 'rgba(245, 158, 11, 0.15)',
  },
  purple: {
    background: 'rgba(139, 92, 246, 0.8)',
    border: 'rgba(139, 92, 246, 1)',
    backgroundOpacity: 'rgba(139, 92, 246, 0.15)',
  },
  canon: {
    background: 'rgba(188, 0, 45, 0.8)',
    border: 'rgba(188, 0, 45, 1)',
    backgroundOpacity: 'rgba(188, 0, 45, 0.15)',
  },
  teal: {
    background: 'rgba(20, 184, 166, 0.8)',
    border: 'rgba(20, 184, 166, 1)',
    backgroundOpacity: 'rgba(20, 184, 166, 0.15)',
  },
  indigo: {
    background: 'rgba(99, 102, 241, 0.8)',
    border: 'rgba(99, 102, 241, 1)',
    backgroundOpacity: 'rgba(99, 102, 241, 0.15)',
  },
};

/**
 * Ordered array of chart dataset colors for sequential assignment
 * @type {string[]}
 */
export const CHART_COLOR_SEQUENCE = [
  'blue',
  'green',
  'amber',
  'purple',
  'canon',
  'teal',
  'red',
  'indigo',
];

// ============================================
// AI Configuration
// ============================================

/**
 * Simulated delay (in ms) for AI response generation
 * @type {number}
 */
export const AI_RESPONSE_DELAY_MS = 1500;

/**
 * Interval (in ms) for pulse animation refresh cycle
 * @type {number}
 */
export const PULSE_ANIMATION_INTERVAL_MS = 45000;

// ============================================
// User Identity (Mock Data)
// ============================================

/**
 * Mock user identity for the CIO Command Center
 * @type {{name: string, role: string, initials: string}}
 */
export const USER_IDENTITY = {
  name: 'Martin de Weerdt',
  role: 'Global CIO',
  initials: 'MdW',
};

// ============================================
// Notifications
// ============================================

/**
 * Default notification count displayed in the header
 * @type {number}
 */
export const NOTIFICATION_COUNT = 7;

// ============================================
// Application Metadata
// ============================================

/**
 * Application title fallback when env variable is not set
 * @type {string}
 */
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Canon CIO Command Center';