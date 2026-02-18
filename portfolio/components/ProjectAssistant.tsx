
import React, { useState, useRef, useEffect } from 'react';
import { generatePortfolioResponse } from '../services/gemini';
import { Message } from '../types';

const ProjectAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi, I'm Phoenix. Ask me anything about Sushant, projects, partnerships, or collaboration details." }
  ]);
  const suggestionQuestions = [
    'How to connect with Sushant?',
    'More about Sushant?',
    'What projects are currently ongoing?'
  ];
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (forcedMessage?: string) => {
    const messageToSend = forcedMessage || inputValue;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg = messageToSend;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await generatePortfolioResponse(userMsg, messages);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || "Something went wrong. Try again!" }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group overflow-hidden"
        aria-label="Open Phoenix assistant"
        title="Open Phoenix assistant"
      >
        {isOpen ? (
          <span className="material-symbols-outlined">close</span>
        ) : (
          <div className="relative">
             <img src="/assets/favicon.jpg" alt="Phoenix icon" title="Phoenix assistant" className="w-8 h-8 rounded-full object-cover" />
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-slow"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-primary/5 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-6 bg-primary text-white flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <img src="/assets/favicon.jpg" alt="Phoenix assistant" title="Phoenix assistant" className="w-7 h-7 rounded-full object-cover" />
             </div>
             <div>
                <p className="font-bold text-sm">Phoenix</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Active Now</p>
                </div>
             </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar bg-cream/30"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white shadow-sm border border-primary/5 text-primary/80 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2">
                {suggestionQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="px-3 py-2 bg-white border border-primary/10 rounded-full text-xs font-semibold text-primary/70 hover:bg-primary/5 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-primary/5 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-primary/5">
             <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Chat with Phoenix..."
                  className="w-full bg-cream rounded-full pl-6 pr-14 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all border-none"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-1.5 top-1.5 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center transition-opacity hover:opacity-90 active:scale-95"
                  disabled={isLoading}
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAssistant;
