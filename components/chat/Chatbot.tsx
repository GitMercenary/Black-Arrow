'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Button from '../ui/Button';
import {
  CHATBOT_QA,
  CHATBOT_FALLBACKS,
  GREETING_PATTERNS,
  GOODBYE_PATTERNS,
  type ChatMessage as QAMessage,
} from '@/lib/constants/chatbot-qa';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: CHATBOT_FALLBACKS.greeting,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  /**
   * Find best matching Q&A
   */
  const findBestMatch = (userInput: string): QAMessage | null => {
    const normalizedInput = userInput.toLowerCase().trim();

    // Check for exact question match first
    const exactMatch = CHATBOT_QA.find(
      (qa) => qa.question.toLowerCase() === normalizedInput
    );
    if (exactMatch) return exactMatch;

    // Check for keyword matches
    let bestMatch: QAMessage | null = null;
    let highestScore = 0;

    CHATBOT_QA.forEach((qa) => {
      let score = 0;

      // Check if any keyword matches
      qa.keywords.forEach((keyword) => {
        if (normalizedInput.includes(keyword.toLowerCase())) {
          score += 2;
        }
      });

      // Check if words from question appear in input
      const questionWords = qa.question.toLowerCase().split(' ');
      questionWords.forEach((word) => {
        if (word.length > 3 && normalizedInput.includes(word)) {
          score += 1;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = qa;
      }
    });

    return highestScore >= 2 ? bestMatch : null;
  };

  /**
   * Check if message is a greeting
   */
  const isGreeting = (text: string): boolean => {
    const normalized = text.toLowerCase().trim();
    return GREETING_PATTERNS.some((pattern) => normalized === pattern);
  };

  /**
   * Check if message is a goodbye
   */
  const isGoodbye = (text: string): boolean => {
    const normalized = text.toLowerCase().trim();
    return GOODBYE_PATTERNS.some((pattern) => normalized.includes(pattern));
  };

  /**
   * Handle sending a message
   */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let botResponse: string;

    // Check for greeting
    if (isGreeting(userMessage.text)) {
      botResponse = CHATBOT_FALLBACKS.greeting;
    }
    // Check for goodbye
    else if (isGoodbye(userMessage.text)) {
      botResponse = CHATBOT_FALLBACKS.goodbye;
    }
    // Find matching Q&A
    else {
      const match = findBestMatch(userMessage.text);
      botResponse = match ? match.answer : CHATBOT_FALLBACKS.noMatch;
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  /**
   * Handle key press
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            'w-14 h-14 rounded-full',
            'bg-warm-sand text-deep-obsidian',
            'shadow-lg hover:shadow-xl',
            'flex items-center justify-center',
            'transition-all duration-300',
            'hover:scale-110'
          )}
          aria-label="Open chat"
        >
          <MessageCircle size={24} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50',
            'w-full sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-deep-obsidian border-2 border-warm-sand rounded-xl shadow-2xl',
            'flex flex-col',
            'animate-in slide-in-from-bottom-4 fade-in duration-300',
            isMinimized ? 'h-16' : 'h-[90vh] sm:h-[600px] max-h-[600px]'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-warm-sand/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warm-sand/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-warm-sand" />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-gray-900 dark:text-cloud-dancer">BLACK ARROW AI</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-ui rounded-full transition-colors"
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
              >
                <Minimize2 size={16} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-ui rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg p-3 whitespace-pre-wrap',
                        message.sender === 'user'
                          ? 'bg-warm-sand text-deep-obsidian'
                          : 'bg-slate-100 dark:bg-neutral-800 text-gray-900 dark:text-cloud-dancer'
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-neutral-800 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-cloud-dancer/40 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-cloud-dancer/40 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 dark:bg-cloud-dancer/40 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                <button
                  onClick={() => setInput('What services do you offer?')}
                  className="text-xs px-3 py-1 bg-slate-100 dark:bg-neutral-800 hover:bg-warm-sand/20 border border-slate-200 dark:border-neutral-700 hover:border-warm-sand/50 rounded-full transition-colors text-gray-900 dark:text-cloud-dancer"
                >
                  Services
                </button>
                <button
                  onClick={() => setInput('How much does it cost?')}
                  className="text-xs px-3 py-1 bg-slate-100 dark:bg-neutral-800 hover:bg-warm-sand/20 border border-slate-200 dark:border-neutral-700 hover:border-warm-sand/50 rounded-full transition-colors text-gray-900 dark:text-cloud-dancer"
                >
                  Pricing
                </button>
                <button
                  onClick={() => setInput('How do I get started?')}
                  className="text-xs px-3 py-1 bg-slate-100 dark:bg-neutral-800 hover:bg-warm-sand/20 border border-slate-200 dark:border-neutral-700 hover:border-warm-sand/50 rounded-full transition-colors text-gray-900 dark:text-cloud-dancer"
                >
                  Get Started
                </button>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-warm-sand/30">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className={cn(
                      'flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                      'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40 text-sm',
                      'focus:outline-none focus:border-warm-sand transition-colors'
                    )}
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={cn(
                      'px-4 py-2 rounded-lg bg-warm-sand text-deep-obsidian font-bold',
                      'hover:bg-warm-sand/90 transition-all',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
