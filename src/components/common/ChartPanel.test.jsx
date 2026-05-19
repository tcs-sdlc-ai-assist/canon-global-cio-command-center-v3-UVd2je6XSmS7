import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ChartPanel } from './ChartPanel.jsx';

vi.mock('../../utils/eventTracker.js', () => ({
  trackEvent: vi.fn(() => ({ status: 'ok', eventId: 'evt_test' })),
}));

vi.mock('react-chartjs-2', () => {
  const React = require('react');
  const MockLine = React.forwardRef((props, ref) =>
    React.createElement('canvas', { 'data-testid': 'mock-chart-line', ref }),
  );
  MockLine.displayName = 'MockLine';
  const MockBar = React.forwardRef((props, ref) =>
    React.createElement('canvas', { 'data-testid': 'mock-chart-bar', ref }),
  );
  MockBar.displayName = 'MockBar';
  const MockRadar = React.forwardRef((props, ref) =>
    React.createElement('canvas', { 'data-testid': 'mock-chart-radar', ref }),
  );
  MockRadar.displayName = 'MockRadar';
  const MockDoughnut = React.forwardRef((props, ref) =>
    React.createElement('canvas', { 'data-testid': 'mock-chart-doughnut', ref }),
  );
  MockDoughnut.displayName = 'MockDoughnut';
  return {
    Line: MockLine,
    Bar: MockBar,
    Radar: MockRadar,
    Doughnut: MockDoughnut,
  };
});

vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn(),
  },
  CategoryScale: class {},
  LinearScale: class {},
  PointElement: class {},
  LineElement: class {},
  BarElement: class {},
  ArcElement: class {},
  RadialLinearScale: class {},
  Filler: class {},
  Tooltip: class {},
  Legend: class {},
}));

const sampleLineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Revenue',
      data: [100, 200, 150, 300],
    },
  ],
};

const sampleBarData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Sales',
      data: [50, 80, 60, 90],
    },
  ],
};

