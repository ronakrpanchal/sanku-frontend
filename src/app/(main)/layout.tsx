import SideBar from "@/components/sidebar";
import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen bg-[#161618]">
      <SideBar />
      <main className="flex-1 h-full overflow-x-auto">{children}</main>
    </div>
  );
}
