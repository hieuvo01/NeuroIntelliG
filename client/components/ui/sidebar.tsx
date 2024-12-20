/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AIModel = {
  _id: string;
  name: string;
  avatar?: string;
};

export function Sidebar({
  onSelectModel,
}: {
  onSelectModel: (model: AIModel) => void;
}) {
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState<string | null>(null); // Quản lý lỗi
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.HTTP_URL}/api/models/get`)
      .then((response) => setAiModels(response.data))
      .catch((err) => {
        console.error("Error fetching AI models:", err);
        setError("Failed to load AI models. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleModelSelect = (model: AIModel) => {
    if (!model) return;
    onSelectModel(model); // Gọi hàm callback từ parent
    router.push(`/chatbot/characterai/chat/${model._id}`);
  };

  return (
    <div className="w-[250px] border-r bg-black/40">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold">character.ai</h1>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-sm text-gray-500">Loading models...</span>
          </div>
        ) : error ? (
          // Hiển thị lỗi nếu có
          <div className="flex justify-center items-center h-full">
            <span className="text-sm text-red-500">{error}</span>
          </div>
        ) : (
          // Render danh sách models
          <div className="space-y-4">
            <div className="text-sm font-medium">Chats</div>
            <div className="space-y-1">
              {aiModels.map((model) => (
                <div
                  key={model._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => handleModelSelect(model)} // Gọi hàm xử lý riêng
                >
                  <img
                    src={model.avatar || "/placeholder-avatar.png"} // Avatar fallback
                    alt={model.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm font-medium">{model.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
