"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";

const usernameFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

type UsernameFormValues = z.infer<typeof usernameFormSchema>;

interface FirstStepProps {
  onUsernameSubmit: (data: UsernameFormValues) => void;
  isUsernameAvailable: boolean;
  checkUsernameAvailability: (value: string) => void;
}

export default function FirstStep({
  onUsernameSubmit,
  isUsernameAvailable,
  checkUsernameAvailability,
}: FirstStepProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const usernameForm = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange", // This will validate on change
  });

  const username = usernameForm.watch("username");
  const isUsernameValid = username.length >= 3;

  useEffect(() => {
    if (username.length >= 3 && hasInteracted) {
      const checkUsername = async () => {
        setIsChecking(true);

        try {
          // Check username in the database
          const response = await fetch(
            `/api/check-username?username=${username}`,
            {
              method: "GET",
            }
          );

          const data = await response.json();

          console.log("DATA!!!", data);
          checkUsernameAvailability(data.exists);
        } catch (error) {
          console.error("Error checking username:", error);
          // Default to not available on error
          checkUsernameAvailability("");
        } finally {
          setIsChecking(false);
        }
      };

      const timeoutId = setTimeout(checkUsername, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [username, checkUsernameAvailability, hasInteracted]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    usernameForm.setValue("username", value);
    setHasInteracted(true);

    // Reset username availability when typing
    if (value.length < 3) {
      checkUsernameAvailability("");
    }
  };

  // This function determines if the button should be enabled
  const isButtonEnabled = () => {
    return isUsernameValid && (isUsernameAvailable || !hasInteracted);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-8">
        <Link href="/login">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">Register your account</h1>
        <p className="text-muted-foreground">Choose a username for your page</p>
      </div>

      <Form {...usernameForm}>
        <form
          onSubmit={usernameForm.handleSubmit(onUsernameSubmit)}
          className="space-y-4"
        >
          <FormField
            control={usernameForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username here"
                    {...field}
                    onChange={handleUsernameChange}
                    className={`border-gray-300 ${
                      hasInteracted &&
                      username.length >= 3 &&
                      !isUsernameAvailable
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                {hasInteracted && username.length >= 3 && (
                  <div className="flex items-center mt-1 text-sm">
                    {isChecking ? (
                      <div className="text-gray-500">
                        Checking availability...
                      </div>
                    ) : isUsernameAvailable ? (
                      <>
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 text-white"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-green-500">
                          Username available
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 text-white"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </div>
                        <span className="text-red-500">
                          This username is already taken
                        </span>
                      </>
                    )}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`w-full ${
              isButtonEnabled()
                ? "bg-black text-white hover:bg-black/90"
                : "bg-gray-200 text-gray-500"
            }`}
            disabled={!isButtonEnabled() || isChecking}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
