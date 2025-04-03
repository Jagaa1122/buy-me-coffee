"use client";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DonationAmountSelector from "@/app/profile/components/donation-amount-selector";
import ProfileCard from "@/app/profile/components/profile-card";
import SocialMediaCard from "@/app/profile/components/social-media-card";
import SupportersCard from "@/app/profile/components/supporters-card";
import Header from "../_components/Header";
import { useState, useRef } from "react";
import Image from "next/image";

export default function BuyMeCoffee() {
  const userName = "Jake";
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  function onLogout() {
    console.log("Logging out");
    return "";
  }
  
  const handleCoverImageClick = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create a URL for the selected image file
    const imageUrl = URL.createObjectURL(file);
    setCoverImage(imageUrl);
    
    console.log("Image selected:", file.name);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={userName} onLogout={onLogout} />

      {/* Cover Image Section */}
      <div className="relative w-full h-[240px] bg-gray-200 mb-[-60px] z-10">
        {coverImage && (
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="default"
            className="bg-black text-white hover:bg-black/90 cursor-pointer z-10"
            onClick={handleCoverImageClick}
          >
            <Camera className="mr-2 h-4 w-4" />
            {coverImage ? "Change cover image" : "Add a cover image"}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Content area - will appear below the cover image */}
      <div className="max-w-6xl mx-auto px-4 pb-8 grid md:grid-cols-2 gap-6 relative z-20">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileCard />
          <SocialMediaCard />
          <SupportersCard />
        </div>

        {/* Right Column */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">Buy Jake a Coffee</h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Select amount:</label>
              <DonationAmountSelector />
            </div>

            <div>
              <label
                htmlFor="buymeacoffee-url"
                className="block mb-2 font-medium"
              >
                Enter BuyMeCoffee or social account URL:
              </label>
              <Input
                id="buymeacoffee-url"
                placeholder="buymeacoffee.com/"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Special message:
              </label>
              <Textarea
                id="message"
                placeholder="Please write your message here"
                className="w-full min-h-[120px]"
              />
            </div>

            <Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800">
              Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}