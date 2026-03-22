import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/components/AudioProvider";

export const metadata: Metadata = {
  title: "CodeQuest: JavaScript Warrior",
  description: "Learn JavaScript by playing a 2D adventure game. Control your warrior with real code!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
