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

const credentialsFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
type CredentialsFormValues = z.infer<typeof credentialsFormSchema>;

export default function SecondStep() {
  // Credentials form
  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle credentials form submission
  const onCredentialsSubmit = (data: CredentialsFormValues) => {
    // In a real app, this would submit to your backend
    console.log("Account created:", {
      username: "username",
      email: data.email,
      password: data.password,
    });
    // Proceed to next step or dashboard
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-8">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold">Welcome, {"username"}</h1>
            <p className="text-muted-foreground">
              Connect email and set a password
            </p>
          </div>

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
                className={`w-full ${
                  credentialsForm.formState.isValid
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-gray-200 text-gray-500"
                }`}
                disabled={!credentialsForm.formState.isValid}
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
