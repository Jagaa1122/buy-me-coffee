import { Input } from "@/components/ui/input";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex w-full h-full">
      <div className="bg-amber-400 w-[50%] h-screen">
        <Logo />
        <div className="flex flex-col justify-center items-center">
          <img src="illustration.png" alt="picture" />
          <h4 className="font-semibold">Fund your creative work</h4>
          <p>
            Accept support.Start a membership. Setup a shop. It's easier than
            you think.
          </p>
        </div>
      </div>
      <div className=" w-[50%] flex flex-col justify-center items-center">
        <h1 className="text-[#202124] font-bold text-[26px]">
          Create your account
        </h1>
        <p className="text-[#8E8E8E] mb-5">Choose a username for your page</p>
        <Input placeholder="Enter user name here" type="text" />
        <Button className="bg-slate-400 text-white">Continue</Button>
      </div>
    </div>
  );
}
