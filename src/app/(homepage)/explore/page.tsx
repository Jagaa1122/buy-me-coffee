"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink } from "lucide-react"
import Header from "@/app/_components/Header";
import { SideBar } from "@/app/_components/SideBar";

 interface Creator {
    id: string
    name: string
    image: string
    about: string
    socialUrl: string
  }

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState({
    name: "",
    avatarUrl: "/placeholder.svg?height=32&width=32",
  });
  const [loading, setLoading] = useState(true);

  const creators: Creator[] = [
        {
          id: "1",
          name: "Space ranger",
          image: "/avatar.jpg?height=30&width=30",
          about:
            "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clear information.",
          socialUrl: "https://buymeacoffee.com/baconpancakes1",
        },
        {
          id: "2",
          name: "Purple monster",
          image: "/placeholder.svg?height=60&width=60",
          about: "Purple monster is for everyone. It handles all the painful experiences and helps people.",
          socialUrl: "https://buymeacoffee.com/ifmonster23",
        },
        {
          id: "3",
          name: "Alien Conspiracy",
          image: "/placeholder.svg?height=60&width=60",
          about: "Show your support ❤️and buy me a coffee! & keep project a live!",
          socialUrl: "https://buymeacoffee.com/roooaaaamm",
        },
        {
          id: "4",
          name: "Teams",
          image: "/placeholder.svg?height=60&width=60",
          about:
            'Joel 1:14 "Sanctify a fast, call a solemn assembly, gather the elders and all the inhabitants of the land. Cry out to the LORD."My purpose is clear: To seek God\'s face, every Thursday for all my Subscribers to align with His will, and to step into the destiny He has for you.',
          socialUrl: "https://buymeacoffee.com/kaka0",
        },
      ]
    
      const filteredCreators = creators.filter((creator) => creator.name.toLowerCase().includes(searchQuery.toLowerCase()))
  useEffect(() => {
    // Check if user is logged in
    const userName = localStorage.getItem("userName");

    if (!userName) {
      // Redirect to login if not logged in
      router.push("/login");
      return;
    }

    // Set user data if logged in
    setUser({
      name: userName,
      avatarUrl: "/placeholder.svg?height=32&width=32",
    });

    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gap-7">
      <Header userName={user.name} avatarUrl={user.avatarUrl} />
      <div className="flex mt-23 pl-[20px]">
        <SideBar/>
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
        {filteredCreators.map((creator) => (
          <div key={creator.id} className="border rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={creator.image || "/placeholder.svg"}
                  alt={creator.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <h2 className="text-lg font-semibold">{creator.name}</h2>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <span>View profile</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">About {creator.name}</h3>
                <p className="text-sm text-gray-700">{creator.about}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Social media URL</h3>
                <a
                  href={creator.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline break-all"
                >
                  {creator.socialUrl}
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





















// "use client"

// import { useState } from "react"
// import { Search, ExternalLink } from "lucide-react"
// import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import Header from "@/app/_components/Header"

// interface Creator {
//   id: string
//   name: string
//   image: string
//   about: string
//   socialUrl: string
// }

// export default function ExploreCreators() {
//   const [searchQuery, setSearchQuery] = useState("")

//   const creators: Creator[] = [
//     {
//       id: "1",
//       name: "Space ranger",
//       image: "/avatar.jpg?height=30&width=30",
//       about:
//         "All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clear information.",
//       socialUrl: "https://buymeacoffee.com/baconpancakes1",
//     },
//     {
//       id: "2",
//       name: "Purple monster",
//       image: "/placeholder.svg?height=60&width=60",
//       about: "Purple monster is for everyone. It handles all the painful experiences and helps people.",
//       socialUrl: "https://buymeacoffee.com/ifmonster23",
//     },
//     {
//       id: "3",
//       name: "Alien Conspiracy",
//       image: "/placeholder.svg?height=60&width=60",
//       about: "Show your support ❤️and buy me a coffee! & keep project a live!",
//       socialUrl: "https://buymeacoffee.com/roooaaaamm",
//     },
//     {
//       id: "4",
//       name: "Teams",
//       image: "/placeholder.svg?height=60&width=60",
//       about:
//         'Joel 1:14 "Sanctify a fast, call a solemn assembly, gather the elders and all the inhabitants of the land. Cry out to the LORD."My purpose is clear: To seek God\'s face, every Thursday for all my Subscribers to align with His will, and to step into the destiny He has for you.',
//       socialUrl: "https://buymeacoffee.com/kaka0",
//     },
//   ]

//   const filteredCreators = creators.filter((creator) => creator.name.toLowerCase().includes(searchQuery.toLowerCase()))

//   return (
    
//     <div className="max-w-3xl mx-auto p-4 md:p-6">
//       <h1 className="text-2xl font-bold mb-6">Explore creators</h1>

//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//         <Input
//           placeholder="Search name"
//           className="pl-10"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className="space-y-6">
//         {filteredCreators.map((creator) => (
//           <div key={creator.id} className="border rounded-lg p-4 md:p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <Image
//                   src={creator.image || "/placeholder.svg"}
//                   alt={creator.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full"
//                 />
//                 <h2 className="text-lg font-semibold">{creator.name}</h2>
//               </div>
//               <Button variant="outline" size="sm" className="flex items-center gap-1.5">
//                 <span>View profile</span>
//                 <ExternalLink className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-medium mb-2">About {creator.name}</h3>
//                 <p className="text-sm text-gray-700">{creator.about}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-2">Social media URL</h3>
//                 <a
//                   href={creator.socialUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-blue-600 hover:underline break-all"
//                 >
//                   {creator.socialUrl}
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


