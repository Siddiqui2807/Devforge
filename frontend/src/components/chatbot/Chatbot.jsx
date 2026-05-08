import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { sendChatbotMessage } from "../../services/chatbotService";

const buildMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  role,
  content,
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    buildMessage(
      "bot",
      "Hello. I am your DevForge assistant. Ask me about roadmap planning, project ideas, or debugging."
    ),
  ]);

  const handleSend = async (message) => {
    const userMessage = buildMessage("user", message);
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const data = await sendChatbotMessage(message);
      const reply = String(data?.reply || "").trim() || "Something went wrong. Try again.";
      setMessages((prev) => [...prev, buildMessage("bot", reply)]);
    } catch (error) {
      setMessages((prev) => [...prev, buildMessage("bot", "Something went wrong. Try again.")]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSend={handleSend}
      />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full border border-blue-400/40 bg-slate-950/95 px-4 text-sm font-semibold text-slate-100 shadow-[0_10px_28px_rgba(30,64,175,0.4)] transition hover:border-blue-300/60 hover:shadow-[0_12px_30px_rgba(59,130,246,0.45)] sm:bottom-6 sm:right-6"
        aria-label="Open DevForge Assistant"
      >
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
        Assistant
      </button>
    </>
  );
};

export default Chatbot;

