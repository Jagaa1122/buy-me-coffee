"use client";

import { useState } from "react";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

export default function SignupPage() {
  const [step, setStep] = useState("username"); // Step 1: "username", Step 2: "credentials"
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const checkUsernameAvailability = (value: string) => {
    const available = value !== "baconpancakes" && value.length >= 3;
    setIsUsernameAvailable(available);
  };

  const onUsernameSubmit = (data: { username: string }) => {
    if (isUsernameAvailable) {
      setStep("credentials");
    }
  };

  // const onCredentialsSubmit = (data: { email: string; password: string }) => {
  //   console.log("Credentials submitted", data);
  //   // Handle credential submission logic here
  // };
  // onCredentialsSubmit={onCredentialsSubmit}

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        {step === "username" ? (
          <FirstStep
            onUsernameSubmit={onUsernameSubmit}
            isUsernameAvailable={isUsernameAvailable}
            checkUsernameAvailability={checkUsernameAvailability}
          />
        ) : (
          <SecondStep />
        )}
      </div>
    </div>
  );
}
