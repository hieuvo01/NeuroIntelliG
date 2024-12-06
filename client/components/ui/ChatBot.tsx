/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Avatar from "antd/es/avatar/avatar";
import {
  Heart,
  ImageIcon,
  MoreHorizontal,
  Phone,
  Plus,
  SmilePlus,
  Sticker,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Input from "antd/es/input";
import useSpeechToText from "@/hooks/voice-to-text";

const messageStyles = cn(
  "text-white rounded-2xl py-2 px-4  max-w-[80%] ",
  "scrollbar-track-purple-800 bg-gradient-to-r from-blue-500 to-cyan-400  "
);

// Thêm các sticker vào mảng
const stickers = [
  "https://cdn-icons-png.flaticon.com/128/6028/6028757.png",
  "https://cdn-icons-png.flaticon.com/512/8598/8598377.png",
  "https://cdn-icons-png.flaticon.com/256/4105/4105448.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193261.png",
  "https://cdn-icons-png.flaticon.com/256/4193/4193281.png",
  "https://cdn-icons-png.flaticon.com/256/6727/6727043.png",
  "https://cdn-icons-png.flaticon.com/256/5928/5928219.png",
  "https://www.clipartmax.com/png/full/39-398438_stickers-de-facebook-pusheen-super-stationery-set.png",
  "https://www.clipartmax.com/png/full/236-2362066_stickers-de-facebook-pusheen.png",
  // Thêm các sticker khác
];

const HomePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null); //theo doi tin nhan ma bot dang doc
  //tai tin nhan tu localStorage
  const [chat, setChat] = useState<{ user: string; bot: string }[]>(() =>
    JSON.parse(localStorage.getItem("chatHistory") || "[]")
  );
  const [showStickerPicker, setShowStickerPicker] = useState(false); // Dùng để điều khiển việc hiển thị bộ sticker

  // Lắng nghe giọng nói
  const { isListening, startListening, stopListening, transcript } =
    useSpeechToText({ continues: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    // Chỉ cập nhật message sau khi ghi âm xong
    stopListening();
    useSpeechToText.transcriptCallback((updatedTranscript: string | any[]) => {
      setMessage(
        (prev) =>
          prev +
          (updatedTranscript.length
            ? (prev.length ? " " : "") + updatedTranscript
            : "")
      );
    });
    stopListening();
    handleSendMessage();
  };

  //DANG BAO TRI (IMAGE ANALYZING)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return alert("Please upload an image!");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `${process.env.HTTP_URL}/api/feeds/analyze-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.text) {
        setResult(data.text); // Set the result received from the API
      } else {
        alert("No analysis result received.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze the image.");
    } finally {
      setLoading(false);
    }
  };

  //  xu ly bot doc va dung
  const handleBotSpeak = (index: number, text: string) => {
    if (speakingIndex === index) {
      // Nếu đang đọc, thì dừng lại
      speechSynthesis.cancel();
      setSpeakingIndex(null);
    } else {
      // Nếu chưa đọc, thì bắt đầu đọc
      speechSynthesis.cancel(); // Dừng bất kỳ giọng nói nào đang chạy
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Ngôn ngữ, có thể chỉnh thành "vi-VN" cho tiếng Việt
      utterance.onend = () => setSpeakingIndex(null); // Dừng đọc, cập nhật trạng thái
      setSpeakingIndex(index); // Đánh dấu tin nhắn đang được đọc
      speechSynthesis.speak(utterance);
    }
  };

  const handleStickerClick = (sticker: string) => {
    // Chỉ thêm sticker vào phần chat, không trả lời bot
    const newChat = [...chat, { user: { imgSrc: sticker }, bot: "" }];
    setChat(newChat); // Cập nhật mảng chat
    setShowStickerPicker(false); // Ẩn bộ sticker sau khi chọn
  };
  const updateMessageFromTranscript = () => {
    if (transcript) {
      setMessage(
        (prevMessage) => prevMessage + (prevMessage ? " " : "") + transcript
      );
    }
  };

  //luu vao localstora moi lan cap nhat
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    setMessage(
      (prev) =>
        prev + (transcript.length ? (prev.length ? " " : "") + transcript : "")
    );
  }, [transcript]);

  //xoa chat o localstorage
  const clearChatHistory = () => {
    setChat([]);
    localStorage.removeItem("chatHistory");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if (!message && !image) return;

    if (image) {
      setChat([...chat, { user: "Image Sent", bot: "" }]); // Chỉ hiển thị tin nhắn của user
      setImage(null); // Xóa ảnh sau khi gửi
      return;
    }

    const newChat = [...chat, { user: message, bot: "" }];
    setChat(newChat);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.HTTP_URL}/api/feeds/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();
      const botReply = data.reply || "🩵";
      setChat([...newChat.slice(0, -1), { user: message, bot: botReply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      className="flex flex-col mr-9 min-w-[485px] max-w-[485px] max-h-[450px] min-h-[450px] mx-auto"
      //   style={{
      //     backgroundImage:
      //       "url(https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg)",
      //     backgroundSize: "300%", // Added background-size: cover
      //     backgroundPosition: "center", // Optional: Center the image
      //     height: "400px", // Add a defined height for the container
      //   }}
    >
      <div
        style={{
          backgroundImage:
            "url(https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "300%",
          backgroundPosition: "center",
        }}
        className="bg-transparent p-4 min-h-96"
      >
        <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
          {chat.map((entry, index) => (
            <div key={index} className="p-4 space-y-4">
              {/* Tin nhắn của user */}
              <div className="flex flex-col items-end gap-1 mb-2">
                <span className="text-sm text-gray-400">12:00</span>
                {/* Kiểm tra nếu user là một sticker (đối tượng với imgSrc) */}
                {typeof entry.user === "string" ? (
                  <div className="bg-[#0084FF] bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl px-4 py-2 max-w-[80%]">
                    <p className="whitespace-pre-wrap break-words">
                      {entry.user}
                    </p>
                  </div>
                ) : (
                  <img
                    src={entry.user.imgSrc}
                    alt="Sticker"
                    className="w-40 h-40"
                  />
                )}
              </div>

              {/* Tin nhắn của bot */}
              <div className="flex h-auto flex-wrap gap-2">
                <div className="flex justify-start mb-5">
                  <div className={messageStyles}>
                    <p className="whitespace-pre-wrap break-words">
                      {entry.bot}
                      {/* nút loa để bot nói */}
                    </p>
                    <button
                      onClick={() => handleBotSpeak(index, entry.bot)}
                      className="ml-2 text-black w-8  font-bold  hover:text-blue-700"
                    >
                      {speakingIndex === index ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className=" pb-1 rounded-b bg-blue-600 overflow-hidden border-t-2 border-gray-800">
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="text-white">
            <label
              htmlFor="file-upload"
              style={{ cursor: "pointer" }}
              className="flex items-center"
            >
              <ImageIcon className="h-5 w-5" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Ẩn input file
            />
          </Button> */}
          <button
            onClick={clearChatHistory}
            className=" text-white px-4 hover:opacity-45 py-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          {/* Input Area */}
          <div className="pb-1 rounded-b bg-blue-600 border-t-2 border-gray-800">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setShowStickerPicker(!showStickerPicker)}
              >
                <Sticker className="h-5 w-5" />
              </Button>

              {/* Hiển thị bộ sticker nếu showStickerPicker là true */}
              {showStickerPicker && (
                <div className="absolute h-40 gap-2 grid grid-cols-4 overflow-y-auto bottom-16 left-10 bg-white p-2 border rounded-lg shadow-md">
                  {stickers.map((sticker, index) => (
                    <img
                      key={index}
                      src={sticker}
                      alt={`Sticker ${index + 1}`}
                      className="w-16 h-auto cursor-pointer p-1"
                      onClick={() => handleStickerClick(sticker)}
                    />
                  ))}
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={startStopListening}
              >
                {isListening ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                )}
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Aa"
                className="flex-1 w-60 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
