import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { profileType } from "../../../util/types";

interface ProfileCardProps {
  profile: profileType | null;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  // Use the profile data or fallback to empty values
  const profileName = profile?.name || "";
  const profileAbout = profile?.about || "";
  const profileAvatar = profile?.avatarimage || "/avatar.jpg";
  
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profileAvatar} />
              <AvatarFallback>{profileName.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold">{profileName}</h2>
        </div>
        <Link href="/acc-settings">
          <Button variant="outline" size="sm">
            Edit page
          </Button>
        </Link>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">About {profileName}</h3>
        <p className="text-gray-700">
          {profileAbout || "Add information about yourself..."}
        </p>
      </div>
    </div>
  );
}