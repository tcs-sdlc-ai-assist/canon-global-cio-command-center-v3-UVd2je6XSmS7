import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetricCard } from './MetricCard.jsx';

describe('MetricCard', () => {
  const defaultProps = {
    title: 'IT Revenue Contribution',
    value: '$2.4B',
    trend: '+12.5% vs last quarter',
    trendDirection: 'up',
  };

  it('renders the metric title', () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.getByText('IT Revenue Contribution')).toBeInTheDocument();
  });

  it('renders the metric value', () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.getByText('$2.4B')).toBeInTheDocument();
  });

  it('renders the trend text', () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.getByText('+12.5% vs last quarter')).toBeInTheDocument();
  });

  it('renders correct aria-label on the card region', () => {
    render(<MetricCard {...defaultProps} />);
    const region = screen.getByRole('region', { name: 'IT Revenue Contribution metric' });
    expect(region).toBeInTheDocument();
  });

  it('renders trend up direction with correct color classes', () => {
    render(<MetricCard {...defaultProps} trendDirection="up" />);
    const trendEl = screen.getByLabelText('Trending up: +12.5% vs last quarter');
    expect(trendEl).toBeInTheDocument();
    expect(trendEl).toHaveClass('text-status-green');
    expect(trendEl).toHaveClass('bg-status-green/15');
  });

  it('renders trend down direction with correct color classes', () => {
    render(
      <MetricCard
        title="Open Risk Items"
        value="23"
        trend="-15% vs last month"
        trendDirection="down"
      />,
    );
    const trendEl = screen.getByLabelText('Trending down: -15% vs last month');
    expect(trendEl).toBeInTheDocument();
    expect(trendEl).toHaveClass('text-status-red');
    expect(trendEl).toHaveClass('bg-status-red/15');
  });

  it('renders trend neutral direction with correct color classes', () => {
    render(
      <MetricCard
        title="Compliance Score"
        value="96.8%"
        trend="0% vs target"
        trendDirection="neutral"
      />,
    );
    const trendEl = screen.getByLabelText('Trend neutral: 0% vs target');
    expect(trendEl).toBeInTheDocument();
    expect(trendEl).toHaveClass('text-executive-300');
    expect(trendEl).toHaveClass('bg-glass-light');
  });

  it('defaults to neutral trend direction when not specified', () => {
    render(
      <MetricCard
        title="Some Metric"
        value="100"
        trend="stable"
      />,
    );
    const trendEl = screen.getByLabelText('Trend neutral: stable');
    expect(trendEl).toHaveClass('text-executive-300');
  });

  it('shows AI insight block when insight prop is provided', () => {
    const insightText = 'Compliance score trending upward across all regions.';
    render(
      <MetricCard
        {...defaultProps}
        insight={insightText}
      />,
    );
    expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    expect(screen.getByText(insightText)).toBeInTheDocument();
  });

  it('does not render AI insight block when insight prop is not provided', () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.queryByText('AI Analysis')).not.toBeInTheDocument();
  });

  it('has hover elevation classes on the card', () => {
    render(<MetricCard {...defaultProps} />);
    const region = screen.getByRole('region', { name: 'IT Revenue Contribution metric' });
    expect(region).toHaveClass('hover:shadow-executive-lg');
    expect(region).toHaveClass('hover:-translate-y-0.5');
  });

  it('has glass-card styling class', () => {
    render(<MetricCard {...defaultProps} />);
    const region = screen.getByRole('region', { name: 'IT Revenue Contribution metric' });
    expect(region).toHaveClass('glass-card');
  });

  it('applies additional className when provided', () => {
    render(<MetricCard {...defaultProps} className="mt-8" />);
    const region = screen.getByRole('region', { name: 'IT Revenue Contribution metric' });
    expect(region).toHaveClass('mt-8');
  });

  it('does not render trend indicator when trend prop is not provided', () => {
    render(
      <MetricCard
        title="No Trend Metric"
        value="42"
      />,
    );
    expect(screen.getByText('No Trend Metric')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.queryByLabelText(/Trending/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Trend neutral/)).not.toBeInTheDocument();
  });

  it('renders numeric value correctly', () => {
    render(
      <MetricCard
        title="Active Projects"
        value={547}
        trend="+5% vs last quarter"
        trendDirection="up"
      />,
    );
    expect(screen.getByText('547')).toBeInTheDocument();
  });

  it('renders kpi-label class on the title', () => {
    render(<MetricCard {...defaultProps} />);
    const title = screen.getByText('IT Revenue Contribution');
    expect(title).toHaveClass('kpi-label');
  });

  it('renders kpi-value class on the value', () => {
    render(<MetricCard {...defaultProps} />);
    const value = screen.getByText('$2.4B');
    expect(value).toHaveClass('kpi-value');
  });
});