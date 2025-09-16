

import { useState, useRef, useEffect } from 'react';
// Utility for fade-in animation
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
import AppLogoIcon from './app-logo-icon';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from './ui/card';

const faqs = [
  {
    question: 'What are your opening hours?',
    answer: 'UltraFlex gyms are open 24/7 for members. Staffed hours may vary by location.'
  },
  {
    question: 'How do I join UltraFlex?',
    answer: 'Click the Sign Up button on our homepage or visit your nearest UltraFlex location.'
  },
  {
    question: 'Do you offer personal training?',
    answer: 'Yes! We have expert trainers available for personal and group sessions.'
  },
  {
    question: 'Is there parking available?',
    answer: 'All UltraFlex locations offer free parking for members.'
  },
  {
    question: 'Can I freeze or cancel my membership?',
    answer: 'Yes, you can freeze or cancel your membership by contacting our support team or visiting the front desk.'
  },
];

export default function AIChatbotFAQ() {
  const [open, setOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the UltraFlex AI Assistant. Ask me anything about memberships, facilities, or trainers.', animate: true }
  ]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
  setMessages((msgs) => [...msgs, { sender: 'user', text: input, animate: true }]);
    setInput('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: data.answer || "Sorry, I don't know that yet. Please contact our staff for more info!", animate: true }
      ]);
    } catch (err) {
      // fallback to FAQ if backend fails
      const found = faqs.find(faq => input.toLowerCase().includes(faq.question.toLowerCase().split(' ')[0]));
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: found ? found.answer : "Sorry, I don't know that yet. Please contact our staff for more info!", animate: true }
      ]);
    }
  };

  if (!open) {
    return (
      <button
        className="fixed bottom-6 right-6 z-50 bg-white hover:bg-red-100 transition rounded-full shadow-2xl w-16 h-16 flex items-center justify-center border-4 border-white p-0"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
        aria-label="Open chatbot"
        onClick={() => setOpen(true)}
      >
        <img
          src="/Images/logo/ultraflex-logo.webp"
          alt="UltraFlex Chatbot"
          className="w-12 h-12 object-contain rounded-full"
          draggable="false"
        />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[370px] max-w-full flex flex-col items-center justify-center">
      <Card className="rounded-2xl shadow-2xl border-0 w-full bg-gradient-to-br from-white via-red-50 to-red-100/60 p-0" style={{height: 'auto', minHeight: 0}}>
        <CardHeader className="px-8 pt-8 pb-0 text-center flex flex-col items-center gap-2 relative">
          <button
            className="absolute top-2 right-2 text-red-400 hover:text-red-700 transition text-xl font-bold rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Close chatbot"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center mb-1 bg-transparent">
              <img
                src="/Images/ultra-flex-200x167.webp"
                alt="UltraFlex Chatbot"
                className="w-12 h-12 object-contain bg-transparent"
                style={{ background: 'transparent' }}
                draggable="false"
              />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">UltraFlex AI Chatbot</CardTitle>
            <CardDescription className="text-base">Ask anything about memberships, facilities, or trainers.</CardDescription>
          </div>
        </CardHeader>
        <div className="relative flex-1 min-h-[250px] max-h-72 flex flex-col" style={{minHeight: 0}}>
          <CardContent className="flex-1 flex flex-col gap-3 px-6 py-4 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent m-0" style={{paddingBottom: 0, marginBottom: 0}}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={classNames(
                  'relative text-sm px-4 py-2 rounded-2xl max-w-[85%] w-fit',
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-black self-start ml-1'
                    : 'bg-red-600 text-white self-end mr-1',
                  msg.animate ? 'animate-fadein' : ''
                )}
                style={{
                  marginBottom: i === messages.length - 1 ? '56px' : '2px',
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                }}
              >
                {msg.text}
                {/* Bubble tail */}
                <span
                  className={classNames(
                    'absolute bottom-0',
                    msg.sender === 'bot'
                      ? 'left-0 -mb-2 -ml-2 w-3 h-3 bg-gray-100 rounded-bl-2xl'
                      : 'right-0 -mb-2 -mr-2 w-3 h-3 bg-red-600 rounded-br-2xl'
                  )}
                  style={{
                    clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                  }}
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="absolute left-0 right-0 bottom-0 flex px-0 py-0 bg-transparent rounded-b-2xl overflow-hidden border-t border-transparent m-0" style={{background: 'rgba(255,255,255,0.95)', marginBottom: 0}}>
            <input
              className="flex-1 px-4 py-2 outline-none bg-white text-base placeholder:text-gray-400 focus:bg-red-50 transition border-none shadow-none rounded-none rounded-bl-2xl"
              style={{ borderRight: 'none', borderTopLeftRadius: '0', borderBottomLeftRadius: '1rem' }}
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              autoFocus
            />
            <button
              className="bg-red-700 text-white px-6 py-2 rounded-none rounded-br-2xl hover:bg-red-800 transition font-semibold text-base focus:outline-none focus:ring-2 focus:ring-red-300"
              style={{ borderTopRightRadius: '0', borderBottomRightRadius: '1rem', borderLeft: 'none' }}
              onClick={handleSend}
            >
              Send
            </button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

// Add fade-in animation
// Add this to your global CSS if not present:
// .animate-fadein { animation: fadein 0.5s; }
// @keyframes fadein { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none; } }
