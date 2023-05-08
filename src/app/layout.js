"use client";
import "./globals.css";

//session
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar /> {children}
        </Providers>
      </body>
    </html>
  );
}
