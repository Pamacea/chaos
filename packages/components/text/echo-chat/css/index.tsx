'use client';

import { forwardRef, useState, FormEvent, KeyboardEvent, HTMLAttributes } from 'react';
import styles from './echo-chat.module.css';

export type TransformType = 'none' | 'reverse' | 'glitch' | 'repeat' | 'scramble';

export interface EchoChatProps extends HTMLAttributes<HTMLDivElement> {
  /** Accent color */
  accentColor?: string;
  /** Echo color for responses */
  echoColor?: string;
  /** Maximum messages to display */
  maxMessages?: number;
  /** Color variant */
  variant?: 'default' | 'cyber' | 'terminal' | 'fire' | 'nuclear';
  /** Size variant */
  size?: 'default' | 'compact' | 'large';
  /** Default transform type */
  defaultTransform?: TransformType;
  /** Show transform selector */
  showTransformSelector?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Send button text */
  sendButtonText?: string;
  /** On message send callback */
  onSend?: (message: string, transform: TransformType) => void;
  /** Custom echo function */
  echoFunction?: (message: string, transform: TransformType) => string;
}

const DEFAULT_ECHO: Record<TransformType, (text: string) => string> = {
  none: (text) => text,
  reverse: (text) => text.split('').reverse().join(''),
  glitch: (text) => {
    const chars = '!<>-_\\/[]{}';
    return text
      .split('')
      .map((char) => (Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : char))
      .join('');
  },
  repeat: (text) => `${text}... ${text}... ${text}...`,
  scramble: (text) => {
    const words = text.split(' ');
    return words.map((word) => word.split('').sort(() => Math.random() - 0.5).join('')).join(' ');
  },
};

export const EchoChat = forwardRef<HTMLDivElement, EchoChatProps>(
  (
    {
      accentColor = '#00ff00',
      echoColor = '#ff00ff',
      maxMessages = 50,
      variant = 'default',
      size = 'default',
      defaultTransform = 'none',
      showTransformSelector = true,
      placeholder = 'Type a message...',
      sendButtonText = 'Send',
      onSend,
      echoFunction,
      className,
      ...props
    },
    ref
  ) => {
    const [messages, setMessages] = useState<Array<{ id: number; text: string; isUser: boolean; transform: TransformType }>>([]);
    const [input, setInput] = useState('');
    const [transform, setTransform] = useState<TransformType>(defaultTransform);
    const [messageId, setMessageId] = useState(0);

    const processEcho = (text: string, transformType: TransformType): string => {
      if (echoFunction) {
        return echoFunction(text, transformType);
      }
      return DEFAULT_ECHO[transformType](text);
    };

    const handleSend = (e?: FormEvent) => {
      e?.preventDefault();
      if (!input.trim()) return;

      const newUserMessage = { id: messageId, text: input, isUser: true, transform };
      setMessages((prev) => [...prev, newUserMessage]);

      const echoText = processEcho(input, transform);
      const newEchoMessage = { id: messageId + 1, text: echoText, isUser: false, transform };

      setMessages((prev) => {
        const updated = [...prev, newEchoMessage];
        return updated.slice(-maxMessages);
      });

      setMessageId((prev) => prev + 2);
      setInput('');
      onSend?.(input, transform);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div
        ref={ref}
        className={`${styles.container} ${styles[variant]} ${styles[size]} ${className || ''}`}
        style={{ '--accent': accentColor, '--echo-color': echoColor } as React.CSSProperties}
        {...props}
      >
        {showTransformSelector && (
          <div className={styles.transformSelector}>
            <span className={styles.transformLabel}>Echo Mode:</span>
            <select
              className={styles.transformSelect}
              value={transform}
              onChange={(e) => setTransform(e.target.value as TransformType)}
            >
              <option value="none">None</option>
              <option value="reverse">Reverse</option>
              <option value="glitch">Glitch</option>
              <option value="repeat">Repeat</option>
              <option value="scramble">Scramble</option>
            </select>
          </div>
        )}

        <div className={styles.messageList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.isUser ? styles.user : styles.echo} ${msg.transform !== 'none' ? styles[msg.transform] : ''}`}
            >
              <div className={styles.messageHeader}>
                {msg.isUser ? 'YOU' : 'ECHO'}
              </div>
              <div className={styles.messageContent}>{msg.text}</div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className={styles.message}>
              <div className={styles.messageContent} style={{ opacity: 0.4 }}>
                No messages yet. Start the conversation...
              </div>
            </div>
          )}
        </div>

        <form className={styles.inputArea} onSubmit={handleSend}>
          <input
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
          <button type="submit" className={styles.sendButton} disabled={!input.trim()}>
            {sendButtonText}
          </button>
        </form>

        <div className={styles.status}>
          <div className={styles.statusDot} />
          <span>System Ready</span>
        </div>
      </div>
    );
  }
);

EchoChat.displayName = 'EchoChat';

export default EchoChat;
