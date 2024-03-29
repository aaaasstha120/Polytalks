"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const formSchema = z
  .object({
    email: z.string({ required_error: "Email is required." }).email(),

    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .required();
type Schema = z.infer<typeof formSchema>;

export default function SignInForm() {
  const form = useForm<Schema>({
    // @ts-ignore
    resolver: zodResolver<Schema>(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: Schema) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-md">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="•••••••••" {...field} />
              </FormControl>
              <FormMessage />
              <Button className="ml-auto text-gray-500 px-0" variant="link">
                Forgot Password?
              </Button>
            </FormItem>
          )}
        />
        <Button className="self-center w-1/2 text-lg" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
