import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlayCircle, MoreVertical, Star } from "lucide-react";
// import apiClient from "@/app/(app)/api/apiClient";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
    sender: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex items-start gap-2 ${
        isAssistant ? "" : "flex-row-reverse"
      }`}
    >
      {/* Nội dung tin nhắn */}
      <div
        className={`flex flex-col max-w-xs ${
          isAssistant ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`rounded-lg p-2 text-sm ${
            isAssistant ? "bg-gray-800 text-gray-100" : "bg-gray-600 text-white"
          }`}
        >
          {message.content}
        </div>

        {isAssistant && (
          <div className="flex items-center gap-1 mt-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <PlayCircle className="h-4 w-4" />
            </Button>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                >
                  <Star className="h-4 w-4" />
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; sender: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Append user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, sender: "You" },
    ]);

    try {
      // Gửi yêu cầu tới backend
      const { data } = await apiClient.post("/chatbot", { message: input });

      // Append chatbot reply
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          sender: "GPT",
        },
      ]);
    } catch (error) {
      console.error("Error calling chatbot API:", error);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="chat-input flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}
