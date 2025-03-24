import { Coffee } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex gap-2 absolute left-14 top-8">
      <Coffee /> <p className="font-semibold">Buy Me Coffee</p>
    </div>
  );
}
