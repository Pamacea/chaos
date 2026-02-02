'use client';

import { forwardRef, useState, HTMLAttributes } from 'react';
import styles from './chat-interface.module.css';

export interface Message {
  id: string;
  content: string;
  sender?: 'user' | 'system' | 'echo';
  timestamp?: Date;
}

export interface ChatInterfaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Initial messages */
  initialMessages?: Message[];
  /** On message sent */
  onSendMessage?: (content: string) => void;
  /** Show timestamps */
  showTimestamps?: boolean;
  /** Chat theme */
  theme?: 'terminal' | 'neon' | 'minimal' | 'cyber';
  /** Auto-scroll to bottom */
  autoScroll?: boolean;
  /** Show input field */
  showInput?: boolean;
  /** Input placeholder */
  placeholder?: string;
  /** Send button label */
  sendLabel?: string;
}

export const ChatInterface = forwardRef<HTMLDivElement, ChatInterfaceProps>(
  (
    {
      initialMessages = [],
      onSendMessage,
      showTimestamps = false,
      theme = 'terminal',
      autoScroll = true,
      showInput = true,
      placeholder = 'Type a message...',
      sendLabel = 'Send',
      className,
      ...props
    },
    ref
  ) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');

    const handleSend = () => {
      if (!input.trim()) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: 'user',
        timestamp: new Date(),
      };

      const updated = [...messages, newMessage];
      setMessages(updated);
      onSendMessage?.(input);
      setInput('');

      // Echo effect
      setTimeout(() => {
        const echoMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: transformEcho(input),
          sender: 'echo',
          timestamp: new Date(),
        };
        setMessages([...updated, echoMessage]);
      }, 500 + Math.random() * 1000);
    };

    const transformEcho = (text: string) => {
      const transformations = [
        (t) => t.toUpperCase(),
        (t) => t.toLowerCase(),
        (t) => t.split('').reverse().join(''),
        (t) => t.replace(/[aeiou]/gi, '?'),
        (t) => t.replace(/[^aeiou\s]/gi, '*'),
      ];
      const transform = transformations[Math.floor(Math.random() * transformations.length)];
      return transform(text);
    };

    return (
      <div
        ref={ref}
        className={`${styles.chatInterface} ${styles[theme]} ${className || ''}`}
        {...props}
      >
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={`${styles.message} ${styles.system}`}>
              <p>Welcome to the echo chamber. Your words will return... transformed.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${styles[msg.sender || 'user']}`}
            >
              <p className={styles.content}>{msg.content}</p>
              {showTimestamps && msg.timestamp && (
                <time className={styles.timestamp}>
                  {msg.timestamp.toLocaleTimeString()}
                </time>
              )}
            </div>
          ))}
        </div>

        {showInput && (
          <form className={styles.inputArea} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              type="text"
              className={styles.input}
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className={styles.sendBtn}>
              {sendLabel}
            </button>
          </form>
        )}
      </div>
    );
  }
);

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
