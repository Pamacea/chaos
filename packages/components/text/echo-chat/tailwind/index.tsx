'use client';

import { forwardRef, useState, FormEvent, KeyboardEvent, HTMLAttributes } from 'react';

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

const variantColors = {
  default: { accent: '#00ff00', echo: '#ff00ff' },
  cyber: { accent: '#00ffff', echo: '#ff00ff' },
  terminal: { accent: '#00ff00', echo: '#ffff00' },
  fire: { accent: '#ff4400', echo: '#ff0000' },
  nuclear: { accent: '#ff00ff', echo: '#00ffff' },
};

export const EchoChat = forwardRef<HTMLDivElement, EchoChatProps>(
  (
    {
      accentColor,
      echoColor,
      maxMessages = 50,
      variant = 'default',
      size = 'default',
      defaultTransform = 'none',
      showTransformSelector = true,
      placeholder = 'Type a message...',
      sendButtonText = 'Send',
      onSend,
      echoFunction,
      className = '',
      ...props
    },
    ref
  ) => {
    const [messages, setMessages] = useState<Array<{ id: number; text: string; isUser: boolean; transform: TransformType }>>([]);
    const [input, setInput] = useState('');
    const [transform, setTransform] = useState<TransformType>(defaultTransform);
    const [messageId, setMessageId] = useState(0);

    const colors = accentColor && echoColor
      ? { accent: accentColor, echo: echoColor }
      : variantColors[variant];

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

    const sizeClasses = {
      compact: { list: 'max-h-[150px]', input: 'py-2 px-3 text-sm', button: 'py-2 px-4 text-xs' },
      default: { list: 'max-h-[300px]', input: 'py-3 px-4 text-sm', button: 'py-3 px-6 text-xs' },
      large: { list: 'max-h-[500px]', input: 'py-4 px-5 text-base', button: 'py-4 px-8 text-sm' },
    };

    const s = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={`flex flex-col gap-3 font-mono w-full max-w-[500px] ${className}`}
        {...props}
      >
        {showTransformSelector && (
          <div className="flex items-center gap-2 p-2 bg-black/20 rounded">
            <span className="text-[0.625rem] uppercase tracking-[0.05em] opacity-60">Echo Mode:</span>
            <select
              className="py-1 px-2 font-inherit text-xs bg-black/30 border border-white/20 rounded text-inherit cursor-pointer focus:outline-none focus:border-[var(--accent)]"
              style={{ '--accent': colors.accent } as React.CSSProperties}
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

        <div className={`${s.list} flex flex-col gap-2 p-2 bg-black/30 rounded overflow-y-auto`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 p-2 rounded relative animate-[messageIn_0.3s_ease] ${
                msg.isUser
                  ? 'self-end bg-green-500/10 border-l-2'
                  : 'self-start bg-fuchsia-500/10 border-r-2'
              }`}
              style={{ borderColor: msg.isUser ? colors.accent : colors.echo }}
            >
              <div className={`flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.05em] opacity-60 ${msg.isUser ? 'justify-end' : ''}`}>
                {msg.isUser ? 'YOU' : 'ECHO'}
              </div>
              <div
                className={`text-sm ${!msg.isUser && msg.transform === 'reverse' ? 'direction-rtl' : ''} ${
                  !msg.isUser && msg.transform === 'glitch' ? 'animate-[echoGlitch_0.3s_infinite]' : ''
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="p-2">
              <div className="text-sm opacity-40">No messages yet. Start the conversation...</div>
            </div>
          )}
        </div>

        <form className="flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            className={`${s.input} flex-1 font-inherit bg-black/30 border border-white/20 rounded text-inherit outline-none transition-all focus:border-[var(--accent)] focus:shadow-[0_0_10px_rgba(0,255,0,0.2)]`}
            style={{ '--accent': colors.accent } as React.CSSProperties}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
          <button
            type="submit"
            className={`${s.button} font-inherit font-semibold uppercase tracking-[0.1em] rounded text-black transition-all hover:scale-105 hover:shadow-[0_0_15px_var(--accent)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{ backgroundColor: colors.accent, '--accent': colors.accent } as React.CSSProperties}
            disabled={!input.trim()}
          >
            {sendButtonText}
          </button>
        </form>

        <div className="flex items-center gap-2 text-[0.625rem] opacity-50">
          <div className="w-1.5 h-1.5 rounded-full animate-[statusPulse_1s_ease-in-out_infinite]" style={{ backgroundColor: colors.accent }} />
          <span>System Ready</span>
        </div>

        <style>{`
          @keyframes messageIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes echoGlitch {
            0%, 90%, 100% { transform: translate(0); text-shadow: none; }
            92% { transform: translate(-1px, 1px); text-shadow: -1px 0 var(--echo-color); }
            94% { transform: translate(1px, -1px); text-shadow: 1px 0 var(--echo-color); }
            96% { transform: translate(-1px, -1px); }
            98% { transform: translate(1px, 1px); }
          }
          @keyframes statusPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }
);

EchoChat.displayName = 'EchoChat';

export default EchoChat;
