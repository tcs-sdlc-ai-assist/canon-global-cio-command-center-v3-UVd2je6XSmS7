import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PULSE_ANIMATION_INTERVAL_MS } from '../../constants.js';

/**
 * AI pulse indicator dot with re-triggerable animation
 * @param {Object} props
 * @param {number} props.pulseKey - Key to force re-mount and re-trigger animation
 * @returns {React.ReactElement}
 */
function AIPulseDot({ pulseKey }) {
  return (
    <span
      key={pulseKey}
      className="inline-block w-2 h-2 rounded-full bg-status-blue animate-ai-pulse flex-shrink-0"
      aria-hidden="true"
    />
  );
}

AIPulseDot.propTypes = {
  pulseKey: PropTypes.number.isRequired,
};

/**
 * Reusable AI insight block component displayed within metric cards.
 * Shows an AI pulse dot indicator and insight text.
 * Pulse animation re-triggers every ~45 seconds via setInterval.
 *
 * @param {Object} props
 * @param {string} props.text - The AI insight text to display
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement|null}
 */
export function AIInsightBlock({ text, className = '' }) {
  const [pulseKey, setPulseKey] = useState(0);

  const retriggerPulse = useCallback(() => {
    setPulseKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(retriggerPulse, PULSE_ANIMATION_INTERVAL_MS);
    return () => {
      clearInterval(intervalId);
    };
  }, [retriggerPulse]);

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return null;
  }

  return (
    <div
      className={`mt-1 pt-3 border-t border-glass-light ${className}`.trim()}
      role="note"
      aria-label="AI Analysis insight"
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <AIPulseDot pulseKey={pulseKey} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-status-blue">
          AI Analysis
        </span>
      </div>
      <p className="text-xs text-executive-300 leading-relaxed">{text}</p>
    </div>
  );
}

AIInsightBlock.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AIInsightBlock;