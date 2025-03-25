"use client";

import { Input } from "@/components/ui/input";
import Logo from "../../_components/Logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="flex w-full h-full">
      <div className="zuun-tal bg-amber-400 w-[50%] h-screen relative">
        <Logo />
        <div className="flex h-full flex-col justify-center items-center ">
          <img
            src="https://res.cloudinary.com/dslllxkue/image/upload/v1742867286/illustration_rvidcx.png"
            alt="picture"
          />
          <h4 className="font-semibold mt-4 text-[20px]">
            Fund your creative work
          </h4>
          <p className="text-center">
            Accept support.Start a membership. Setup a shop. It's easier <br />{" "}
            than you think.
          </p>
        </div>
      </div>
      <div className="baruun-tal w-[50%] flex flex-col justify-center items-center relative">
        <Button
          className="absolute top-5 right-5 text-black bg-[#f4f4f5] hover:text-white"
          onClick={() => (window.location.href = "/auth/login")}
        >
          Login
        </Button>
        <div>
          <h1 className="text-[#202124] font-bold text-[26px]">
            Create your account
          </h1>
          <p className="text-[#8E8E8E] mb-5">Choose a username for your page</p>
          <Label htmlFor="username" className="mb-3">
            Username
          </Label>
          <Input
            id="username"
            className="w-[300px]"
            placeholder="Enter user name here"
            type="text"
          />
          <Button className="bg-slate-400 text-white mt-5 w-full">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
