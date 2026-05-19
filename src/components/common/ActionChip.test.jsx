import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ActionChip } from './ActionChip.jsx';

const mockOpenChat = vi.fn();
const mockSetInputValue = vi.fn();

vi.mock('../../context/AIChatContext.jsx', () => ({
  useAIChatContext: () => ({
    openChat: mockOpenChat,
    setInputValue: mockSetInputValue,
  }),
}));

vi.mock('../../utils/eventTracker.js', () => ({
  trackEvent: vi.fn(() => ({ status: 'ok', eventId: 'evt_test' })),
}));

describe('ActionChip', () => {
  beforeEach(() => {
    mockOpenChat.mockClear();
    mockSetInputValue.mockClear();
  });

  it('renders chip with the provided label text', () => {
    render(<ActionChip label="Budget variance deep dive" />);
    const chip = screen.getByRole('button', { name: 'Budget variance deep dive' });
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('Budget variance deep dive');
  });

  it('clicking chip calls openChat and sets input value via context', async () => {
    const user = userEvent.setup();
    render(<ActionChip label="Risk mitigation recommendations" />);

    const chip = screen.getByRole('button', { name: 'Risk mitigation recommendations' });
    await user.click(chip);

    expect(mockOpenChat).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledWith('Risk mitigation recommendations');
  });

  it('supports keyboard activation with Enter key', async () => {
    const user = userEvent.setup();
    render(<ActionChip label="Innovation portfolio ROI" />);

    const chip = screen.getByRole('button', { name: 'Innovation portfolio ROI' });
    chip.focus();
    expect(chip).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(mockOpenChat).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledWith('Innovation portfolio ROI');
  });

  it('supports keyboard activation with Space key', async () => {
    const user = userEvent.setup();
    render(<ActionChip label="TCS contract expansion analysis" />);

    const chip = screen.getByRole('button', { name: 'TCS contract expansion analysis' });
    chip.focus();
    expect(chip).toHaveFocus();

    await user.keyboard(' ');

    expect(mockOpenChat).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledWith('TCS contract expansion analysis');
  });

  it('renders default "action" variant styling', () => {
    render(<ActionChip label="Default variant" />);
    const chip = screen.getByRole('button', { name: 'Default variant' });
    expect(chip).toHaveClass('bg-glass-light');
    expect(chip).toHaveClass('text-executive-200');
  });

  it('renders "ai-action" variant styling when specified', () => {
    render(<ActionChip label="AI variant" variant="ai-action" />);
    const chip = screen.getByRole('button', { name: 'AI variant' });
    expect(chip).toHaveClass('bg-status-blue/15');
    expect(chip).toHaveClass('text-status-blue');
  });

  it('applies additional className when provided', () => {
    render(<ActionChip label="Custom class" className="mt-4" />);
    const chip = screen.getByRole('button', { name: 'Custom class' });
    expect(chip).toHaveClass('mt-4');
  });

  it('has correct aria-label matching the label prop', () => {
    render(<ActionChip label="Predictive workforce analytics" />);
    const chip = screen.getByRole('button', { name: 'Predictive workforce analytics' });
    expect(chip).toHaveAttribute('aria-label', 'Predictive workforce analytics');
  });

  it('has tabIndex of 0 for keyboard accessibility', () => {
    render(<ActionChip label="Accessible chip" />);
    const chip = screen.getByRole('button', { name: 'Accessible chip' });
    expect(chip).toHaveAttribute('tabindex', '0');
  });

  it('calls openChat and setInputValue only once per click', async () => {
    const user = userEvent.setup();
    render(<ActionChip label="Single click test" />);

    const chip = screen.getByRole('button', { name: 'Single click test' });
    await user.click(chip);
    await user.click(chip);

    expect(mockOpenChat).toHaveBeenCalledTimes(2);
    expect(mockSetInputValue).toHaveBeenCalledTimes(2);
  });
});