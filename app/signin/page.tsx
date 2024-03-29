import GoogleAuth from "@/components/GoogleAuth";
import SignInForm from "@/components/SignInForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="relative overflow-hidden h-screen flex items-center justify-center md:justify-end p-4 md:p-20">
      <div className="flex flex-col gap-8 bg-white/80 backdrop-blur-sm border border-black rounded-3xl max-w-lg px-4 py-3 md:px-8 md:py-6 w-full">
        <h1 className="scroll-m-20 text-2xl text-center text-primary font-extrabold tracking-tight lg:text-3xl">
          Welcome back!
        </h1>

        <SignInForm />
        <Separator className="bg-primary/30" />
        <GoogleAuth />
        <p className="text-lg text-center">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-lg hover:underline hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <img className="flex-1 max-h-screen" src="/signin.gif" aria-hidden />
    </div>
  );
}
