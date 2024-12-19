import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
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
      <body
        className={`${bricolageGrotesque.className} ${bricolageGrotesque.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
