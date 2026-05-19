import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AIChatAssistant } from './AIChatAssistant.jsx';
import { AIChatContextProvider } from '../../context/AIChatContext.jsx';
import { AI_RESPONSE_DELAY_MS } from '../../constants.js';

vi.mock('../../utils/eventTracker.js', () => ({
  trackEvent: vi.fn(() => ({ status: 'ok', eventId: 'evt_test' })),
}));

vi.mock('../../data/chatResponses.js', () => ({
  getAIResponse: vi.fn((message) => {
    if (message.toLowerCase().includes('budget')) {
      return 'Budget & Financial Overview:\n\n• Total IT Budget: $4.77B across all regions';
    }
    return 'Thank you for your question. As Canon\'s AI Strategic Advisor, I can help you with various topics.';
  }),
}));

function renderWithProvider(ui) {
  return render(
    <AIChatContextProvider>
      {ui}
    </AIChatContextProvider>,
  );
}

describe('AIChatAssistant', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders toggle button with robot icon', () => {
    renderWithProvider(<AIChatAssistant />);
    const toggleButton = screen.getByRole('button', { name: 'Open AI Chat Assistant' });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking toggle opens chat drawer', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    const toggleButton = screen.getByRole('button', { name: 'Open AI Chat Assistant' });
    await user.click(toggleButton);

    const chatRegion = screen.getByRole('region', { name: 'AI Chat Assistant' });
    expect(chatRegion).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close AI Chat Assistant' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking toggle again closes chat drawer', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    const toggleButton = screen.getByRole('button', { name: 'Open AI Chat Assistant' });
    await user.click(toggleButton);

    expect(screen.getByRole('region', { name: 'AI Chat Assistant' })).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close AI Chat Assistant' });
    await user.click(closeButton);

    expect(screen.queryByRole('region', { name: 'AI Chat Assistant' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open AI Chat Assistant' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('sending a message adds it to message list', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, 'Hello there');

    const sendButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(sendButton);

    const messageList = screen.getByRole('list', { name: 'Chat messages' });
    expect(within(messageList).getByText('Hello there')).toBeInTheDocument();
    expect(within(messageList).getByText('You')).toBeInTheDocument();
  });

  it('AI responds with canned response after delay', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, 'Tell me about budget');

    const sendButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(sendButton);

    const messageList = screen.getByRole('list', { name: 'Chat messages' });
    expect(within(messageList).getByText('Tell me about budget')).toBeInTheDocument();

    expect(within(messageList).queryByText(/Budget & Financial Overview/)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(AI_RESPONSE_DELAY_MS + 100);
    });

    expect(within(messageList).getByText(/Budget & Financial Overview/)).toBeInTheDocument();
    expect(within(messageList).getByText('AI Advisor')).toBeInTheDocument();
  });

  it('Shift+Enter does not submit the message', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, 'Test message');

    await user.keyboard('{Shift>}{Enter}{/Shift}');

    const messageList = screen.getByRole('list', { name: 'Chat messages' });
    expect(within(messageList).queryByText('Test message')).not.toBeInTheDocument();

    expect(input).toHaveValue('Test message\n');
  });

  it('Enter key submits the message', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, 'My question');
    await user.keyboard('{Enter}');

    const messageList = screen.getByRole('list', { name: 'Chat messages' });
    expect(within(messageList).getByText('My question')).toBeInTheDocument();
  });

  it('chat drawer has correct ARIA attributes', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const chatRegion = screen.getByRole('region', { name: 'AI Chat Assistant' });
    expect(chatRegion).toBeInTheDocument();
    expect(chatRegion).toHaveAttribute('aria-label', 'AI Chat Assistant');

    const messageList = screen.getByRole('list', { name: 'Chat messages' });
    expect(messageList).toBeInTheDocument();
    expect(messageList).toHaveAttribute('aria-label', 'Chat messages');

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Chat message input');

    const sendButton = screen.getByRole('button', { name: 'Send message' });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toHaveAttribute('aria-label', 'Send message');
  });

  it('send button is disabled when input is empty', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const sendButton = screen.getByRole('button', { name: 'Send message' });
    expect(sendButton).toBeDisabled();
  });

  it('send button is enabled when input has text', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, 'Some text');

    const sendButton = screen.getByRole('button', { name: 'Send message' });
    expect(sendButton).not.toBeDisabled();
  });

  it('shows welcome message when no messages exist', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    expect(screen.getByText(/Welcome. I'm your AI Strategic Advisor/)).toBeInTheDocument();
  });

  it('clears input after sending a message', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, 'Test clearing');

    const sendButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(sendButton);

    expect(input).toHaveValue('');
  });

  it('does not send empty or whitespace-only messages', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    const input = screen.getByRole('textbox', { name: 'Chat message input' });
    await user.type(input, '   ');
    await user.keyboard('{Enter}');

    const messageList = screen.getByRole('list', { name: 'Chat messages' });
    const listItems = within(messageList).queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('displays AI Strategic Advisor header in chat drawer', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithProvider(<AIChatAssistant />);

    await user.click(screen.getByRole('button', { name: 'Open AI Chat Assistant' }));

    expect(screen.getByText('AI Strategic Advisor')).toBeInTheDocument();
    expect(screen.getByText('Canon CIO')).toBeInTheDocument();
  });
});