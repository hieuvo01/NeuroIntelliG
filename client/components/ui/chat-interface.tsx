/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { CharacterSidebar } from "./character-sidebar";
import { Sidebar } from "./sidebar";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Message } from "postcss";

const saveMessageToDatabase = async (
  modelId: string,
  role: string,
  content: string,
  sender: string
) => {
  const response = await fetch(
    `${process.env.HTTP_URL}/api/messages/saveMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ modelId, role, content, sender }),
    }
  );

  const data = await response.json();
  if (response.ok) {
    console.log("Message saved:", data);
  } else {
    console.error("Failed to save message:", data);
  }
};

const loadMessagesFromDatabase = async (modelId: string) => {
  const response = await fetch(
    `${process.env.HTTP_URL}/api/messages/getMessages/${modelId}`
  );
  const data = await response.json();
  return data;
};

const loadModelIntroMessage = async (modelId: string) => {
  const response = await fetch(
    `${process.env.HTTP_URL}/api/models/getIntroMessage/${modelId}`
  );
  const data = await response.json();
  return data.introMessage || "Hello, I am your assistant!";
};

export function ChatInterface({
  selectedModel, // Prop name remains selectedModel
}: {
  selectedModel?: Model;
}) {
  const [messagesByModel, setMessagesByModel] = useState<
    Record<string, Message[]>
  >({});
  const [currentModel, setCurrentModel] = useState<Model | null>(
    selectedModel || null
  );
  const [introMessage, setIntroMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasIntroMessageDisplayed, setHasIntroMessageDisplayed] =
    useState(false);

  const handleSelectModel = useCallback(
    (model: Model) => {
      if (!model) {
        console.warn("No model selected");
        return;
      }
      if (!messagesByModel[model._id]) {
        setMessagesByModel((prev) => ({ ...prev, [model._id]: [] }));
      }
    },
    [messagesByModel]
  );

  // Load intro message when model is selected
  useEffect(() => {
    if (selectedModel) {
      loadModelIntroMessage(selectedModel._id).then((introMessage) => {
        setIntroMessage(introMessage); // Set the intro message in state
      });
    }
  }, [selectedModel]);

  // Load tin nhắn từ MongoDB khi chọn model
  useEffect(() => {
    if (selectedModel) {
      loadMessagesFromDatabase(selectedModel._id).then((messages) => {
        setMessagesByModel((prev) => ({
          ...prev,
          [selectedModel._id]: messages,
        }));
      });
    }
  }, [selectedModel]);

  const loadModelIntroMessage = async (modelId: string) => {
    const response = await fetch(
      `${process.env.HTTP_URL}/api/models/getIntroMessage/${modelId}`
    );
    const data = await response.json();
    return data.introMessage || "Hello, I am your assistant!"; // Trả về introMessage mặc định nếu không có
  };

  // Hàm xử lý khi gửi tin nhắn
  const handleSendMessage = async (content: string) => {
    if (!currentModel) {
      console.warn("Please select a model first.");
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      sender: "You",
      avatar: "/path/to/user-avatar.png",
      type: "",
    };

    // Cập nhật tin nhắn người dùng
    setMessagesByModel((prev) => ({
      ...prev,
      [currentModel._id]: [...(prev[currentModel._id] || []), newMessage],
    }));

    setIsLoading(true);
    setError(null); // Reset lỗi trước khi gửi
    // Save tin nhắn vào MongoDB
    await saveMessageToDatabase(selectedModel._id, "user", content, "You");

    // If this is the first message, send the intro message first
    if (!hasIntroMessageDisplayed) {
      const assistantIntroMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: introMessage || "Hello, I am your assistant!",
        sender: currentModel?.name || "Assistant",
        avatar: currentModel?.avatar || "/placeholder.svg",
        type: "",
      };

      setMessagesByModel((prev) => ({
        ...prev,
        [currentModel._id]: [
          ...(prev[currentModel._id] || []),
          assistantIntroMessage, // Add intro message first
          newMessage, // Then add the user's message
        ],
      }));

      setHasIntroMessageDisplayed(true); // Mark intro message as displayed
    } else {
      // If intro message has already been displayed, just add the user's message
      setMessagesByModel((prev) => ({
        ...prev,
        [currentModel._id]: [...(prev[currentModel._id] || []), newMessage],
      }));
    }

    try {
      const response = await fetch(
        `${process.env.HTTP_URL}/api/feeds/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }

      const data = await response.json();

      if (data?.reply) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          sender: currentModel.name || "Assistant",
          avatar: currentModel.avatar || "/placeholder.svg",
          type: "",
        };

        // Cập nhật tin nhắn từ assistant
        setMessagesByModel((prev) => ({
          ...prev,
          [currentModel._id]: [
            ...(prev[currentModel._id] || []),
            assistantMessage,
          ],
        }));
        // Save tin nhắn của assistant vào MongoDB
        await saveMessageToDatabase(
          currentModel._id,
          "assistant",
          data.reply,
          currentModel.name || "Assistant"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentMessages = currentModel
    ? messagesByModel[currentModel._id] || []
    : [];

  return (
    <div className="w-full flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar onSelectModel={handleSelectModel} />
      {/* Chat */}
      <div className="flex flex-col w-full h-full">
        {selectedModel ? (
          <>
            {/* Display intro message once */}
            <div className="flex items-start gap-2 overflow-y-auto p-4">
              <div className="flex flex-col max-w-xs items-start">
                <p className="rounded-lg p-2 text-sm bg-gray-800 text-gray-100">
                  {introMessage}
                </p>
              </div>
            </div>
            {/* Tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <ChatMessage
                  key={`${message.id}-${message.role}-${message.sender}`}
                  message={message}
                />
              ))}
              {isLoading && (
                <div className="flex justify-center items-center">
                  <span className="text-sm text-gray-500">AI is typing...</span>
                </div>
              )}
            </div>

            {/* Input Chat */}
            <div className="p-4 border-t border-gray-800">
              <ChatInput onSend={handleSendMessage} />
              <div className="text-sm text-gray-500 text-center mt-2">
                This is A.I. and not a real person. Treat everything it says as
                fiction.
              </div>
            </div>
          </>
        ) : (
          // UI khi chưa chọn model
          <div className="flex justify-center items-center h-full">
            <span className="text-lg text-gray-500">
              Please select a model to start chatting.
            </span>
          </div>
        )}
      </div>
      {selectedModel && <CharacterSidebar model={selectedModel} />}{" "}
      {/* Truyền model vào */}
      {error && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
