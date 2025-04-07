"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const credentialsFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;

interface SecondStepProps {
  username: string;
}

export default function SecondStep({ username }: SecondStepProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Credentials form
  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle credentials form submission
  const onCredentialsSubmit = async (data: CredentialsFormValues) => {
    try {
      setIsSubmitting(true);
      setError("");

      console.log("Submitting registration data:", {
        username,
        email: data.email,
        password: data.password,
      });

      // Register the user with the updated API endpoint path
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Registration error response:", result);
        throw new Error(result.error || "Failed to create account");
      }

      // Store user info
      localStorage.setItem("userName", username);

      // Redirect to profile creation page
      router.push("/createprofile");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      console.error(error, "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        <h1 className="mb-2 text-2xl font-bold">Welcome, {username}</h1>
        <p className="text-muted-foreground">
          Connect email and set a password
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <Form {...credentialsForm}>
        <form
          onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)}
          className="space-y-4"
        >
          <FormField
            control={credentialsForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email here"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={credentialsForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password here"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
