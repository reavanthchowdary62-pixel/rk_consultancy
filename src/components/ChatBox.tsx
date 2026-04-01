"use client";

import { MessageCircle, X, Send, User, Bot, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBookAgentClick = () => {
    append({
        role: "user",
        content: "I want to book an agent"
    });
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-blue-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 animate-bounce group"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-12 right-0 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with StudyBot
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transform animate-fade-in-up origin-bottom-right">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold leading-tight">RK Consultancy AI</h3>
            <p className="text-xs text-blue-100">Global Education Counselor</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages Array */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-800/20">
        {messages.length === 0 && (
          <div className="text-center text-sm text-gray-500 mt-4 space-y-4">
            <p>👋 Hi! I can help you find universities, compare fees, and book counseling agents.</p>
            <button 
                onClick={handleBookAgentClick}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-primary text-xs font-semibold shadow hover:shadow-md transition-all flex items-center justify-center w-full"
            >
              <Calendar size={14} className="mr-2" /> Book a Consultation
            </button>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} whitespace-pre-wrap`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "ml-2 bg-gray-200 text-gray-600" : "mr-2 bg-gradient-to-tr from-primary to-blue-400 text-white"}`}>
                {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div 
                className={`text-sm px-4 py-3 rounded-2xl ${
                  message.role === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[85%] flex-row">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2 bg-gradient-to-tr from-primary to-blue-400 text-white">
                <Bot size={16} />
              </div>
              <div className="text-sm px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <input 
          type="text" 
          className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
          placeholder="Ask me about universities..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Send size={18} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
}
