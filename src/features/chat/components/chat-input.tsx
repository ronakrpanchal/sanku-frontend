"use client";
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Search, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  className?: string;
  onSend?: (message: string) => Promise<void> | void;
  disabled?: boolean;
}

export default function ChatInput({
  className,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) {
      return;
    }

    await onSend?.(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("left-0 right-0 mx-auto w-full max-w-4xl", className)}>
      <div className="overflow-hidden rounded-2xl border bg-gray-500/10 transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask anything"
          className="min-h-12 max-h-[240px] w-full resize-none border-0 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none md:min-h-14 md:max-h-[300px] md:px-5 md:py-4 md:text-base"
          rows={1}
        />

        {/* Bottom action bar */}
        <div className="flex items-center justify-between border-t border-gray-800/50 px-3 py-2.5 md:px-5 md:py-3">
          {/* Left side buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-indigo-400 md:h-9 md:w-9">
              <Search size={18} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/5 hover:text-indigo-400 md:h-9 md:w-9">
              <Lightbulb size={18} />
            </button>
          </div>
          {/* Right side send button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || disabled}
            className={`flex h-9 items-center justify-center rounded-full px-3 text-white duration-200 md:h-10 md:px-5 ${
              message.trim() && !disabled
                ? "bg-indigo-600 shadow-md"
                : "bg-transparent border border-gray-700 text-gray-500"
            }`}
          >
            <SendHorizontal size={16} className="mr-1.5 md:mr-2" />
            <span className="text-xs font-medium md:text-sm">
              {disabled ? "Sending..." : "Send"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-2 text-center text-[11px] text-gray-500 md:text-xs">
        Sanku is designed to help you achieve your daily goals
      </div>
    </div>
  );
}
