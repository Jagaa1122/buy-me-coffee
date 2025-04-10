"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }
      
      localStorage.setItem("userName", data.user.username);
      localStorage.setItem("userId", data.user.id.toString());

      if (data.user.profile_id) {
        router.push("/");
      } else {
        router.push("/createprofile");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link href={"/register"}>
        <Button
          variant={"secondary"}
          className="h-10 absolute top-[32px] right-[80px] cursor-pointer"
        >
          Register
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[407px] flex flex-col items-start rounded-lg"
        >
          <div className="flex flex-col items-start p-6">
            <h3 className="text-[24px] font-[600] leading-[32px] w-full">
              Login
            </h3>
            {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>
                </div>
                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full">
            <Button
              type="submit"
              variant="default"
              className="w-full cursor-pointer h-10"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;