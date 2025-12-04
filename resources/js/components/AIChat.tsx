import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Sparkles } from 'lucide-react';
import { getAIResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import gsap from 'gsap';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Plant Box. How can I assist your wellness journey today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatWindowRef.current, 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" }
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getAIResponse([...messages, userMessage], input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="mb-4 w-[90vw] md:w-[400px] h-[500px] bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-stone-700 overflow-hidden flex flex-col transition-colors duration-300"
        >
          {/* Header */}
          <div className="bg-brand-50 dark:bg-stone-800 p-6 flex items-center justify-between border-b border-brand-100 dark:border-stone-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-200 dark:bg-brand-900 rounded-full flex items-center justify-center text-brand-800 dark:text-brand-200">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="font-serif font-bold text-brand-950 dark:text-brand-50 block">Concierge</span>
                <span className="text-xs text-brand-500 dark:text-brand-300 uppercase tracking-wider">AI Assistant</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-brand-100 dark:hover:bg-stone-700 p-2 rounded-full transition-colors text-brand-900 dark:text-brand-100">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-900 dark:bg-bee-500 text-white dark:text-brand-950 rounded-tr-sm' 
                      : 'bg-brand-50 dark:bg-stone-800 text-brand-900 dark:text-stone-200 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-brand-50 dark:bg-stone-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-stone-900 border-t border-brand-50 dark:border-stone-800">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products..."
                className="w-full bg-brand-50 dark:bg-stone-800 border-none rounded-full pl-6 pr-12 py-4 text-sm focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800 outline-none transition-all text-stone-900 dark:text-stone-100 placeholder-stone-400"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 bg-brand-900 dark:bg-bee-500 text-white dark:text-brand-950 p-2 rounded-full hover:bg-brand-800 dark:hover:bg-bee-400 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-brand-900 dark:bg-bee-500 text-white dark:text-brand-950 p-4 rounded-full shadow-2xl hover:bg-brand-800 dark:hover:bg-bee-400 transition-all hover:scale-110"
        >
          <MessageCircle size={28} />
          <span className="absolute right-0 top-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChat;