import React from "react";
import ChatInput from "@/features/chat/components/chat-input";
import { Sparkles } from "lucide-react";
import MessageBubble from "@/features/chat/components/message-bubble";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="max-w-4xl mx-auto flex h-full flex-col">
      <div className="flex-grow">
        {/* <Sparkles className="text-gray-300" size={20} /> */}
        <MessageBubble isUser={false} />
      </div>
      <ChatInput />
    </div>
  );
}
