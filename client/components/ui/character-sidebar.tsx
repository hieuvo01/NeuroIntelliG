import {
  MessageSquarePlus,
  Mic2,
  Pin,
  Settings,
  ThumbsUp,
  User,
} from "lucide-react";
import { Button } from "./button";

export function CharacterSidebar({ model }: { model: Model }) {
  return (
    <div className="w-[300px] border-l border-gray-800 p-4 flex flex-col">
      <div className="text-center mb-6">
        <img
          src={model.avatar || "/placeholder.svg?height=80&width=80"} // Sử dụng avatar từ model
          alt={model.name}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">{model.name}</h2>{" "}
        {/* Hiển thị tên model */}
        <p className="text-sm text-muted-foreground">By {model.name}</p>{" "}
        {/* Thông tin model */}
        <p className="text-sm text-muted-foreground">13.8m chats</p>{" "}
        {/* Placeholder cho thông tin khác */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            3.6k
          </Button>
          <Button variant="ghost" size="sm">
            <Pin className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Button variant="secondary" className="w-full justify-start gap-2">
          <MessageSquarePlus className="h-4 w-4" />
          New chat
        </Button>
        <Button variant="ghost" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Mic2 className="h-4 w-4" />
            Voice
          </div>
          <span className="text-sm text-muted-foreground">Default</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Customize
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Pin className="h-4 w-4" />
          Pinned
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <User className="h-4 w-4" />
          Persona
        </Button>
      </div>

      <p className="mt-auto text-sm text-muted-foreground">
        I'm {model.name}, I am a chatbot here to assist you!
      </p>
    </div>
  );
}
