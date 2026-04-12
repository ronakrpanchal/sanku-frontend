"use client";

import React, { useMemo, useState } from "react";
import ChatInput from "@/features/chat/components/chat-input";
import MessageBubble from "@/features/chat/components/message-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendChatMessage } from "@/lib/api";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const chatId = useMemo(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `chat-${Date.now()}`;
  }, []);

  const userId = "web-user";

  const handleSend = async (message: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const aiResponse = await sendChatMessage({
        userId,
        chatId,
        query: message,
      });

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        role: "ai",
        content:
          error instanceof Error
            ? `Error: ${error.message}`
            : "Error: Failed to connect with backend",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col md:min-h-dvh">
      <ScrollArea className="flex-1 overflow-y-auto px-2 pb-4 pt-3 md:px-0 md:pt-4">
        <div className="mx-auto w-full max-w-3xl space-y-6 px-2 pb-3 md:space-y-8 md:px-3">
          {messages.length === 0 ? (
            <div className="mb-3 pt-8 text-center md:mb-4 md:pt-12">
              <div className="flex items-center justify-center gap-2">
                <h2 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                  Welcome Sankalpa
                </h2>
                <span className="text-3xl sm:text-4xl md:text-5xl">👋</span>
              </div>
              <h2 className="mt-2 text-lg sm:text-xl md:text-2xl">What can I help you with?</h2>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))
          )}

          {isSending && <MessageBubble role="ai" content="" isLoading />}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 z-30 mt-auto border-t border-gray-800/40 bg-[#161618]/95 px-2 pb-4 pt-3 backdrop-blur-sm md:border-none md:bg-transparent md:px-3 md:pb-4 md:pt-2">
        <ChatInput className="max-w-3xl" onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}
