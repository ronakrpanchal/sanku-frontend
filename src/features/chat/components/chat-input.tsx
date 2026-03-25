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
      <div className="rounded-2xl overflow-hidden transition-all duration-300 border bg-gray-500/10">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask anything"
          className="w-full bg-transparent border-0 min-h-14 max-h-[300px] px-5 py-4 text-white focus:outline-none placeholder:text-gray-500 resize-none"
          rows={1}
        />

        {/* Bottom action bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800/50">
          {/* Left side buttons */}
          <div className="flex items-center space-x-3">
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-400 rounded-full hover:bg-white/5 transition-colors">
              <Search size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-400 rounded-full hover:bg-white/5 transition-colors">
              <Lightbulb size={18} />
            </button>
          </div>
          {/* Right side send button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || disabled}
            className={`px-5 h-10 flex items-center justify-center rounded-full text-white duration-200 ${
              message.trim() && !disabled
                ? "bg-indigo-600 shadow-md"
                : "bg-transparent border border-gray-700 text-gray-500"
            }`}
          >
            <SendHorizontal size={18} className="mr-2" />
            <span className="text-sm font-medium">
              {disabled ? "Sending..." : "Send"}
            </span>
          </button>
        </div>
      </div>
      <div className="text-xs text-center mt-2 text-gray-500">
        Sanku is designed to help you achieve your daily goals
      </div>
    </div>
  );
}
