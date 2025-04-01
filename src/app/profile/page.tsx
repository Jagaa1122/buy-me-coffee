import Image from "next/image"
import { Coffee, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import DonationAmountSelector from "@/app/profile/components/donation-amount-selector"
import ProfileCard from "@/app/profile/components/profile-card"
import SocialMediaCard from "@/app/profile/components/social-media-card"
import SupportersCard from "@/app/profile/components/supporters-card"

export default function BuyMeCoffee() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6" />
          <h1 className="font-bold text-lg">Buy Me Coffee</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Jake</span>
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Jake's profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Cover Image Section */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        <Button variant="default" className="bg-black text-white hover:bg-black/90">
          <Camera className="mr-2 h-4 w-4" />
          Add a cover image
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
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
              <label htmlFor="buymeacoffee-url" className="block mb-2 font-medium">
                Enter BuyMeCoffee or social account URL:
              </label>
              <Input id="buymeacoffee-url" placeholder="buymeacoffee.com/" className="w-full" />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Special message:
              </label>
              <Textarea id="message" placeholder="Please write your message here" className="w-full min-h-[120px]" />
            </div>

            <Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800">Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
