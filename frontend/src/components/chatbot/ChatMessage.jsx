const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 shadow-sm",
          isUser
            ? "border border-blue-400/30 bg-blue-500/20 text-slate-100"
            : "border border-slate-700 bg-slate-900/90 text-slate-200",
        ].join(" ")}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;

