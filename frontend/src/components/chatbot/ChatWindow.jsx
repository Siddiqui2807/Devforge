import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-center gap-1 rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400"
          style={{ animationDelay: `${dot * 120}ms` }}
        />
      ))}
    </div>
  </div>
);

const ChatWindow = ({ isOpen, onClose, messages, isTyping, onSend }) => {
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isOpen, messages, isTyping]);

  return (
    <section
      className={[
        "pointer-events-auto fixed bottom-20 right-4 z-40 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl transition-all duration-200 sm:right-6",
        isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">DevForge Assistant</p>
          <p className="text-xs text-slate-400">Roadmaps, projects, and debugging guidance</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs font-semibold text-slate-200 hover:border-slate-500"
        >
          Close
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-slate-950/80 p-3">
        {messages.map((message) => (
          <ChatMessage key={message.id} role={message.role} content={message.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={endRef} />
      </div>

      <ChatInput onSend={onSend} disabled={isTyping} />
    </section>
  );
};

export default ChatWindow;

