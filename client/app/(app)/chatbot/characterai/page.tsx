"use client";
import { Sidebar } from "@/components/ui/sidebar";
import CharacterAI from "@/components/ui/characterai";

/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface ImageOfTheDayProps {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

export default function AIChatMainPage({}: ImageOfTheDayProps) {
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectModel = (model: any) => {
    setSelectedModel(model); // Lưu model đã chọn
    console.log("Model selected:", model); // Kiểm tra model có được truyền đúng không
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar onSelectModel={handleSelectModel} />
      <main className="flex-1 overflow-auto">
        <CharacterAI />
      </main>
    </div>
  );
}
