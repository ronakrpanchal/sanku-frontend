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
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-grow overflow-y-auto py-4">
        <div className="max-w-3xl mx-auto space-y-8 px-3">
          {messages.length === 0 ? (
            <div className="text-center mb-4 pt-12">
              <div className="flex gap-2 justify-center">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Welcome Sankalpa
                </h2>
                <span className="text-5xl">👋</span>
              </div>
              <h2 className="text-2xl mt-2">What can I help you with?</h2>
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

      <div className="mt-auto">
        <ChatInput className="max-w-3xl" onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}
