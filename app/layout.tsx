import "./globals.css";
import type { Metadata } from "next";
import { Kulim_Park } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const kulim = Kulim_Park({
  weight: ["200", "300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolyTalks",
  description: "PolyTalks is a collection of tutorials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kulim.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
