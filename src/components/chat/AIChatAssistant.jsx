import { useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useAIChatContext } from '../../context/AIChatContext.jsx';
import { getAIResponse } from '../../data/chatResponses.js';
import { AI_RESPONSE_DELAY_MS } from '../../constants.js';
import { trackEvent } from '../../utils/eventTracker.js';

/**
 * Robot icon SVG for the chat toggle button (open state)
 * @returns {React.ReactElement}
 */
function RobotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Close icon SVG for the chat toggle button (close state)
 * @returns {React.ReactElement}
 */
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Send icon SVG for the send button
 * @returns {React.ReactElement}
 */
function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/**
 * Individual chat message bubble component
 * @param {Object} props
 * @param {Object} props.message - The chat message object
 * @param {string} props.message.role - 'user' or 'ai'
 * @param {string} props.message.content - The message content
 * @param {number} props.message.timestamp - Unix timestamp in milliseconds
 * @returns {React.ReactElement}
 */
function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
      role="listitem"
    >
      <div className="flex items-center gap-1.5 px-1">
        <span className="text-[10px] font-medium text-executive-300">
          {isUser ? 'You' : 'AI Advisor'}
        </span>
        <span className="text-[10px] text-executive-300/60">{formattedTime}</span>
      </div>
      <div
        className={`max-w-[85%] px-3 py-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-status-blue/20 text-executive-100 border border-status-blue/30 rounded-br-sm'
            : 'bg-glass-light text-executive-200 border border-glass-light rounded-bl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.oneOf(['user', 'ai']).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
};

/**
 * AI Chat Assistant component.
 * Floating toggle button (bottom-right) with robot/close icon toggle.
 * Chat drawer is fixed position, responsive width (full on mobile, 380px on desktop).
 * Displays message history with user/assistant styling.
 * Input textarea supports Enter to send, Shift+Enter for newline.
 * On user message, adds to history and after configurable delay calls getAIResponse
 * for keyword-based canned response.
 * Uses useAIChatContext for state. Auto-scrolls to latest message.
 * Includes ARIA labels for toggle button and chat region.
 *
 * @returns {React.ReactElement}
 */
function AIChatAssistant() {
  const {
    isChatOpen,
    toggleChat,
    messages,
    addMessage,
    inputValue,
    setInputValue,
  } = useAIChatContext();

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const isRespondingRef = useRef(false);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isChatOpen && textareaRef.current) {
      const timer = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  const handleSendMessage = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || trimmedValue.length === 0) {
      return;
    }

    if (isRespondingRef.current) {
      return;
    }

    // Add user message
    addMessage('user', trimmedValue);
    setInputValue('');
    trackEvent('chat_event', 'user_message_sent', trimmedValue);

    // Simulate AI response after delay
    isRespondingRef.current = true;
    setTimeout(() => {
      const aiResponse = getAIResponse(trimmedValue);
      addMessage('ai', aiResponse);
      trackEvent('chat_event', 'ai_response_generated', trimmedValue);
      isRespondingRef.current = false;
    }, AI_RESPONSE_DELAY_MS);
  }, [inputValue, addMessage, setInputValue]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value.length <= 500) {
        setInputValue(value);
      }
    },
    [setInputValue],
  );

  const handleToggleClick = useCallback(() => {
    toggleChat();
    trackEvent('chat_event', isChatOpen ? 'chat_closed' : 'chat_opened', '');
  }, [toggleChat, isChatOpen]);

  return (
    <>
      {/* Chat Drawer */}
      {isChatOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] flex flex-col bg-glass-dark backdrop-blur-lg border border-glass-medium rounded-xl shadow-executive-lg overflow-hidden animate-fade-in"
          role="region"
          aria-label="AI Chat Assistant"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-glass-light flex-shrink-0">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full bg-status-green animate-status-pulse"
                aria-hidden="true"
              />
              <h3 className="text-sm font-semibold text-white">AI Strategic Advisor</h3>
            </div>
            <span className="text-[10px] text-executive-300 font-medium">Canon CIO</span>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 min-h-[200px] max-h-[calc(70vh-120px)]"
            role="list"
            aria-label="Chat messages"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                <span
                  className="inline-block w-3 h-3 rounded-full bg-status-blue animate-ai-pulse"
                  aria-hidden="true"
                />
                <p className="text-xs text-executive-300 text-center leading-relaxed max-w-[260px]">
                  Welcome. I&apos;m your AI Strategic Advisor. Ask me about budget, risk, innovation,
                  partnerships, infrastructure, or any executive topic.
                </p>
              </div>
            )}
            {messages.map((msg, index) => (
              <ChatMessage key={`${msg.timestamp}-${index}`} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-end gap-2 px-4 py-3 border-t border-glass-light flex-shrink-0">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about budget, risk, innovation..."
              rows={1}
              maxLength={500}
              className="flex-1 resize-none bg-glass-light border border-glass rounded-lg px-3 py-2 text-xs text-white placeholder-executive-300/60 focus:outline-none focus:ring-2 focus:ring-status-blue/50 focus:border-status-blue/30 transition-all duration-200"
              aria-label="Chat message input"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-status-blue/20 text-status-blue border border-status-blue/30 hover:bg-status-blue/30 hover:border-status-blue/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-executive-900 focus:ring-status-blue/50"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={handleToggleClick}
        className="fixed bottom-4 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-canon-red text-white shadow-executive-lg hover:bg-canon-red-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-executive-900 focus:ring-canon-red/50 animate-ai-glow"
        aria-label={isChatOpen ? 'Close AI Chat Assistant' : 'Open AI Chat Assistant'}
        aria-expanded={isChatOpen}
      >
        {isChatOpen ? <CloseIcon /> : <RobotIcon />}
      </button>
    </>
  );
}

export default memo(AIChatAssistant);
export { AIChatAssistant };