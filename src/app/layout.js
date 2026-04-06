import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata = {
  title: "Code Clash: From Syntax to Algorithms",
  description: "An interactive game designed to make programming education engaging and fun.",
};

import { AudioProvider } from "@/components/AudioProvider";
import GlobalMuteButton from "@/components/GlobalMuteButton";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={`${outfit.variable} ${firaCode.variable} antialiased`}>
        <AudioProvider>
          {children}
          <GlobalMuteButton />
        </AudioProvider>
      </body>
    </html>
  );
}
