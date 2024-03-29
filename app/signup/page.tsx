import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleAuth from "@/components/GoogleAuth";
import { SignUpForm } from "@/components/SignUpForm";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export default function page() {
  return (
    <div className="h-screen relative flex items-center justify-between sm:p-8 md:p-20">
      <div className="relative z-10 flex flex-col gap-8  bg-white/80 backdrop-blur-sm border sm:border-black sm:rounded-3xl sm:max-w-lg px-8 sm:px-4 py-3 md:px-8 md:py-6 w-full">
        <h1 className="text-2xl text-center text-primary font-extrabold tracking-tight lg:text-3xl">
          <ArrowLeft />
          Welcome to PolyTalks
        </h1>
        <SignUpForm />
        <Separator className="bg-primary/30" />
        <GoogleAuth />
        <p className="text-lg text-center">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-lg hover:underline hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </div>
      <img
        src="/signup.jpg"
        className="absolute inset-0 h-full max-h-full w-full object-cover"
        alt=""
      />
    </div>
  );
}
