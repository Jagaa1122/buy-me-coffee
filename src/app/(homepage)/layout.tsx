import React from "react";
import { SideBar } from "../_components/SideBar";

export default function AuthLeftBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full h-screen ">
      <SideBar />
      {children}
    </main>
  );
}
