"use client";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className=" w-[50%] h-full  flex flex-col justify-center items-center relative">
      <div className="baruun-tal  flex flex-col justify-center items-center ">
        <Button
          className="absolute top-5 right-5 text-black bg-[#f4f4f5] hover:text-white"
          onClick={() => (window.location.href = "/login")}
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
