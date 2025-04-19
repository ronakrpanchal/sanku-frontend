import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CharacterOption = {
  name: string;
  avatar: string;
  description: string;
  color: string;
  glowColor: string;
  textColor: string;
  personality: string;
};

export default function CharacterSelector() {
  const [currentCharacter, setCurrentCharacter] = useState<CharacterOption>(
    characterOptions[0]
  );

  const handleCharacterChange = (character: CharacterOption) => {
    setCurrentCharacter(character);
    // You can add functionality to change AI character based on selection
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`w-9 h-9 flex items-center justify-center rounded-full 
            ${currentCharacter.color} hover:opacity-90 transition-all duration-300
            shadow-lg ${currentCharacter.glowColor} border border-zinc-700`}
            style={{
              boxShadow: `0 0 10px ${currentCharacter.textColor}40`,
            }}
          >
            <span className={`text-lg font-bold ${currentCharacter.textColor}`}>
              {currentCharacter.avatar}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-zinc-900/95 border border-zinc-800 shadow-xl rounded-lg backdrop-blur-sm">
          <DropdownMenuLabel className="text-center font-bold text-white py-2">
            Choose Character
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-700" />
          <div>
            {characterOptions.map((character) => (
              <DropdownMenuItem
                key={character.name}
                onClick={() => handleCharacterChange(character)}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-zinc-800/70 rounded-md mx-1 my-1 transition-all duration-200 ${
                  currentCharacter.name === character.name
                    ? `bg-zinc-800/80 border border-${
                        character.color.split("-")[1]
                      }-600/40`
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${character.color} shadow-md`}
                  style={{
                    boxShadow: `0 0 8px ${character.textColor}30`,
                  }}
                >
                  <span
                    className={`text-base font-bold ${character.textColor}`}
                  >
                    {character.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{character.name}</div>
                  <div className="text-xs text-zinc-400">
                    {character.description}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Three distinct characters with improved visual styling
const characterOptions: CharacterOption[] = [
  {
    name: "Sanku",
    avatar: "S",
    description: "Your friendly, supportive gym companion",
    color: "bg-indigo-600",
    glowColor: "shadow-indigo-500/30",
    textColor: "text-indigo-100",
    personality: "Encouraging, positive, and helpful",
  },
  {
    name: "Brutus",
    avatar: "B",
    description: "No-nonsense trainer who tells it like it is",
    color: "bg-rose-600",
    glowColor: "shadow-rose-500/30",
    textColor: "text-rose-100",
    personality: "Direct, tough, and results-driven",
  },
  {
    name: "Zen",
    avatar: "Z",
    description: "Mindful wellness expert with holistic approach",
    color: "bg-cyan-600",
    glowColor: "shadow-cyan-500/30",
    textColor: "text-cyan-100",
    personality: "Calm, thoughtful, and balanced",
  },
];
