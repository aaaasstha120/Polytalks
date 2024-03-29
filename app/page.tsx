import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { ArrowRightIcon } from "lucide-react";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      <Navbar session={session} />
      <div className="flex flex-row h-screen">
        <div className="flex-1 px-8 py-28 flex flex-col justify-between items-center">
          <div className="overflow-hidden flex flex-col items-center max-w-min mx-auto text-center gap-5">
            <h1 className="text-7xl font-architects-daughter font-normal text-fuchsia-700">
              PolyTalks
            </h1>
            <div className="h-px bg-fuchsia-700 w-full" />
            <p className="text-2xl font-semibold">
              Unlocking Languages, Connecting Worlds
            </p>
          </div>
          <p className="italic text-xl text-center max-w-prose">
            Welcome to PolyTalks, your gateway to mastering languages while
            immersing yourself in vibrant, real-world experiences.
          </p>
          <a
            href="/signup"
            // variant="outline"
            className=" rounded-full max-w-fit flex flex-row text-fuchsia-700 hover:underline"
          >
            Are you ready to go on a journey of linguistic discovery?
            <ArrowRightIcon className="ml-4 stroke-1 stroke-ring" />
          </a>
          <a href="#features" className="italic hover:underline">
            Still doubt us? Know more..
          </a>
        </div>
        <img className="flex-1 hidden lg:block" src="/landing.png" />
      </div>
      <Features />
      <CTA />
    </>
  );
}
