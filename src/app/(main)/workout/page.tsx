"use client";
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

  return <div className="w-full"></div>;
}
