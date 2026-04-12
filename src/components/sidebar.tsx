"use client";

import React, { useState } from "react";
import { Dumbbell, Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = Record<string, never>;

const Links = [
  { name: "Chat", href: "/chat", icon: MessageCircle, optional: "/c" },
];

export default function SideBar({}: Props) {
  const activeLink = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActiveRoute = (href: string, optional?: string) =>
    activeLink === href || activeLink.startsWith(optional || "/x");

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-gray-800/50 bg-black/40 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700/70 text-white"
          >
            <Menu size={18} />
          </button>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Dumbbell className="text-indigo-400" size={20} />
            <span>Sanku</span>
          </h2>
        </div>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] md:hidden"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : -320 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-800/30 bg-[#121215] p-4 md:hidden"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Dumbbell className="text-indigo-400" />
            <span>Sanku</span>
          </h2>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-700/70 text-white"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {Links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActiveRoute(item.href, item.optional)
                  ? "border-l-4 border-indigo-400 bg-gradient-to-r from-indigo-600/50 to-indigo-500/30 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <item.icon
                size={20}
                className={isActiveRoute(item.href, item.optional) ? "text-indigo-300" : "text-gray-400"}
              />
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </motion.aside>

      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden h-dvh w-64 flex-col border-r border-gray-800/30 bg-black/30 backdrop-blur-md md:flex"
      >
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <Dumbbell className="text-indigo-400" />
            <span>Sanku</span>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-2">
            {Links.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex cursor-pointer items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActiveRoute(item.href, item.optional)
                      ? "border-l-4 border-indigo-400 bg-gradient-to-r from-indigo-600/50 to-indigo-500/30 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={isActiveRoute(item.href, item.optional) ? "text-indigo-300" : "text-gray-400"}
                  />
                  <span className="ml-3">{item.name}</span>
                  {isActiveRoute(item.href, item.optional) && (
                    <motion.div
                      layoutId="sidebar"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
