import { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    const cleaned = message.trim();
    if (!cleaned || disabled) {
      return;
    }

    onSend(cleaned);
    setMessage("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submitMessage();
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-slate-800 bg-slate-950/90 p-3">
      <div className="flex items-end gap-2">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask about roadmaps, projects, or debugging..."
          className="form-input min-h-[42px] resize-none py-2 text-sm"
          disabled={disabled}
        />
        <button type="submit" className="btn-primary h-[42px] px-3 text-sm" disabled={disabled}>
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;

