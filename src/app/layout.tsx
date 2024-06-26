import type { Metadata } from "next";
import { Providers } from './providers';
import { Inter } from "next/font/google";

import "./globals.css";
import StarsCanvas from "@/components/StarBackground";
import { Logo } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars Fandom",
  description: "A database of all Star Wars Characters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StarsCanvas />
        <Providers>
          <Logo />
          {children}
        </Providers>
      </body>
    </html>
  );
}
