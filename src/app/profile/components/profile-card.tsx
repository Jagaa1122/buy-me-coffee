import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileCard() {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold">Jake</h2>
        </div>
        <Button variant="outline" size="sm">
          Edit page
        </Button>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">About Jake</h3>
        <p className="text-gray-700">
          I&apos;m a typical person who enjoys exploring different things. I
          also make music art as a hobby. Follow me along.
        </p>
      </div>
    </div>
  );
}
