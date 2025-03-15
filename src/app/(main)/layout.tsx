"use client";
import React, { useState } from "react";
import { Dumbbell, House, Trophy, PersonStanding } from "lucide-react";
import { FaBowlFood } from "react-icons/fa6";

type Props = { children: React.ReactNode };

const Links = [
  { name: "Overview", href: "/overview", icon: House },
  { name: "Workouts", href: "/workouts", icon: Dumbbell },
  { name: "Achievement", href: "/achievement", icon: Trophy },
  { name: "Food Log", href: "/food", icon: FaBowlFood },
  { name: "Profile", href: "/profile", icon: PersonStanding },
];

export default function Layout({ children }: Props) {
  const [activeLink, setActiveLink] = useState("/overview");

  return (
    <div className="flex h-screen">
      <aside className="h-screen flex flex-col w-64 backdrop-blur-md  bg-opacity-20 border-r border-gray-800/30">
        {/* Logo */}
        <div className="p-6">
          <h2 className="text-2xl font-bold items-center flex gap-2 text-white">
            <Dumbbell className="text-indigo-400" />
            <span>Gymbro</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            {Links.map((item) => (
              <div
                key={item.href}
                onClick={() => setActiveLink(item.href)}
                className={`flex items-center text-sm rounded-xl cursor-pointer py-3 px-4 font-medium transition-all duration-300 ${
                  activeLink === item.href
                    ? "bg-gradient-to-r from-indigo-600/40 to-indigo-500/20 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <item.icon
                  size={18}
                  className={`${
                    activeLink === item.href
                      ? "text-indigo-300"
                      : "text-gray-400"
                  }`}
                />
                <span className="ml-3">{item.name}</span>
                {activeLink === item.href && (
                  <div className="ml-auto w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-medium text-white">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-indigo-200/70">Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
