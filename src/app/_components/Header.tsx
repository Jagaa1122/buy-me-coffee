"use client";

import { useState } from "react";
import Link from "next/link";
import { Coffee, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userName: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

export default function Header({ userName, avatarUrl }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    
    // Close dropdown
    setIsOpen(false);
    
    // Redirect to login page
    router.push("/login");
  };

  // Get the first letter of the username for the avatar fallback
  const userInitial = userName?.charAt(0) || "U";

  return (
    <header className="w-full bg-amber-200 ">
      <div className="container flex h-16 items-center justify-between px-4 ">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Coffee className="h-5 w-5 font-bold" />
          <span className="font-bold">Buy Me Coffee</span>
        </Link>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl || "/avatar.jpg"} alt={userName} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <span>{userName}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}