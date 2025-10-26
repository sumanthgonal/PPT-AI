import { Message } from "@/types";
import { formatDate } from "@/utils/helpers";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fadeIn`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold">
            {isUser ? "You" : "AI Assistant"}
          </span>
          <span className="text-xs opacity-60">
            {formatDate(new Date(message.timestamp))}
          </span>
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
