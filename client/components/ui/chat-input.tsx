"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Phone } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        className="bg-gray-800 border-0"
        placeholder="Message Minecraft Steve..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message) {
            onSend(message);
            setMessage("");
          }
        }}
      />
      <Button variant="ghost" size="icon">
        <Phone className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (message) {
            onSend(message);
            setMessage("");
          }
        }}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
