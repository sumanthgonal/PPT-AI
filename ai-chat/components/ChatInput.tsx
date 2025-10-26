"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white min-h-[60px] max-h-[200px]"
          disabled={disabled}
          rows={2}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
