import React from "react";
import ChatInput from "@/features/chat/components/chat-input";
import MessageBubble from "@/features/chat/components/message-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-grow overflow-y-auto py-4">
        <div className="max-w-3xl mx-auto space-y-20">
          <MessageBubble isUser={false} />
        </div>
      </ScrollArea>
      <div className="mt-auto">
        <ChatInput className="max-w-3xl" />
      </div>
    </div>
  );
}
