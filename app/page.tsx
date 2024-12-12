import { GoogleRegisterButton } from "@/components/google-register-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Chrome, Focus, Video } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold text-xl">StudyTube</span>
        </div>
        <div className="flex gap-3">
          {user ? (
            <>
              <Button variant={"outline"} asChild>
                <Link href="/dashboard">Dashboard</Link>
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
          <h1 className="text-7xl font-bold mb-4 tracking-tight">
            Spend less time
            <br />
            on YouTube
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            StudyTube makes it easy to create smart video summaries, remove
            distractions and focus on learning.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Chrome className="mr-2 h-4 w-4" /> Add to Chrome
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Video className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart summaries</h3>
            <p className="text-gray-600 text-sm">
              Concise summaries of videos with key points and timestamps
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Focus className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">Zero distractions</h3>
            <p className="text-gray-600 text-sm">
              Hide your home page, recommended videos, comments and more
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Chrome className="w-8 h-8 text-indigo-600" />
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
            <img
              src="/api/placeholder/800/450"
              alt="StudyTube Interface"
              className="w-full rounded-lg"
            />
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
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            Start Studying
          </Button>
        </div>
      </main>
    </div>
  );
}
