"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  country: z.string().nonempty("Please select country"),
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  about: z.string().nonempty("Please enter your card number"),
  expires: z.string().nonempty("Please enter mounth"),
  year: z.string().nonempty("Please enter year"),
  cvc: z.string().nonempty("Please enter your cvc"),
});

export default function PaymentDetail() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      about: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/");
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between px-[80px] py-2.5 bg-amber-200 items-center w-screen mb-8">
        <div className="flex gap-2">
          <Coffee /> <p className="font-semibold">Buy Me Coffee</p>
        </div>
        <Button
          className=" text-black bg-[#f4f4f5] hover:text-white"
          onClick={() => (window.location.href = "/register")}
        >
          Log out
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[510px] items-start   "
        >
          <div className="w-full py-6 flex flex-col items-start gap-[6px] ">
            <h3 className="text-[24px] font-[600] leading-[32px] ">
              How would you like to be paid?{" "}
            </h3>
            <h4 className="text-[14px] leading-[20px] font-[400] text-muted-foreground ">
              Enter location and payment details
            </h4>
          </div>
          <div className="w-full flex flex-col items-start gap-6 ">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2 items-start ">
                  <Label>Select country</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          form.formState.errors.country ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mn">Mongolia</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="br">Brazil</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="cn">China</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex items-start gap-3 ">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start gap-2 ">
                    <Label>First name</Label>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here "
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start gap-2 ">
                    <Label>Last name</Label>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here "
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="w-full h-[62px] flex flex-col items-start gap-2 ">
                  <Label>Enter card number</Label>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="w-full h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-start gap-4 ">
              <FormField
                control={form.control}
                name="expires"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Expires</Label>
                    <FormControl>
                      <Input
                        placeholder="Month"
                        className="w-full h-[36px] "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Year</Label>
                    <FormControl>
                      <Input
                        placeholder="Year"
                        className="w-full h-[36px] "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>CVC</Label>
                    <FormControl>
                      <Input
                        placeholder="CVC"
                        className="w-full h-[36px] "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-end mt-6 ">
            <Button className="w-[246px] h-10 cursor-pointer " type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
