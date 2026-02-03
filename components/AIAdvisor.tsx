import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Hello. I am Aura AI. How can I assist you with your hospitality investment strategy today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await generateAIResponse(input);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-brand-gold text-brand-dark p-4 rounded-full shadow-2xl hover:bg-white transition-all ${isOpen ? 'opacity-0 pointer-events-none scale-0' : 'flex'}`}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ 
              type: "spring", 
              damping: 18, 
              stiffness: 180,
              mass: 0.8
            }}
            style={{ originX: 0.9, originY: 0.9 }}
            className="fixed bottom-8 right-4 md:right-8 w-[90vw] md:w-[400px] h-[550px] z-50 bg-brand-charcoal border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden backdrop-blur-sm"
          >
            {/* Header */}
            <div className="bg-brand-dark p-5 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                    <Bot size={22} />
                </div>
                <div>
                    <h3 className="font-serif text-white font-bold text-lg tracking-tight">Aura AI</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/70 font-bold">Strategy Consultant</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-brand-charcoal/30">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-brand-gold text-brand-dark rounded-br-none font-medium'
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                    <div className={`text-[10px] mt-1.5 opacity-50 ${msg.role === 'user' ? 'text-brand-dark' : 'text-gray-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                 >
                  <div className="bg-white/5 border border-white/10 text-brand-gold p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                 </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-brand-dark/80 border-t border-white/10 backdrop-blur-md">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about premium yields..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold/40 focus:bg-white/10 transition-all placeholder:text-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-brand-gold text-brand-dark p-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50 shadow-lg shadow-brand-gold/10"
                >
                  <Send size={20} />
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-500 mt-3 text-center uppercase tracking-widest opacity-50">
                Encrypted & Private Consultation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAdvisor;