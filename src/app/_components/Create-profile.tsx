"use client";

import { CameraIcon, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  photo: z.string().min(2, {
    message: "Please add a photo.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  about: z.string().min(2, {
    message: " Please enter info about yourself.",
  }),
  socialMedia: z.string().min(2, {
    message: "Please enter a social link",
  }),
});

export default function CreateProfile() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: "",
      username: "",
      about: "",
      socialMedia: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between px-[80px] py-2.5 bg-amber-200 items-center w-screen mb-8">
        <div className="flex gap-2">
          <Coffee /> <p className="font-semibold">Buy Me Coffee</p>
        </div>
        <Button
          className=" text-black bg-[#f4f4f5] hover:text-white"
          onClick={() => (window.location.href = "/auth/signup")}
        >
          Signup
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <h1 className="font-bold">Complete your profile page</h1>
                <p>Add photo</p>
                
                <label
                
                  htmlFor="file-input"
                  className="flex  justify-center items-center cursor-pointer rounded-full border border-dashed border-amber-200 w-[150px] h-[150px]"
                > <CameraIcon /></label>
                <input type="file" id="file-input" className="hidden"/>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>

                <FormControl>
                  <Textarea
                    className="w-[510px] h-[131px]"
                    placeholder="Write about yourself here"
                    {...field}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social media URL</FormLabel>

                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full">
          <Button className="w-[246px] h-10 cursor-pointer" type="submit">Continue</Button>
          </div>
         
        </form>
      </Form>
    </div>
  );
}
