"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";
import { useUser } from "@/app/_context/UserContext";
import { profileType } from "../../../../../util/types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { users } = useUser()!;
  const [creator, setCreator] = useState<unknown>(null);

  console.log(users, "jagaagiin profile ireh ystoi");

  useEffect(() => {
    if (id && users) {
      const newId = Number(id);
      // Find the user by matching the `id` from the URL
      const user = users.find((user) => user.id === newId);
      setCreator(user); // Set the creator data for the profile
    }
  }, [id, users]);

  if (!creator) return <div>Loading...</div>;

  return (
    <div className="gap-7">
      <div className="flex mt-23 pl-[20px]">
        <div className="max-w-3xl mx-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Explore creators</h1>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search name"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {users?.map((creator: profileType) => (
              <div key={creator.id} className="border rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      alt={"https://github.com/shadcn.png"}
                      src={
                        creator?.avatarimage
                          ? creator.avatarimage
                          : "https://github.com/shadcn.png"
                      }
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <h2 className="text-lg font-semibold">{creator.name}</h2>
                  </div>
                  <Link href={`/profile/${creator.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5"
                    >
                      <span>View profile</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">About {creator.about}</h3>
                    <p className="text-sm text-gray-700">{creator.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Social media URL</h3>
                    <a
                      href={creator.socialmediaurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {creator.socialmediaurl}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
