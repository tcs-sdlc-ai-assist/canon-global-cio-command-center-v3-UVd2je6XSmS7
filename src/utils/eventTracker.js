/**
 * Event tracking utility for Canon CIO Command Center
 * Logs structured UI interaction events to the console
 * @module eventTracker
 */

/**
 * Allowed event categories for tracking
 * @type {string[]}
 */
const ALLOWED_CATEGORIES = [
  'tab_switch',
  'chip_click',
  'chart_interaction',
  'chat_event',
  'button_click',
];

/**
 * Generates an ISO timestamp string for the current moment
 * @returns {string} ISO 8601 formatted timestamp
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Generates a simple unique event ID
 * @returns {string} A unique event identifier
 */
function generateEventId() {
  return 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

/**
 * Tracks a UI interaction event by logging it to the console in a structured format.
 *
 * @param {string} category - The event category. Must be one of: 'tab_switch', 'chip_click', 'chart_interaction', 'chat_event', 'button_click'
 * @param {string} action - A descriptive action string (e.g., 'switched_to_tab', 'clicked_chip')
 * @param {string} [label=''] - An optional label providing additional context (e.g., tab ID, chip name)
 * @returns {{ status: string, eventId: string } | { status: string, error: string }} The tracking result
 */
export function trackEvent(category, action, label = '') {
  if (!category || typeof category !== 'string') {
    const error = 'Invalid event category: category is required and must be a string';
    console.warn('[EventTracker]', error);
    return { status: 'error', error };
  }

  if (!action || typeof action !== 'string') {
    const error = 'Invalid event action: action is required and must be a string';
    console.warn('[EventTracker]', error);
    return { status: 'error', error };
  }

  const normalizedCategory = category.toLowerCase().trim();

  if (!ALLOWED_CATEGORIES.includes(normalizedCategory)) {
    const error = `Invalid event category: "${category}". Allowed categories: ${ALLOWED_CATEGORIES.join(', ')}`;
    console.warn('[EventTracker]', error);
    return { status: 'error', error };
  }

  const eventId = generateEventId();
  const timestamp = getTimestamp();

  const event = {
    eventId,
    eventType: normalizedCategory,
    action: action.trim(),
    label: typeof label === 'string' ? label.trim() : String(label),
    timestamp,
  };

  console.log('[EventTracker]', JSON.stringify(event));

  return { status: 'ok', eventId };
}

/**
 * The list of allowed event categories (exported for reference and validation)
 * @type {string[]}
 */
export const EVENT_CATEGORIES = [...ALLOWED_CATEGORIES];