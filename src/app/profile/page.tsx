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
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { profileType } from "../../../util/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { Loader } from "@/app/_components/Loader";

export default function BuyMeCoffee() {
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState<profileType | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Get username and user ID from localStorage
    const storedUserName = localStorage.getItem("userName") || "";
    const userId = localStorage.getItem("userId");
    
    setUserName(storedUserName);
    
    const fetchUserProfile = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        
        // Fetch all profiles
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!res.ok) throw new Error("Failed to fetch profiles");
        
        const profiles = await res.json();
        console.log("Fetched profiles:", profiles);
        
        // In your database structure, it looks like users have a profile_id
        // We need to find the profile that belongs to the current user
        // This may require an additional API call to get the current user's details including profile_id
        
        // For now, let's assume we want to find a profile that matches the user's name
        const myProfile = profiles.find((p: profileType) => 
          p.name && p.name.toLowerCase() === storedUserName.toLowerCase()
        );
        
        console.log("Found profile:", myProfile);
        
        if (myProfile) {
          setUserProfile(myProfile);
          if (myProfile.backgroundimage) {
            setCoverImage(myProfile.backgroundimage);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  function onLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    window.location.href = "/login";
    return "";
  }

  const handleCoverImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCoverImage(imageUrl);
    console.log("Image selected:", file.name);
  };

  if (loading) {
    return (
         <div className="flex items-center justify-center w-screen h-screen">
           <Loader />
         </div>
       );
  }

  // Since we need to modify the child components, let's create inline versions here that accept our data
  const CustomProfileCard = () => (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userProfile?.avatarimage || "/avatar.jpg"} />
              <AvatarFallback>{(userProfile?.name || userName || "?").charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold">{userProfile?.name || userName}</h2>
        </div>
        <Button variant="outline" size="sm">
          Edit page
        </Button>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">About {userProfile?.name || userName}</h3>
        <p className="text-gray-700">
          {userProfile?.about || "Add information about yourself..."}
        </p>
      </div>
    </div>
  );

  const CustomSocialMediaCard = () => (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-bold text-lg mb-3">Social media URL</h3>
      <p className="text-gray-700">{userProfile?.socialmediaurl || "Add your social media URL"}</p>
    </div>
  );

  const CustomSupportersCard = () => (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-bold text-lg mb-6">Recent Supporters</h3>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-white p-3 rounded-full border mb-4">
          <Heart className="h-6 w-6" fill="black" stroke="none" />
        </div>
        <p className="text-gray-700 font-medium">Be the first one to support {userProfile?.name || userName}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={userName} onLogout={onLogout} />

      {/* Cover Image Section */}
      <div className="relative w-full h-[240px] bg-gray-200 mb-[-60px] z-10">
        {coverImage && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              width={1000}
              height={1000}
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
          {/* Use our custom inline components that have access to userProfile */}
          <CustomProfileCard />
          <CustomSocialMediaCard />
          <CustomSupportersCard />
        </div>

        {/* Right Column */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">Buy {userProfile?.name || userName} a Coffee</h2>

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