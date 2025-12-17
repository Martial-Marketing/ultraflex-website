import { useEffect, useRef, useState } from 'react';

type Msg = { sender: 'bot' | 'user'; text: string };

const INTRO = 'Hi! I am the UltraFlex AI Assistant. Ask about memberships, opening times, facilities, locations, or trainers.';

export default function AIChatbotFAQ() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([{ sender: 'bot', text: INTRO }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const GEMINI_ENDPOINT = (import.meta as any)?.env?.VITE_GEMINI_BACKEND_URL || '/api/gemini';

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // no launcher nudge; keep UI minimal

  const getContext = () => {
    if (typeof window === 'undefined') return { currentPath: '/', locationSlug: null as string | null };
    const currentPath = window.location.pathname || '/';
    const m = currentPath.match(/^\/locations\/(.+)$/);
    return { currentPath, locationSlug: m ? m[1] : null };
  };

  const canned = (q: string) => {
    const t = q.toLowerCase();
    const ashbourne = 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2';
    const { locationSlug } = getContext();
    const loc = locationSlug ? `/locations/${locationSlug}` : '/locations';
    if (/^(hi|hello|hey|hiya|yo|help)\b/.test(t)) {
      return 'Hi! I can help with UltraFlex memberships, opening times, facilities, locations, and trainers. Try “Membership options” or “Opening hours”.';
    }
    if (t.includes('price') || t.includes('how much') || t.includes('cost') || t.includes('pricing') || q.includes('£')) {
      return `We don’t publish fixed prices. Please use our Ashbourne portal for current options: ${ashbourne}. Day passes are available at reception.`;
    }
    if (t.includes('member') || t.includes('join') || t.includes('sign up') || t.includes('signup')) {
      return `Join UltraFlex via our Ashbourne signup: ${ashbourne}.`;
    }
    if (t.includes('open') || t.includes('opening') || t.includes('hours') || t.includes('24/7')) {
      return `Most sites are 24/7 for members; staffed hours vary. See your gym page: ${loc}.`;
    }
    if (t.includes('contact') || t.includes('email') || t.includes('phone')) {
      return `For general enquiries: info@ultraflexgym.co.uk. For site contacts, see ${loc}.`;
    }
    return null;
  };

  const extractLinks = (text: string) => {
    const links: { label: string; href: string; external?: boolean }[] = [];
    const ashbourne = 'https://secure.ashbournemanagement.co.uk/signupuk/index.aspx?fn=grbh2';
    const { locationSlug } = getContext();
    const locPath = locationSlug ? `/locations/${locationSlug}` : '/locations';

    if (text.includes('ashbournemanagement') || text.includes(ashbourne)) {
      links.push({ label: 'Join via Ashbourne', href: ashbourne, external: true });
    }
    if (text.includes('/membership')) {
      links.push({ label: 'Membership Page', href: '/membership' });
    }
    if (text.includes('/locations/')) {
      const m = text.match(/\/locations\/[a-z0-9-]+/i);
      if (m) links.push({ label: 'View Location', href: m[0] });
    } else if (text.includes('/locations')) {
      links.push({ label: 'All Locations', href: '/locations' });
    } else if (text.toLowerCase().includes('your gym page')) {
      links.push({ label: 'Your Gym Page', href: locPath });
    }

    const urlMatches = text.match(/https?:\/\/[^\s)]+/g) || [];
    for (const u of urlMatches) {
      if (u.includes('ashbournemanagement')) continue;
      try {
        const host = new URL(u).hostname.replace(/^www\./, '');
        links.push({ label: host, href: u, external: true });
      } catch {}
    }

    const seen = new Set<string>();
    return links.filter(l => (seen.has(l.href) ? false : (seen.add(l.href), true)));
  };

  const sanitizeBotText = (text: string) => {
    let t = text;
    // Strip full URLs
    t = t.replace(/https?:\/\/[^\s)]+/g, '').trim();
    // Strip inline paths like /membership, /locations or /locations/slug
    t = t.replace(/\/(membership|locations\/[a-z0-9-]+|locations)\b/gi, '').trim();
    // Collapse extra spaces and remove trailing punctuation introduced by stripping
    t = t.replace(/\s{2,}/g, ' ').replace(/[.,;:()\s]+$/g, '').trim();
    return t || 'I’ve added quick links below.';
  };

  const send = async (forced?: string) => {
    const text = (forced ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { sender: 'user', text }]);
    setInput('');
    setTyping(true);

    try {
      const cannedAns = canned(text);
      const { currentPath, locationSlug } = getContext();
      const res = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, context: { currentPath, locationSlug } })
      });
      let answer = cannedAns;
      if (res.ok) {
        const data = await res.json();
        answer = data.answer || cannedAns || "I’m not sure yet — try asking about memberships, opening times, facilities, locations, or trainers. For urgent help, contact your gym team.";
      } else {
        answer = cannedAns || "I’m not sure yet — try asking about memberships, opening times, facilities, locations, or trainers. For urgent help, contact your gym team.";
      }
      setMessages((m) => [...m, { sender: 'bot', text: answer! }]);
    } catch {
      const fallback = canned(text) || "I’m not sure yet — try asking about memberships, opening times, facilities, locations, or trainers. For urgent help, contact your gym team.";
      setMessages((m) => [...m, { sender: 'bot', text: fallback }]);
    } finally {
      setTyping(false);
    }
  };

  // Auto-hide the inviting bubble after some time
  useEffect(() => {
    if (!open && showBubble) {
      const t = setTimeout(() => setShowBubble(false), 15000);
      return () => clearTimeout(t);
    }
  }, [open, showBubble]);

  if (!open) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Inviting bubble */}
        {showBubble && (
          <button
            type="button"
            onClick={() => { setOpen(true); setShowBubble(false); }}
            className="relative mb-2 max-w-[220px] rounded-2xl px-3 py-2 text-sm bg-white/10 text-gray-100 border border-white/15 backdrop-blur-md shadow-lg hover:bg-white/15 transition-colors animate-in fade-in zoom-in-95"
          >
            <span className="block">Need help? Ask our assistant.</span>
            <span className="absolute -bottom-2 right-6 w-0 h-0 border-t-8 border-t-white/10 border-r-8 border-r-transparent" />
          </button>
        )}
        {/* Launcher button */}
        <button
          aria-label="Open chat"
          className="w-16 h-16 rounded-full bg-black/80 backdrop-blur-md border border-white/10 ring-1 ring-red-500/40 text-white shadow-xl hover:bg-black/70 hover:shadow-2xl hover:scale-105 transition transform"
          onClick={() => { setOpen(true); setShowBubble(false); }}
        >
          <img
            src="/Images/ultra-flex-200x167%20(1).png"
            alt="Open UltraFlex Assistant"
            className="w-9 h-9 mx-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            draggable="false"
          />
        </button>
      </div>
    );
  }

  const { locationSlug } = getContext();
  const suggestions = locationSlug ? ['Opening hours', 'Facilities'] : ['Membership options', 'Day pass price'];

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[92vw]">
      <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/80 backdrop-blur-md" style={{ maxHeight: '70vh' }}>
        <div className="relative flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <img src="/Images/ultra-flex-200x167.webp" alt="UF" className="w-7 h-7 object-contain" />
          <div className="flex-1">
            <div className="text-white font-semibold leading-tight">UltraFlex AI Assistant</div>
            <div className="text-xs text-gray-300">Ask about memberships, facilities, or opening times.</div>
          </div>
          <button aria-label="Close" onClick={() => setOpen(false)} className="text-gray-300 hover:text-red-400">×</button>
        </div>

        <div className="flex-1 min-h-[260px] max-h-[calc(70vh-150px)] overflow-y-auto px-4 py-3 space-y-3 flex flex-col">
          {messages.map((m, i) => {
            const isBot = m.sender === 'bot';
            const links = isBot ? extractLinks(m.text) : [];
            return (
              <div key={i} className={isBot ? 'self-start max-w-[85%]' : 'self-end max-w-[85%]'}>
                <div className={isBot ? 'bg-white/10 text-gray-100 border border-white/10 rounded-2xl px-4 py-2' : 'bg-red-600 text-white rounded-2xl px-4 py-2'}>
                  <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{isBot ? sanitizeBotText(m.text) : m.text}</div>
                </div>
                {isBot && links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {links.map((l) => (
                      <a
                        key={`${i}-${l.href}`}
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        className="group inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md hover:from-red-500 hover:to-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-0 active:translate-y-px transition"
                      >
                        <span>{l.label}</span>
                        {l.external ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 opacity-90 group-hover:opacity-100">
                            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 opacity-90 group-hover:opacity-100">
                            <path d="M10 17l5-5-5-5v10z" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {typing && (
            <div className="self-start max-w-[85%] bg-white/10 text-gray-100 border border-white/10 rounded-2xl px-4 py-2">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.3s]" />
                <span className="text-xs text-gray-300 ml-1">Typing…</span>
              </span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="px-4 pt-1 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200 hover:bg-red-700/30 transition" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3">
            <input
              className="flex-1 px-1 py-3 outline-none bg-transparent text-[15px] text-white placeholder:text-gray-400 border-none"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            />
            <button
              aria-label="Send"
              className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-600 hover:bg-red-700 transition"
              onClick={() => send()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

