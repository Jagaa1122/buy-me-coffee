import React from "react";
import Image from "next/image";
import Logo from "../_components/Logo";

export default function AuthLeftBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full h-screen ">
      <div className="zuun-tal bg-amber-400 w-[50%] h-screen relative">
        <Logo />
        <div className="flex h-full flex-col justify-center items-center ">
          <Image
            width={250}
            height={250}
            src="https://res.cloudinary.com/dslllxkue/image/upload/v1742867286/illustration_rvidcx.png"
            alt="picture"
          />
          <h4 className="font-semibold mt-4 text-[20px]">
            Fund your creative work
          </h4>
          <p className="text-center">
            Accept support. Start a membership. Setup a shop. It&apos;s easier{" "}
            <br /> than you think.
          </p>
        </div>
      </div>
      {children}
    </main>
  );
}
