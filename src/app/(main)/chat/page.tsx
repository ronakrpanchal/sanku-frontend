import React from "react";

type Props = {};
export default function Page({}: Props) {
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h2 className="text-5xl font-bold">Welcome to Sanku 👋</h2>
      <h2 className="text-2xl">What can I help you with ?</h2>
    </div>
  );
}
