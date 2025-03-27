"use client";

import CreateProfile from "./_components/CreateProfile";
import PaymentDetail from "./_components/PaymentDetails";
import Login from "./(auth)/login/Login";
import { SideBar } from "./_components/SideBar";
import { UserProfile } from "./_components/UserProfile";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "Jake",
    avatarUrl: "/placeholder.svg?height=32&width=32",
  });

  const handleLogout = () => {
    // Here you would implement your actual logout logic
    // For example:
    // await supabase.auth.signOut()
    console.log("User logged out");

    // Redirect to login page or clear user state
    // router.push('/login')

    // For demo purposes, we'll just log a message
    alert("Logged out successfully");
  };
  return (
    <div className="gap-7 ">
      {/* <Login /> */}
      {/* <CreateProfile /> */}
      {/* <PaymentDetail /> */}
      <Header
        userName={user.name}
        avatarUrl={user.avatarUrl}
        onLogout={handleLogout}
      />
      <div className="flex mt-23 pl-[20px]">
        <SideBar />
        <UserProfile />
      </div>
    </div>
  );
}
