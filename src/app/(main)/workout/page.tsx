"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});
export default function Page() {
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <div className="w-full">
      <Tabs defaultValue="plans" onValueChange={setActiveTab}>
        <div className="relative">
          <TabsList className="w-full grid grid-cols-2 bg-transparent">
            <TabsTrigger
              value="plans"
              className={`font-extrabold px-4 py-2 transition-all `}
              style={{ background: "none", border: "none", boxShadow: "none" }}
            >
              Plans
            </TabsTrigger>
            <TabsTrigger
              value="find"
              className={`font-extrabold px-4 py-2 transition-colors ${
                activeTab === "find" ? "text-white" : "text-gray-400"
              }
              `}
              style={{ background: "none", border: "none", boxShadow: "none" }}
            >
              Find
            </TabsTrigger>
          </TabsList>

          {/* Underline indicator */}
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 top-10 left-0 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            animate={{ x: activeTab === "plans" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <TabsContent value="plans" className="mt-4">
          <p className="text-white">Your plans content goes here</p>
        </TabsContent>
        <TabsContent value="find" className="mt-4">
          <p className="text-white">Your find content goes here</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
