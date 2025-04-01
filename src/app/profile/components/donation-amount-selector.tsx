"use client"

import { useState } from "react"
import { Coffee } from "lucide-react"

export default function DonationAmountSelector() {
  const [selectedAmount, setSelectedAmount] = useState("5")

  const amounts = [
    { value: "1", label: "$1" },
    { value: "2", label: "$2" },
    { value: "5", label: "$5" },
    { value: "10", label: "$10" },
  ]

  return (
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
  )
}