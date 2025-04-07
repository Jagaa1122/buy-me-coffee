"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "./_components/SideBar";
import { Amountfilter } from "./_components/AmountFilter";
import Header from "./_components/Header";

export default function Home() {
  // const router = useRouter();
  // const [user, setUser] = useState({
  //   name: "",
  //   avatarUrl: "/placeholder.svg?height=32&width=32",
  // });
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Check if user is logged in
  //   const userName = localStorage.getItem("userName");

  //   if (!userName) {
  //     // Redirect to login if not logged in
  //     router.push("/login");
  //     return;
  //   }

  //   // Set user data if logged in
  //   setUser({
  //     name: userName,
  //     avatarUrl: "/placeholder.svg?height=32&width=32",
  //   });

  //   setLoading(false);
  // }, [router]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="gap-7">
      {/* <Header userName={user.name} avatarUrl={user.avatarUrl} /> */}
      <div className="flex mt-23 pl-[20px]">
        <SideBar />
        <Amountfilter />
      </div>
    </div>
  );
}
