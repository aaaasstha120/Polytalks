"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { SignupSchema } from "@/lib/schema";
import { signIn } from "next-auth/react";
import { toast } from "./ui/use-toast";

type Schema = z.infer<typeof SignupSchema>;

export const SignUpForm = () => {
  const form = useForm<Schema>({
    // @ts-ignore
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: Schema) {
    const newUser = {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.userExists) {
      form.setError("email", data.message);
    } else {
      form.reset();
      toast({ title: "Account created successfully!" });
      signIn("credentials", {
        email: data.user.email,
        password: data.user.password,
        // redirect: false,
        callbackUrl: "/onboarding",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-md">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="•••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-center w-1/2 text-lg" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
