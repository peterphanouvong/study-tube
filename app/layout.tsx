import type { Metadata } from "next";
import "./globals.css";
import { Rethink_Sans } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const rethink = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudyTube | YoutTube Productivity Booster",
  description:
    "Boost your productivity on YouTube. Remove video suggestions, enable AI summaries, and create a distraction-free viewing environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rethink.className} antialiased`}>{children}</body>
    </html>
  );
}
