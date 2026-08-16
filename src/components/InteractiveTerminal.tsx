import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Send, Terminal, MessageSquare, ShieldCheck, CheckCircle } from 'lucide-react';

interface InteractiveTerminalProps {
  projectNumber: string;
  isActive?: boolean;
}

interface LogLine {
  text: string;
  type: 'cmd' | 'info' | 'success' | 'warn' | 'file';
  delay: number;
}

const AGENT_CODER_LOGS: LogLine[] = [
  { text: 'kaviyarasu@portfolio:~$ npx agentic-coding-ai --prompt "build tasks manager"', type: 'cmd', delay: 1000 },
  { text: '[1/4] Connecting to OpenRouter API (Claude 3.5 Sonnet)... Connected.', type: 'info', delay: 1200 },
  { text: '[2/4] Analyzing requirements: local state, drag & drop, localStorage cache...', type: 'info', delay: 1500 },
  { text: '  ▸ Creating files in workspace...', type: 'info', delay: 800 },
  { text: '  [NEW] src/components/TaskManager.tsx (238 lines code generated)', type: 'file', delay: 800 },
  { text: '  [NEW] src/components/TaskCard.tsx (120 lines code generated)', type: 'file', delay: 500 },
  { text: '  [NEW] src/components/ProgressBar.tsx (75 lines code generated)', type: 'file', delay: 400 },
  { text: '  [NEW] src/hooks/useTasks.ts (95 lines code generated)', type: 'file', delay: 500 },
  { text: '[3/4] Running compilation checks & ESLint linter...', type: 'info', delay: 1200 },
  { text: '  ✔ 0 errors, 0 warnings. Lint check complete.', type: 'success', delay: 800 },
  { text: '[4/4] Launching project local development server...', type: 'info', delay: 1000 },
  { text: '  > Vite v5.2.0 dev server listening at http://localhost:3000/', type: 'success', delay: 600 },
  { text: '✔ Success! React Task Manager application generated in 8.7s.', type: 'success', delay: 500 },
];

const AUTO_MAIL_LOGS: LogLine[] = [
  { text: 'kaviyarasu@portfolio:~$ python auto_mail_reply.py --mode production', type: 'cmd', delay: 1000 },
  { text: '[INFO] Initializing SQLite database (processed_mails.db)... OK.', type: 'info', delay: 1000 },
  { text: '[INFO] Connecting to secure IMAP server (imap.gmail.com:993)...', type: 'info', delay: 1200 },
  { text: '[INFO] Authentication successful. Listening for incoming messages...', type: 'success', delay: 800 },
  { text: '[INCOMING] Received new email from: HR@inaiyam.com', type: 'warn', delay: 1500 },
  { text: '  Subject: "Inquiry regarding ML Internship recruitment"', type: 'info', delay: 500 },
  { text: '[ANALYZING] Query match score: 94% (Fuzzy match threshold: 80%)', type: 'info', delay: 1000 },
  { text: '[LLM] Invoking LLM prompt builder to compile dynamic resume context...', type: 'info', delay: 1500 },
  { text: '[SMTP] Establishing TLS connection to smtp.gmail.com:465...', type: 'info', delay: 800 },
  { text: '[SMTP] Transmitting customized draft reply (ID: AI_REPLY_04)...', type: 'info', delay: 1000 },
  { text: '✔ Success! Auto-reply sent to HR@inaiyam.com. Logged in SQLite database.', type: 'success', delay: 600 },
  { text: '[INFO] Listener returning to idle state...', type: 'info', delay: 500 },
];

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const FARM_SAGE_PRESETS = [
  {
    question: 'Best crops for Palani monsoon?',
    answer: 'Based on your Palani soil data (sandy clay loam) and a high rainfall forecast, the best monsoon crops are:\n1. Monsoon Paddy (CR 1009)\n2. Groundnut (TMV 7)\n3. Coarse Grain Sorghum\n\nமாற்றுப்பயிர்: உளுந்து (Black gram) as a rotation option.',
  },
  {
    question: 'Soil check in Tamil (மண்வளம்)?',
    answer: 'மண் பரிசோதனை முடிவு:\nவகை: செம்மண் (Red Loam)\nPH அளவு: 6.8 (சரியானது)\nஅறிவுரை: நைட்ரஜன் குறைபாட்டை போக்க 45 நாட்களுக்கு ஒருமுறை யூரியாவுடன் வேப்பம் புண்ணாக்கு கலவை பயன்படுத்தவும்.',
  },
  {
    question: 'Pest attack preventive tips?',
    answer: 'General IPM preventive measures:\n- Spray Neem oil solution (3%) during evening hours.\n- Erect yellow sticky traps (5 per acre) to monitor aphids.\n- Avoid nitrogen overload which attracts stem borers.',
  },
];

