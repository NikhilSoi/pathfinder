'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export const NovaChat = ({ initialPrompt, stage }: { initialPrompt: string, stage: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset and fire initial prompt on stage change
    setMessages([{ role: 'assistant', content: initialPrompt }]);
    setIsOpen(true);
  }, [initialPrompt, stage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, stage })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-6 right-6 z-40 bg-surface border border-accent/30 text-accent p-4 rounded-full shadow-lg cursor-pointer flex items-center gap-3 hover:bg-surface/80 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-50" />
        </div>
        <MessageSquare size={20} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 glass rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 max-h-[600px] h-[70vh] border border-white/10"
          >
            <div className="bg-surface/80 p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="font-bold text-white">Nova AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={clsx("max-w-[85%] rounded-lg p-3 text-sm", 
                  msg.role === 'assistant' ? "bg-white/5 text-gray-200 self-start" : "bg-accent/10 text-accent border border-accent/20 self-end"
                )}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white/5 text-gray-200 rounded-lg p-3 self-start text-sm flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask Nova..."
                className="flex-grow bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-accent text-[#0B1F35] p-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
