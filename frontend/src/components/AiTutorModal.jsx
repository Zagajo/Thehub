import React, { useState } from 'react';
import { Bot, Sparkles, Send, X, BookOpen, Lightbulb, MessageSquare } from 'lucide-react';
import { api } from '../services/api.js';

export default function AiTutorModal({ isOpen, onClose, currentCourse }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your AI Learning Coach for The Hub Rwanda. How can I assist you with ${currentCourse?.title || 'your skills development pathway and practical exercises'} today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await api.askAiTutor(userText, currentCourse?.title || 'General Skills', 'Intermediate');
      if (res.success) {
        setMessages(prev => [...prev, { sender: 'ai', text: res.answer, mode: res.mode }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'I encountered an error. Please try again shortly.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Connection issue reaching the AI tutor server.' }]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'How do I interpret Rwanda NISR Labour Force indicators?',
    'What SQL queries should a junior data analyst master?',
    'Explain how low-bandwidth offline caching works in React.',
    'How do I prepare for a technical interview in Kigali?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm">The Hub AI Learning Coach</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-slate-400">Context: {currentCourse?.title || 'Skills & Career Guidance'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 flex items-center space-x-2 shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Formulating guidance and practical advice...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="p-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 font-semibold shrink-0 flex items-center space-x-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested:</span>
          </span>
          {sampleQuestions.slice(0, 2).map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(q);
              }}
              className="shrink-0 bg-white hover:bg-slate-50 border border-slate-300/80 px-2.5 py-1 rounded-lg text-slate-700 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about exercises, SQL, NISR data, or code..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none focus:bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
