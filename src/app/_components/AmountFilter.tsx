"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Copy } from "lucide-react";
import { useState } from "react";

export const Amountfilter = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedAmount(value); // Update the selected value state
  };
  return (
    <div className="w-[50%] flex flex-col m-auto rounded-lg px-5">
      <div className="w-[100%] flex flex-col  border-border border-[1px] rounded-lg p-5">
        <div>
          <div className="w-full flex justify-between items-center ">
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start gap-1 ">
                <h4 className="text-[16px] font-[700] leading-[24px] ">Jake</h4>
                <h5 className="text-[14px] font-[400] leading-[20px] ">
                  buymeacoffee.com/baconpancakes1
                </h5>
              </div>
            </div>
            <Button className="gap-2 h-10 flex ">
              <Copy />
              <p>Share page link</p>
            </Button>
          </div>
          <div className="py-4 ">
            <div className="w-full border-b-[1px] "></div>
          </div>
          <div className="w-full flex flex-col gap-6 items-start ">
            <div className="w-full gap-4 flex items-center ">
              <h4 className="text-[20px] font-[600] leading-[28px] ">
                Earnings
              </h4>
              <Select>
                <SelectTrigger className="w-[175px]">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Last 30 days</SelectItem>
                  <SelectItem value="dark">Last 90 days</SelectItem>
                  <SelectItem value="system">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full ">
              <h1 className="text-[36px] font-[700] leading-[40px] ">$450</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 items-start ">
        <div className="flex w-full justify-between items-start ">
          <h4 className="text-[16px] font-[600] leading-[24px] ">
            Recent transactions
          </h4>
          <Select value={selectedAmount} onValueChange={handleChange}>
            <SelectTrigger className="h-[36px] py-2 px-4 border-dashed">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAmount === "$1"}
                  readOnly
                />
                $1
              </SelectItem>
              <SelectItem value="$2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAmount === "$2"}
                  readOnly
                />
                $2
              </SelectItem>
              <SelectItem value="$5">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAmount === "$5"}
                  readOnly
                />
                $5
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-4 p-6 items-start rounded-lg border-[1px] ">
          {[
            {
              name: "Guest",
              profile: "instagram.com/welesley",
              amount: "$1",
              time: "10 hours ago",
              message:
                "Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn’t that much money it’s all I can contribute at the moment",
            },
            {
              name: "John Doe",
              profile: "buymeacoffee.com/bdsadas",
              amount: "$10",
              time: "10 hours ago",
              message: "Thank you for being so awesome everyday!",
            },
            {
              name: "Radicals",
              profile: "buymeacoffee.com/gkfgrew",
              amount: "$2",
              time: "10 hours ago",
              message: "Thank you for your support!",
            },
            {
              name: "Guest",
              profile: "facebook.com/penelopeb",
              amount: "$5",
              time: "10 hours ago",
              message: "Keep up the great work!",
            },
            {
              name: "Fan1",
              profile: "buymeacoffee.com/supporterone",
              amount: "$10",
              time: "10 hours ago",
              message:
                "When I become successful I will be sure to buy you more coffee!",
            },
          ].map((transaction, index) => (
            <div
              key={index}
              className="p-3 flex flex-col gap-[10px] rounded-lg border-b-[1px] last:border-b-0"
            >
              <div className="w-full flex justify-between items-center ">
                <div className="flex gap-3 items-center ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center items-start gap-1 ">
                    <h4 className="text-[14px] font-[500] leading-[20px] ">
                      {transaction.name}
                    </h4>
                    <h5 className="text-[12px] font-[400] leading-[16px] ">
                      {transaction.profile}
                    </h5>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end w-[258.5px] ">
                  <h4 className="text-[16px] font-[500] leading-[20px] ">
                    +
                    <span className="text-[16px] font-[700] leading-[20px] ">
                      {transaction.amount}
                    </span>
                  </h4>
                  <h4 className="text-[12px] font-[400] leading-[16px] text-muted-foreground ">
                    {transaction.time}
                  </h4>
                </div>
              </div>
              <h4 className="text-[14px] font-[400] leading-[20px] w-full ">
                {transaction.message}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
