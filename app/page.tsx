import { GoogleRegisterButton } from "@/components/google-register-button";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { FaChrome } from "react-icons/fa6";
import {
  RiDashboard3Line,
  RiExternalLinkLine,
  RiFocusMode,
  RiHeadphoneFill,
  RiSparkling2Line,
} from "react-icons/ri";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex gap-3">
          {user ? (
            <>
              <Button variant={"ghost"} asChild>
                <Link href="https://youtube.com">
                  <RiExternalLinkLine className="mr-2" /> YouTube
                </Link>
              </Button>
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 ">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight my-12">
            Spend less time
            <br />
            on YouTube
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            StudyTube makes it easy to create smart video summaries, remove
            distractions and focus on learning.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link
              target="_blank"
              href="https://chromewebstore.google.com/detail/studytube-youtube-product/fejkjeggadgppepeoemfbebnmanikmlb"
            >
              <FaChrome className="mr-2 h-4 w-4" /> Add to Chrome
            </Link>
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-left">
            <div className="flex justify-left mb-4">
              <RiSparkling2Line className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart summaries</h3>
            <p className="text-gray-600 text-sm">
              Concise summaries of videos with key points and timestamps
            </p>
          </div>
          <div className="text-left">
            <div className="flex justify-left mb-4">
              <RiFocusMode className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">Zero distractions</h3>
            <p className="text-gray-600 text-sm">
              Hide your home page, recommended videos, comments and more
            </p>
          </div>
          <div className="text-left">
            <div className="flex justify-left mb-4">
              <RiHeadphoneFill className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">Zen mode</h3>
            <p className="text-gray-600 text-sm">
              Focus on the video player with a clean and minimal interface
            </p>
          </div>
        </div>

        {/* Screenshot Section */}
        <Card className="mb-16">
          <CardContent className="p-0">
            <video
              controls
              className="w-full h-auto rounded-lg shadow-lg"
              width="2481"
              height="1626"
              muted
            >
              <source src="/studytube.mp4" type="video/mp4" />
            </video>
          </CardContent>
        </Card>

        {/* Environment Design Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Optimise your YouTube
              <br />
              experience for studying
            </h2>
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              In Atomic Habits, James Clear describes a strategy called
              environment design that involves changing your surroundings to
              make good habits easier and bad habits more difficult.
            </p>
            <p className="text-gray-600">
              You can design your YouTube environment to make it easier to focus
              on learning with StudyTube.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Get started now</h2>
          <p className="text-gray-600 mb-8">
            Stop getting lost in YouTube rabbit holes and get studying with
            StudyTube.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link
              target="_blank"
              href="https://chromewebstore.google.com/detail/studytube-youtube-product/fejkjeggadgppepeoemfbebnmanikmlb"
            >
              <FaChrome className="mr-2 h-4 w-4" /> Add to Chrome
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
