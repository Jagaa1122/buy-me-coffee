"use client";

import { useState } from "react";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

export default function SignupPage() {
  const [step, setStep] = useState("username");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [username, setUsername] = useState("");

  const checkUsernameAvailable = (available: boolean) => {
    setIsUsernameAvailable(available);
  };

  const onUsernameSubmit = (data: { username: string }) => {
    if (isUsernameAvailable) {
      setUsername(data.username);
      setStep("credentials");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {step === "username" ? (
            <FirstStep
              onUsernameSubmit={onUsernameSubmit}
              isUsernameAvailable={isUsernameAvailable}
              checkUsernameAvailability={checkUsernameAvailable}
            />
          ) : (
            <SecondStep username={username} />
          )}
        </div>
      </div>
    </div>
  );
}