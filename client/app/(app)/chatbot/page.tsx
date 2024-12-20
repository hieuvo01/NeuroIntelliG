"use client";
import { useState } from "react";
import { X } from "lucide-react";
import ChatBot from "@/components/ui/ChatBot";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-5 z-30 right-5 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="z-30 font-bold fixed right-5 mt-7 bg-white w-[485px] h-[485px] rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex bg-red-400 border-b border-gray-800 justify-between items-center  text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span
                className="text-purple-700 font-mono text-"
                style={{
                  textShadow:
                    "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                }}
              >
                AI Assistant
              </span>
              <span className="text-white">Online</span>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 mr-2 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>

              <button onClick={toggleChat}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <ChatBot />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
