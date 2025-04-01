import { Heart } from "lucide-react"

export default function SupportersCard() {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-bold text-lg mb-6">Recent Supporters</h3>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-white p-3 rounded-full border mb-4">
          <Heart className="h-6 w-6" />
        </div>
        <p className="text-gray-700 font-medium">Be the first one to support Jake</p>
      </div>
    </div>
  )
}