describe('ChartPanel', () => {
  it('renders the chart title', () => {
    render(
      <ChartPanel
        title="12-Month Strategic Performance Trends"
        chartType="line"
        data={sampleLineData}
      />,
    );
    expect(screen.getByText('12-Month Strategic Performance Trends')).toBeInTheDocument();
  });

  it('renders correct aria-label on the chart region', () => {
    render(
      <ChartPanel
        title="Revenue Trends"
        chartType="line"
        data={sampleLineData}
      />,
    );
    const region = screen.getByRole('region', { name: 'Revenue Trends chart' });
    expect(region).toBeInTheDocument();
  });

  it('renders Export Data button when showExportButton is true', () => {
    render(
      <ChartPanel
        title="Test Chart"
        chartType="bar"
        data={sampleBarData}
        showExportButton={true}
      />,
    );
    const exportButton = screen.getByRole('button', { name: 'Export Test Chart data' });
    expect(exportButton).toBeInTheDocument();
    expect(exportButton).toHaveTextContent('Export Data');
  });

  it('does not render Export Data button when showExportButton is false', () => {
    render(
      <ChartPanel
        title="Test Chart"
        chartType="bar"
        data={sampleBarData}
        showExportButton={false}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Export Test Chart data' })).not.toBeInTheDocument();
  });

  it('does not render Export Data button by default', () => {
    render(
      <ChartPanel
        title="Test Chart"
        chartType="bar"
        data={sampleBarData}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Export Test Chart data' })).not.toBeInTheDocument();
  });

  it('renders Predictive Analysis button when showPredictiveButton is true', () => {
    render(
      <ChartPanel
        title="Test Chart"
        chartType="line"
        data={sampleLineData}
        showPredictiveButton={true}
      />,
    );
    const predictiveButton = screen.getByRole('button', { name: 'Run predictive analysis for Test Chart' });
    expect(predictiveButton).toBeInTheDocument();
    expect(predictiveButton).toHaveTextContent('Predictive Analysis');
  });

  it('does not render Predictive Analysis button when showPredictiveButton is false', () => {
    render(
      <ChartPanel
        title="Test Chart"
        chartType="line"
        data={sampleLineData}
        showPredictiveButton={false}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Run predictive analysis for Test Chart' })).not.toBeInTheDocument();
  });

  it('does not render Predictive Analysis button by default', () => {
    render(
      <ChartPanel
        title="Test Chart"
        chartType="line"
        data={sampleLineData}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Run predictive analysis for Test Chart' })).not.toBeInTheDocument();
  });

  it('renders both action buttons when both are enabled', () => {
    render(
      <ChartPanel
        title="Dual Actions"
        chartType="line"
        data={sampleLineData}
        showExportButton={true}
        showPredictiveButton={true}
      />,
    );
    expect(screen.getByRole('button', { name: 'Export Dual Actions data' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Run predictive analysis for Dual Actions' })).toBeInTheDocument();
  });

  it('chart container is present in DOM for line chart', () => {
    render(
      <ChartPanel
        title="Line Chart"
        chartType="line"
        data={sampleLineData}
      />,
    );
    expect(screen.getByTestId('mock-chart-line')).toBeInTheDocument();
  });

  it('chart container is present in DOM for bar chart', () => {
    render(
      <ChartPanel
        title="Bar Chart"
        chartType="bar"
        data={sampleBarData}
      />,
    );
    expect(screen.getByTestId('mock-chart-bar')).toBeInTheDocument();
  });

  it('chart container is present in DOM for radar chart', () => {
    const radarData = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [
        {
          label: 'Scores',
          data: [80, 90, 70, 85, 75],
        },
      ],
    };
    render(
      <ChartPanel
        title="Radar Chart"
        chartType="radar"
        data={radarData}
      />,
    );
    expect(screen.getByTestId('mock-chart-radar')).toBeInTheDocument();
  });

  it('chart container is present in DOM for doughnut chart', () => {
    const doughnutData = {
      labels: ['Red', 'Blue', 'Green'],
      datasets: [
        {
          label: 'Colors',
          data: [30, 50, 20],
        },
      ],
    };
    render(
      <ChartPanel
        title="Doughnut Chart"
        chartType="doughnut"
        data={doughnutData}
      />,
    );
    expect(screen.getByTestId('mock-chart-doughnut')).toBeInTheDocument();
  });

  it('renders unsupported chart type message for unknown type', () => {
    render(
      <ChartPanel
        title="Unknown Chart"
        chartType="pie"
        data={sampleLineData}
      />,
    );
    expect(screen.getByText('Unsupported chart type: pie')).toBeInTheDocument();
  });

  it('renders data unavailable message when data is missing', () => {
    render(
      <ChartPanel
        title="No Data Chart"
        chartType="line"
        data={null}
      />,
    );
    expect(screen.getByText('Data unavailable')).toBeInTheDocument();
  });

  it('renders data unavailable message when data has no labels', () => {
    render(
      <ChartPanel
        title="No Labels Chart"
        chartType="line"
        data={{ datasets: [{ label: 'Test', data: [1, 2] }] }}
      />,
    );
    expect(screen.getByText('Data unavailable')).toBeInTheDocument();
  });

  it('renders data unavailable message when data has no datasets', () => {
    render(
      <ChartPanel
        title="No Datasets Chart"
        chartType="line"
        data={{ labels: ['A', 'B'] }}
      />,
    );
    expect(screen.getByText('Data unavailable')).toBeInTheDocument();
  });

  it('has glass-card styling class', () => {
    render(
      <ChartPanel
        title="Styled Chart"
        chartType="line"
        data={sampleLineData}
      />,
    );
    const region = screen.getByRole('region', { name: 'Styled Chart chart' });
    expect(region).toHaveClass('glass-card');
  });

  it('applies additional className when provided', () => {
    render(
      <ChartPanel
        title="Custom Class Chart"
        chartType="line"
        data={sampleLineData}
        className="mt-6"
      />,
    );
    const region = screen.getByRole('region', { name: 'Custom Class Chart chart' });
    expect(region).toHaveClass('mt-6');
  });

  it('has hover shadow class on the card', () => {
    render(
      <ChartPanel
        title="Hover Chart"
        chartType="line"
        data={sampleLineData}
      />,
    );
    const region = screen.getByRole('region', { name: 'Hover Chart chart' });
    expect(region).toHaveClass('hover:shadow-executive-lg');
  });

  it('clicking Export Data button calls trackEvent', async () => {
    const { trackEvent } = await import('../../utils/eventTracker.js');
    const user = userEvent.setup();
    render(
      <ChartPanel
        title="Export Test"
        chartType="line"
        data={sampleLineData}
        showExportButton={true}
      />,
    );
    const exportButton = screen.getByRole('button', { name: 'Export Export Test data' });
    await user.click(exportButton);
    expect(trackEvent).toHaveBeenCalledWith('button_click', 'export_chart_data', 'Export Test');
  });

  it('clicking Predictive Analysis button calls trackEvent', async () => {
    const { trackEvent } = await import('../../utils/eventTracker.js');
    const user = userEvent.setup();
    render(
      <ChartPanel
        title="Predictive Test"
        chartType="line"
        data={sampleLineData}
        showPredictiveButton={true}
      />,
    );
    const predictiveButton = screen.getByRole('button', { name: 'Run predictive analysis for Predictive Test' });
    await user.click(predictiveButton);
    expect(trackEvent).toHaveBeenCalledWith('button_click', 'predictive_analysis', 'Predictive Test');
  });

  it('renders mixed chart type using bar component', () => {
    const mixedData = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Incidents',
          data: [10, 20, 15],
          type: 'bar',
        },
        {
          label: 'MTTR',
          data: [3.2, 2.8, 2.5],
          type: 'line',
        },
      ],
    };
    render(
      <ChartPanel
        title="Mixed Chart"
        chartType="mixed"
        data={mixedData}
      />,
    );
    expect(screen.getByTestId('mock-chart-bar')).toBeInTheDocument();
  });

  it('renders section-title class on the chart title', () => {
    render(
      <ChartPanel
        title="Title Class Test"
        chartType="line"
        data={sampleLineData}
      />,
    );
    const title = screen.getByText('Title Class Test');
    expect(title).toHaveClass('section-title');
  });
});