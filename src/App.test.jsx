import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App.jsx';
import { TABS } from './constants.js';

vi.mock('./utils/eventTracker.js', () => ({
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

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders header with Canon branding', () => {
    render(<App />);
    expect(screen.getByText('canon')).toBeInTheDocument();
    expect(screen.getByText('global cio command center')).toBeInTheDocument();
  });

  it('renders header banner element', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('fixed');
  });

  it('renders tab navigation with all tabs', () => {
    render(<App />);
    const tablist = screen.getByRole('tablist', { name: 'Dashboard tabs' });
    expect(tablist).toBeInTheDocument();

    TABS.forEach((tab) => {
      expect(screen.getByRole('tab', { name: tab.label })).toBeInTheDocument();
    });
  });

  it('renders Strategic Command content by default', () => {
    render(<App />);
    expect(screen.getByRole('region', { name: 'Quick Actions' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Business Impact & Value Creation metrics' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Risk & Governance metrics' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Innovation & Future Readiness metrics' })).toBeInTheDocument();
  });

  it('switches to Executive Summary tab and shows correct content', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const executiveSummaryTab = screen.getByRole('tab', { name: 'Executive Summary' });
    await user.click(executiveSummaryTab);

    expect(screen.getByRole('region', { name: 'Operational Excellence metrics' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Quick Actions' })).not.toBeInTheDocument();
  });

  it('switches to Budget & Finance tab and shows correct content', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const budgetTab = screen.getByRole('tab', { name: 'Budget & Finance' });
    await user.click(budgetTab);

    expect(screen.getByRole('region', { name: 'IT Business Value Creation chart' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Business Value metrics' })).toBeInTheDocument();
  });

  it('switches to Risk & Compliance tab and shows correct content', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const riskTab = screen.getByRole('tab', { name: 'Risk & Compliance' });
    await user.click(riskTab);

    expect(screen.getByRole('region', { name: 'Risk & Governance metrics' })).toBeInTheDocument();
  });

  it('switches to Infrastructure tab and shows correct content', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const infraTab = screen.getByRole('tab', { name: 'Infrastructure' });
    await user.click(infraTab);

    expect(screen.getByRole('region', { name: 'Operations metrics' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Incident Trends & Resolution Time chart' })).toBeInTheDocument();
  });

  it('switches to AI Insights tab and shows correct content', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const aiTab = screen.getByRole('tab', { name: 'AI Insights' });
    await user.click(aiTab);

    expect(screen.getByRole('region', { name: 'Innovation & Future Readiness metrics' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Innovation Portfolio Investment Allocation chart' })).toBeInTheDocument();
  });

  it('switches to Portfolio Health tab and shows correct content', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const portfolioTab = screen.getByRole('tab', { name: 'Portfolio Health' });
    await user.click(portfolioTab);

    expect(screen.getByRole('region', { name: 'TCS Partnership metrics' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Partnership Timeline chart' })).toBeInTheDocument();
  });

  it('AI chat toggle button is present', () => {
    render(<App />);
    const chatToggle = screen.getByRole('button', { name: 'Open AI Chat Assistant' });
    expect(chatToggle).toBeInTheDocument();
    expect(chatToggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking AI chat toggle opens the chat drawer', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const chatToggle = screen.getByRole('button', { name: 'Open AI Chat Assistant' });
    await user.click(chatToggle);

    const chatRegion = screen.getByRole('region', { name: 'AI Chat Assistant' });
    expect(chatRegion).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close AI Chat Assistant' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders navigation landmark for tab navigation', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Dashboard navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders user profile information in header', () => {
    render(<App />);
    expect(screen.getByText('Martin de Weerdt')).toBeInTheDocument();
    expect(screen.getByText('Global CIO')).toBeInTheDocument();
  });

  it('switching tabs updates active tab styling', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    const portfolioTab = screen.getByRole('tab', { name: 'Portfolio Health' });
    await user.click(portfolioTab);

    expect(portfolioTab).toHaveAttribute('aria-selected', 'true');

    const executiveSummaryTab = screen.getByRole('tab', { name: 'Executive Summary' });
    expect(executiveSummaryTab).toHaveAttribute('aria-selected', 'false');
  });
});