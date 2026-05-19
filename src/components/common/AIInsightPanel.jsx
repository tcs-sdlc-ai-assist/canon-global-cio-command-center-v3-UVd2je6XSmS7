import { memo } from 'react';
import PropTypes from 'prop-types';
import { ActionChip } from './ActionChip.jsx';

/**
 * AI Intelligence Summary Panel component.
 * Displays a confidence badge, and one or more insight sections each with
 * narrative text and ActionChip components for chip-to-chat bridge.
 *
 * Used in Strategic Command and Partnership tabs.
 *
 * @param {Object} props
 * @param {string} props.badge - Badge label text (e.g., "High Confidence")
 * @param {Array<{title: string, narrative: string, chips: string[]}>} props.sections - Array of insight section objects
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement|null}
 */
function AIInsightPanel({ badge, sections, className = '' }) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <div
      className={`glass-card p-4 sm:p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-executive-lg ${className}`.trim()}
      role="region"
      aria-label="AI Intelligence Summary"
    >
      {/* Header with AI pulse and badge */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full bg-status-blue animate-ai-pulse"
            aria-hidden="true"
          />
          <h3 className="section-title">AI Intelligence Summary</h3>
        </div>
        {badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-status-blue/15 text-status-blue border border-status-blue/30">
            {badge}
          </span>
        )}
      </div>

      {/* Insight Sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <div
            key={section.title || index}
            className={`flex flex-col gap-3 ${index > 0 ? 'pt-4 border-t border-glass-light' : ''}`.trim()}
          >
            {/* Section Title */}
            {section.title && (
              <h4 className="text-sm font-semibold text-executive-200 tracking-wide">
                {section.title}
              </h4>
            )}

            {/* Narrative Text */}
            {section.narrative && (
              <p className="text-xs text-executive-300 leading-relaxed">
                {section.narrative}
              </p>
            )}

            {/* Action Chips */}
            {section.chips && Array.isArray(section.chips) && section.chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {section.chips.map((chipLabel) => (
                  <ActionChip
                    key={chipLabel}
                    label={chipLabel}
                    variant="ai-action"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

AIInsightPanel.propTypes = {
  badge: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      narrative: PropTypes.string.isRequired,
      chips: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  className: PropTypes.string,
};

export default memo(AIInsightPanel);
export { AIInsightPanel };