const InteractiveTerminal = ({ projectNumber, isActive = true }: InteractiveTerminalProps) => {
  const isChat = projectNumber === '07';
  const logs = projectNumber === '06' ? AGENT_CODER_LOGS : AUTO_MAIL_LOGS;

  // Terminal States
  const [visibleLogs, setVisibleLogs] = useState<LogLine[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [isTypingCmd, setIsTypingCmd] = useState(false);
  const [typedCmdText, setTypedCmdText] = useState('');
  const [isRunning, setIsRunning] = useState(true);

  // Chat States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'வணக்கம்! I am Farm Sage. Click a query below to see what I can calculate for you!' },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatTimeoutRef = useRef<any>(null);

  // Scroll to bottom helper
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [visibleLogs, chatMessages, isTypingCmd, isBotTyping]);

  // Reset state when the card becomes inactive (e.g. user scrolls away)
  useEffect(() => {
    if (!isActive) {
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current);
      }
      setVisibleLogs([]);
      setLogIndex(0);
      setTypedCmdText('');
      setIsTypingCmd(false);
      setIsRunning(true);
      setChatMessages([
        { sender: 'bot', text: 'வணக்கம்! I am Farm Sage. Click a query below to see what I can calculate for you!' }
      ]);
      setIsBotTyping(false);
    }
    return () => {
      if (chatTimeoutRef.current) {
        clearTimeout(chatTimeoutRef.current);
      }
    };
  }, [isActive]);

  // Terminal Runner
  useEffect(() => {
    if (isChat || !isRunning || !isActive) return;

    if (logIndex >= logs.length) {
      setIsRunning(false);
      return;
    }

    const currentLine = logs[logIndex];

    if (currentLine.type === 'cmd') {
      setIsTypingCmd(true);
      setTypedCmdText('');
      
      let charIndex = 0;
      const cmdText = currentLine.text;
      let typingTimeout: any;
      
      const interval = setInterval(() => {
        if (charIndex < cmdText.length) {
          setTypedCmdText(prev => prev + cmdText[charIndex]);
          charIndex++;
        } else {
          clearInterval(interval);
          typingTimeout = setTimeout(() => {
            setIsTypingCmd(false);
            setVisibleLogs(prev => [...prev, currentLine]);
            setLogIndex(idx => idx + 1);
          }, 350);
        }
      }, 40);

      return () => {
        clearInterval(interval);
        if (typingTimeout) clearTimeout(typingTimeout);
      };
    } else {
      const timer = setTimeout(() => {
        setVisibleLogs(prev => [...prev, currentLine]);
        setLogIndex(idx => idx + 1);
      }, currentLine.delay);

      return () => clearTimeout(timer);
    }
  }, [logIndex, isRunning, isChat]);

  const restartTerminal = () => {
    setVisibleLogs([]);
    setLogIndex(0);
    setTypedCmdText('');
    setIsTypingCmd(false);
    setIsRunning(true);
  };

  // Chat Runner
  const handleChatQuestion = (question: string, answer: string) => {
    if (isBotTyping) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: question }]);
    setIsBotTyping(true);

    // Simulate AI response delay
    chatTimeoutRef.current = setTimeout(() => {
      setIsBotTyping(false);
      setChatMessages(prev => [...prev, { sender: 'bot', text: answer }]);
    }, 1500);
  };

  const resetChat = () => {
    setChatMessages([
      { sender: 'bot', text: 'வணக்கம்! I am Farm Sage. Click a query below to see what I can calculate for you!' },
    ]);
    setIsBotTyping(false);
  };

  // RENDER FARM SAGE CHAT INTERFACE
  if (isChat) {
    return (
      <div className="w-full flex flex-col h-[320px] sm:h-[380px] lg:h-[430px] rounded-3xl border border-white/10 bg-[#121214] overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-[#19191c] px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-300">
              Farm Sage Chat Assistant
            </span>
          </div>
          <button 
            onClick={resetChat} 
            className="p-1 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
            title="Reset Chat"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Messages Body */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin text-left">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`rounded-2xl px-3.5 py-2.5 text-[11px] sm:text-xs leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-black font-semibold rounded-tr-none'
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isBotTyping && (
            <div className="self-start bg-zinc-800/80 rounded-2xl rounded-tl-none border border-white/5 px-4 py-3 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 bg-[#161619] border-t border-white/5 flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-widest font-semibold text-zinc-500 self-start">
            Ask Farm Sage:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {FARM_SAGE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleChatQuestion(preset.question, preset.answer)}
                disabled={isBotTyping}
                className="px-2.5 py-1.5 rounded-full border border-white/5 bg-[#1f1f23] text-[9px] sm:text-[10px] text-zinc-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200 active:scale-95 disabled:opacity-50"
              >
                {preset.question}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // RENDER CODE TERMINAL INTERFACE
  return (
    <div className="w-full flex flex-col h-[280px] sm:h-[340px] lg:h-[400px] rounded-3xl border border-white/10 bg-[#0B0B0C] overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-[#131315] px-4 py-3 border-b border-white/5">
        {/* Mac OS Window Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
          <span className="ml-3 font-mono text-[9px] sm:text-[10px] text-zinc-500 tracking-wide select-none">
            {projectNumber === '06' ? 'agentic_coding_ai.sh' : 'auto_reply_listener.py'}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {!isRunning && logIndex < logs.length ? (
            <button
              onClick={() => setIsRunning(true)}
              className="p-1 text-zinc-400 hover:text-emerald-400 transition-colors"
              title="Resume"
            >
              <Play size={12} />
            </button>
          ) : null}
          <button
            onClick={restartTerminal}
            className="p-1 text-zinc-400 hover:text-cyan-400 transition-colors"
            title="Restart Terminal"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Terminal Content Screen */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-300 flex flex-col items-start gap-1 scrollbar-thin text-left">
        {/* Render visible logs */}
        {visibleLogs.map((line, idx) => {
          let colorClass = 'text-zinc-300';
          if (line.type === 'cmd') colorClass = 'text-cyan-400 font-bold';
          if (line.type === 'success') colorClass = 'text-emerald-400';
          if (line.type === 'warn') colorClass = 'text-amber-400';
          if (line.type === 'file') colorClass = 'text-zinc-500 italic';

          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
              {line.text}
            </div>
          );
        })}

        {/* Command typing simulation */}
        {isTypingCmd && (
          <div className="text-cyan-400 font-bold">
            {typedCmdText}
            <span className="w-1.5 h-3 bg-cyan-400 inline-block animate-pulse ml-0.5" />
          </div>
        )}

        {/* Bottom blinking cursor when completed */}
        {!isTypingCmd && !isRunning && logIndex >= logs.length && (
          <div className="text-zinc-500 flex items-center gap-1 mt-1">
            <span>kaviyarasu@portfolio:~$ </span>
            <span className="w-1.5 h-3 bg-zinc-500 inline-block animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal;
