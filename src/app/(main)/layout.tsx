import SideBar from "@/components/sidebar";
import React, { Suspense } from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#161618] md:h-dvh md:flex-row">
      <Suspense fallback={<div className="w-16 md:w-64" />}>
        <SideBar />
      </Suspense>
      <main className="min-w-0 flex-1 overflow-x-hidden md:h-full">{children}</main>
    </div>
  );
}
