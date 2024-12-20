import { GoogleRegisterButton } from "@/components/google-register-button";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { RiDashboard3Line } from "react-icons/ri";
import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.className} ${bricolageGrotesque.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <nav className="flex justify-between items-center p-6 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="md:text-xl tracking-tighter font-bold font-spaceGrotesk"
            >
              StudyTube
            </Link>

            <Button variant={"link"} asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>

            <Button variant={"link"} asChild>
              <Link href="/support">Support</Link>
            </Button>
          </div>
          <div className="flex gap-3">
            {user ? (
              <>
                <Button variant={"outline"} asChild>
                  <Link href="/dashboard">
                    <RiDashboard3Line className="mr-2" /> Dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <GoogleRegisterButton />
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
