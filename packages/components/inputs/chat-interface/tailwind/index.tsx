'use client';

import { forwardRef, useState, HTMLAttributes } from 'react';

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

const themeStyles = {
  terminal: {
    container: 'bg-[#0a0a0a] text-green-500 border-2 border-green-500 font-["Courier_New",monospace]',
    input: 'bg-black text-green-500 border border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]',
    sendBtn: 'bg-green-500 text-black',
    systemMessage: 'bg-green-500/10 border-green-500',
  },
  neon: {
    container: 'bg-[#0a0a0a] text-cyan-400 border border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    input: 'bg-black/70 text-cyan-400 border border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.5)]',
    sendBtn: 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(0,255,255,0.5)]',
    systemMessage: 'bg-green-500/10 border-green-500',
  },
  minimal: {
    container: 'bg-white text-black border border-gray-200 font-sans',
    input: 'bg-gray-100 text-black border border-gray-200 focus:shadow-[0_0_0_2px_rgba(0,0,0,0.1)]',
    sendBtn: 'bg-black text-white',
    systemMessage: 'bg-amber-100 border-amber-300 text-amber-800',
  },
  cyber: {
    container: 'bg-[#0a0a0a] text-fuchsia-500 border-2 border-fuchsia-500 [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.03)_2px,rgba(255,0,255,0.03)_4px)]',
    input: 'bg-black/80 text-fuchsia-500 border border-fuchsia-500 uppercase focus:shadow-[0_0_15px_rgba(255,0,255,0.5)]',
    sendBtn: 'bg-fuchsia-500 text-black [text-shadow:0_0_5px_#ff00ff]',
    systemMessage: 'bg-green-500/10 border-green-500',
  },
};

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
      className = '',
      ...props
    },
    ref
  ) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const styles = themeStyles[theme];

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
        (t: string) => t.toUpperCase(),
        (t: string) => t.toLowerCase(),
        (t: string) => t.split('').reverse().join(''),
        (t: string) => t.replace(/[aeiou]/gi, '?'),
        (t: string) => t.replace(/[^aeiou\s]/gi, '*'),
      ];
      const transform = transformations[Math.floor(Math.random() * transformations.length)];
      return transform(text);
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col h-full max-h-600 overflow-hidden ${styles.container} ${className}`}
        {...props}
      >
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 [scrollbar-width:8px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-current [&::-webkit-scrollbar-thumb]:rounded">
          {messages.length === 0 && (
            <div className={`${styles.systemMessage} flex flex-col gap-1 p-3 rounded-lg max-w-[80%] mx-auto border text-sm`}>
              <p>Welcome to the echo chamber. Your words will return... transformed.</p>
            </div>
          )}

          {messages.map((msg) => {
            const messageStyles = msg.sender === 'user'
              ? 'self-end bg-white/10 border-white/20'
              : msg.sender === 'system'
              ? styles.systemMessage
              : 'self-start bg-fuchsia-500/5 border-fuchsia-500/20 opacity-80';

            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 p-3 rounded-lg max-w-[80%] animate-[messageAppear_0.3s_ease_forwards] ${messageStyles}`}
              >
                <p className="break-words leading-relaxed">{msg.content}</p>
                {showTimestamps && msg.timestamp && (
                  <time className="text-[10px] opacity-50 uppercase tracking-[0.05em]">
                    {msg.timestamp.toLocaleTimeString()}
                  </time>
                )}
              </div>
            );
          })}
        </div>

        {showInput && (
          <form
            className="flex gap-2 p-4 border-t current bg-black/50"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input
              type="text"
              className={`flex-1 px-4 py-3 ${styles.input} outline-none transition-all duration-300 text-sm`}
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className={`px-6 py-3 border-none ${styles.sendBtn} font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-80 hover:-translate-y-0.5`}
            >
              {sendLabel}
            </button>
          </form>
        )}

        <style>{`
          @keyframes messageAppear {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
);

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
