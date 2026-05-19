import { memo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import { trackEvent } from '../../utils/eventTracker.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
);

/**
 * Download icon SVG for the export button
 * @returns {React.ReactElement}
 */
function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3a.75.75 0 01.75.75v7.098l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V3.75A.75.75 0 0110 3zM3 15.75a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Sparkle icon SVG for the predictive analysis button
 * @returns {React.ReactElement}
 */
function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06a.75.75 0 11-1.06 1.061L5.05 4.111a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zM10 7a3 3 0 100 6 3 3 0 000-6zm-6.25 3a.75.75 0 01-.75-.75h-1.5a.75.75 0 010 1.5h1.5A.75.75 0 013.75 10zm14.5 0a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm-11.14 3.889a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zm7.78 0a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Returns the appropriate react-chartjs-2 component for the given chart type
 * @param {string} chartType - The chart type identifier
 * @returns {React.ComponentType|null}
 */
function getChartComponent(chartType) {
  switch (chartType) {
    case 'line':
      return Line;
    case 'bar':
      return Bar;
    case 'radar':
      return Radar;
    case 'doughnut':
      return Doughnut;
    case 'mixed':
      return Bar;
    default:
      return null;
  }
}

/**
 * Reusable chart panel component for the Canon CIO Command Center.
 * Renders a Chart.js chart inside a glass-morphism card with a title header
 * and optional action buttons (Export Data, Predictive Analysis — UI-only).
 * Handles chart resize when parent tab becomes visible using ResizeObserver.
 * Supports chart types: line, bar, radar, doughnut, and mixed (dual-axis).
 *
 * @param {Object} props
 * @param {string} props.title - The chart panel title
 * @param {'line'|'bar'|'radar'|'doughnut'|'mixed'} props.chartType - The type of chart to render
 * @param {Object} props.data - Chart.js data object with labels and datasets
 * @param {Object} [props.options={}] - Chart.js options object
 * @param {boolean} [props.showExportButton=false] - Whether to show the Export Data button
 * @param {boolean} [props.showPredictiveButton=false] - Whether to show the Predictive Analysis button
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function ChartPanel({
  title,
  chartType,
  data,
  options = {},
  showExportButton = false,
  showPredictiveButton = false,
  className = '',
}) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(() => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleExportClick = useCallback(() => {
    trackEvent('button_click', 'export_chart_data', title);
  }, [title]);

  const handlePredictiveClick = useCallback(() => {
    trackEvent('button_click', 'predictive_analysis', title);
  }, [title]);

  const ChartComponent = getChartComponent(chartType);

  if (!ChartComponent) {
    return (
      <div
        className={`glass-card p-4 sm:p-5 ${className}`.trim()}
        role="region"
        aria-label={`${title} chart`}
      >
        <p className="section-title mb-4">{title}</p>
        <div className="flex items-center justify-center h-48 text-executive-300 text-sm">
          Unsupported chart type: {chartType}
        </div>
      </div>
    );
  }

  if (!data || !data.labels || !data.datasets) {
    return (
      <div
        className={`glass-card p-4 sm:p-5 ${className}`.trim()}
        role="region"
        aria-label={`${title} chart`}
      >
        <p className="section-title mb-4">{title}</p>
        <div className="flex items-center justify-center h-48 text-executive-300 text-sm">
          Data unavailable
        </div>
      </div>
    );
  }

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: chartType === 'doughnut' ? 'right' : 'top',
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
      tooltip: {
        backgroundColor: 'rgba(10, 17, 32, 0.9)',
        titleColor: '#ffffff',
        bodyColor: 'rgba(138, 162, 198, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        titleFont: {
          family: 'Urbanist',
          size: 12,
          weight: '600',
        },
        bodyFont: {
          family: 'Urbanist',
          size: 11,
        },
      },
    },
  };

  if (chartType === 'line' || chartType === 'bar' || chartType === 'mixed') {
    defaultOptions.scales = {
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
    };
  }

  if (chartType === 'radar') {
    defaultOptions.scales = {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.08)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.08)',
        },
        pointLabels: {
          color: 'rgba(138, 162, 198, 0.9)',
          font: {
            family: 'Urbanist',
            size: 10,
          },
        },
        ticks: {
          color: 'rgba(138, 162, 198, 0.5)',
          backdropColor: 'transparent',
          font: {
            family: 'Urbanist',
            size: 9,
          },
        },
      },
    };
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...(options.plugins || {}),
      legend: {
        ...(defaultOptions.plugins?.legend || {}),
        ...(options.plugins?.legend || {}),
        labels: {
          ...(defaultOptions.plugins?.legend?.labels || {}),
          ...(options.plugins?.legend?.labels || {}),
        },
      },
      tooltip: {
        ...(defaultOptions.plugins?.tooltip || {}),
        ...(options.plugins?.tooltip || {}),
      },
    },
  };

  if (defaultOptions.scales && !options.scales) {
    mergedOptions.scales = defaultOptions.scales;
  } else if (defaultOptions.scales && options.scales) {
    mergedOptions.scales = { ...defaultOptions.scales, ...options.scales };
  }

  const showActions = showExportButton || showPredictiveButton;

  return (
    <div
      className={`glass-card p-4 sm:p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-executive-lg ${className}`.trim()}
      role="region"
      aria-label={`${title} chart`}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="section-title">{title}</h3>
        {showActions && (
          <div className="flex items-center gap-2">
            {showExportButton && (
              <button
                type="button"
                onClick={handleExportClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-glass-light text-executive-200 border border-glass hover:bg-glass-medium hover:text-white hover:border-glass-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-executive-900 focus:ring-executive-400/50"
                aria-label={`Export ${title} data`}
              >
                <DownloadIcon />
                <span>Export Data</span>
              </button>
            )}
            {showPredictiveButton && (
              <button
                type="button"
                onClick={handlePredictiveClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-status-blue/15 text-status-blue border border-status-blue/30 hover:bg-status-blue/25 hover:border-status-blue/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-executive-900 focus:ring-status-blue/50"
                aria-label={`Run predictive analysis for ${title}`}
              >
                <SparkleIcon />
                <span>Predictive Analysis</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div ref={containerRef} className="relative w-full min-h-[200px]">
        <ChartComponent
          ref={chartRef}
          data={data}
          options={mergedOptions}
        />
      </div>
    </div>
  );
}

ChartPanel.propTypes = {
  title: PropTypes.string.isRequired,
  chartType: PropTypes.oneOf(['line', 'bar', 'radar', 'doughnut', 'mixed']).isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  options: PropTypes.object,
  showExportButton: PropTypes.bool,
  showPredictiveButton: PropTypes.bool,
  className: PropTypes.string,
};

export default memo(ChartPanel);
export { ChartPanel };