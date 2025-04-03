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
  const usernameForm = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
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
                  onChange={(e) => {
                    field.onChange(e);
                    checkUsernameAvailability(e.target.value);
                  }}
                  className="border-gray-300"
                />
              </FormControl>
              {field.value && (
                <div className="flex items-center mt-1 text-sm">
                  {isUsernameAvailable ? (
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
                      <span className="text-green-500">Username available</span>
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
                        The username is already taken
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
            isUsernameAvailable
              ? "bg-black text-white hover:bg-black/90"
              : "bg-gray-200 text-gray-500"
          }`}
          disabled={!isUsernameAvailable}
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
