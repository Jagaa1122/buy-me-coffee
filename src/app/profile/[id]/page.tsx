"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/_components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Coffee } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileType } from "../../../../util/types";
import { Loader } from "@/app/_components/Loader";

export default function ProfileView() {
  const params = useParams();
  const profileId = params.id;
  const [profile, setProfile] = useState<profileType | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("5");
  
  // Define donation amounts
  const amounts = [
    { value: "1", label: "$1" },
    { value: "2", label: "$2" },
    { value: "5", label: "$5" },
    { value: "10", label: "$10" },
  ];

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "";
    setUserName(storedUserName);
    
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!res.ok) throw new Error("Failed to fetch profiles");
        
        const profiles = await res.json();
        const currentProfile = profiles.find((p: profileType) => p.id.toString() === profileId);
        
        if (currentProfile) {
          setProfile(currentProfile);
          const userId = localStorage.getItem("userId");
          setIsOwner(false); 
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  const handleDonation = async () => {
    // You can implement the actual donation logic here
    alert(`Thank you for supporting ${profile?.name} with $${selectedAmount}!`);
    // In a real implementation, you would process the payment and save the transaction
  };

  if (loading)  return (
        <div className="flex items-center justify-center w-screen h-screen">
          <Loader />
        </div>
      );
  if (!profile) return <div className="flex items-center justify-center h-screen">Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={userName} avatarUrl="" />
      
      <div className="relative w-full h-[240px] bg-gray-200 mb-[-60px] z-10">
        {profile.backgroundimage && (
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={profile.backgroundimage} 
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8 grid md:grid-cols-2 gap-6 relative z-20">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-3 items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatarimage || "/avatar.jpg"} />
                  <AvatarFallback>{profile.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start gap-1">
                  <h4 className="text-xl font-bold">{profile.name}</h4>
                  <h5 className="text-sm text-gray-600">
                    buymeacoffee.com/{profile.name?.toLowerCase().replace(/\s+/g, '')}
                  </h5>
                </div>
              </div>
              
              {isOwner && (
                <Link href="/acc-settings">
                  <Button variant="outline" size="sm">
                    Edit profile
                  </Button>
                </Link>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">About {profile.name}</h3>
              <p className="text-gray-700">{profile.about}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-bold text-lg mb-3">Social media URL</h3>
            <a 
              href={profile.socialmediaurl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {profile.socialmediaurl} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">Buy {profile.name} a Coffee</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Select amount:</label>
              <div className="flex gap-2">
                {amounts.map((amount) => (
                  <button
                    key={amount.value}
                    className={`flex items-center gap-1 px-4 py-2 rounded-md border ${
                      selectedAmount === amount.value ? "border-primary bg-primary/5" : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedAmount(amount.value)}
                  >
                    <Coffee className="h-4 w-4" />
                    <span>{amount.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Special message:
              </label>
              <Textarea
                id="message"
                placeholder="Write a message to the creator..."
                className="w-full min-h-[120px]"
              />
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={handleDonation}
            >
              Support with ${selectedAmount}
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Your support helps {profile.name} continue creating!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}