import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'ai'} role - The sender role
 * @property {string} content - The message content
 * @property {number} timestamp - Unix timestamp in milliseconds
 */

/**
 * @typedef {Object} AIChatContextType
 * @property {boolean} isChatOpen - Whether the chat panel is open
 * @property {function(): void} toggleChat - Toggle chat open/closed
 * @property {function(): void} openChat - Open the chat panel
 * @property {function(): void} closeChat - Close the chat panel
 * @property {ChatMessage[]} messages - Array of chat messages
 * @property {function(string, string): void} addMessage - Add a message (role, content)
 * @property {string} inputValue - Current chat input value
 * @property {function(string): void} setInputValue - Set the chat input value
 */

const AIChatContext = createContext(null);

/**
 * Provider component for AI chat state.
 * Wraps the entire app to enable chip-to-chat bridge from any component.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement}
 */
export function AIChatContextProvider({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  /**
   * Add a message to the chat history
   * @param {'user'|'ai'} role - The sender role
   * @param {string} content - The message content
   */
  const addMessage = useCallback((role, content) => {
    if (!role || typeof role !== 'string') {
      return;
    }
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return;
    }
    const message = {
      role,
      content: content.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, message]);
  }, []);

  const value = useMemo(
    () => ({
      isChatOpen,
      toggleChat,
      openChat,
      closeChat,
      messages,
      addMessage,
      inputValue,
      setInputValue,
    }),
    [isChatOpen, toggleChat, openChat, closeChat, messages, addMessage, inputValue],
  );

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  );
}

AIChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to consume the AI chat context.
 * Must be used within an AIChatContextProvider.
 *
 * @returns {AIChatContextType} The AI chat context value
 * @throws {Error} If used outside of AIChatContextProvider
 */
export function useAIChatContext() {
  const context = useContext(AIChatContext);
  if (context === null) {
    throw new Error('useAIChatContext must be used within an AIChatContextProvider');
  }
  return context;
}

export default AIChatContext;