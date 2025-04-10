"use client";
import React, { useEffect, useState } from "react";
import { SideBar } from "../_components/SideBar";
import Header from "../_components/Header";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/_components/Loader";

export default function AuthLeftBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    avatarUrl: "/placeholder.svg?height=32&width=32",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userName = localStorage.getItem("userName");

    if (!userName) {
      // Redirect to login if not logged in
      router.push("/login");
      return;
    }

    // Set user data if logged in
    setUser({
      name: userName,
      avatarUrl: "/placeholder.svg?height=32&width=32",
    });

    setLoading(false);
  }, [router]);

  if (loading) {
     return (
          <div className="flex items-center justify-center w-screen h-screen">
            <Loader />
          </div>
        );
  }
  return (
    <main className="w-full  ">
      <Header userName={user.name} avatarUrl={user.avatarUrl} />
      <div>
        <SideBar />
        {children}
      </div>
    </main>
  );
}
