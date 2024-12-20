"use client"; // Nếu bạn muốn sử dụng hook client

import { useParams } from "next/navigation"; // Thay useRouter bằng useParams
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatInterface } from "@/components/ui/chat-interface";

export default function ChatPage() {
  const params = useParams(); // Lấy modelId từ URL
  const modelId = params?.modelId; // Lấy ID model
  const [model, setModel] = useState<any>(null); // Lưu thông tin của model
  const [loading, setLoading] = useState<boolean>(true); // Biến kiểm tra trạng thái loading
  const [error, setError] = useState<string | null>(null); // Biến lưu trữ thông báo lỗi

  useEffect(() => {
    if (modelId) {
      setLoading(true); // Đánh dấu bắt đầu loading
      setError(null); // Reset lỗi trước khi bắt đầu gọi API
      axios
        .get(`${process.env.HTTP_URL}/api/models/get/${modelId}`)
        .then((response) => {
          setModel(response.data); // Lưu thông tin model
        })
        .catch((error) => {
          setError("Error loading model. Please try again later.");
          console.error("Error fetching model:", error);
        })
        .finally(() => {
          setLoading(false); // Kết thúc loading
        });
    } else {
      setError("Model ID not found.");
      setLoading(false); // Kết thúc loading nếu không có modelId
    }
  }, [modelId]);

  // Hiển thị khi đang loading hoặc lỗi
  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <span className="text-gray-500">Loading model...</span>
      </div>
    );
  }

  // Hiển thị khi có lỗi
  if (error) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Hiển thị giao diện Chat của model */}
      <ChatInterface selectedModel={model} />
    </div>
  );
}
