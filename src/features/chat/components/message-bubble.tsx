"use client";

import React from "react";
import Markdown from "react-markdown";
import { Sparkles } from "lucide-react";
import remarkGfm from "remark-gfm";

type Props = {
  role?: "user" | "ai";
  content?: string;
  isLoading?: boolean;
  isUser?: boolean;
};

export default function MessageBubble({
  role,
  content,
  isLoading = false,
  isUser,
}: Props) {
  const resolvedRole = role ?? (isUser ? "user" : "ai");
  const safeContent = content ?? "";

  return (
    <div className="flex flex-col space-y-6 text-base font-medium md:space-y-10 md:text-lg">
      {resolvedRole === "user" ? (
        <div className="self-end rounded-xl border border-gray-700/40 bg-gray-400/10 p-3 text-sm shadow-md sm:max-w-lg md:text-base">
          {safeContent}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Sparkles
              size={20}
              className={`text-pink-400 ${isLoading ? "animate-pulse" : ""}`}
            />
            <p className="font-bold">
              {isLoading ? "Sanku is thinking" : "Sanku"}
            </p>
            {isLoading && (
              <div className="inline-flex ml-1 items-center">
                <span className="h-2 w-2 rounded-full bg-pink-400 mx-0.5 animate-pulse"></span>
                <span className="h-2 w-2 rounded-full bg-pink-400 mx-0.5 animate-pulse delay-300"></span>
                <span className="h-2 w-2 rounded-full bg-pink-400 mx-0.5 animate-pulse delay-700"></span>
              </div>
            )}
          </div>
          <div className="prose prose-sm prose-slate dark:prose-invert md:prose-lg prose-li:marker:text-pink-400 prose-p:font-semibold">
            <Markdown remarkPlugins={[remarkGfm]}>{safeContent}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
