import { GoogleRegisterButton } from "@/components/google-register-button";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { FaChrome } from "react-icons/fa6";
import { RiDashboard3Line, RiStarFill } from "react-icons/ri";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xl tracking-tighter font-bold font-spaceGrotesk"
          >
            StudyTube
          </Link>
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

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex gap-12 mt-32">
          <div className="text-left pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-xl">5.0</div>
              <div className="flex items-center gap-1">
                <RiStarFill className="w-5 h-5" />
                <RiStarFill className="w-5 h-5" />
                <RiStarFill className="w-5 h-5" />
                <RiStarFill className="w-5 h-5" />
                <RiStarFill className="w-5 h-5" />
              </div>
            </div>
            <h1 className="text-5xl md:text-[80px] font-bold tracking-tighter mb-9 font-spaceGrotesk">
              Stop <span className="text-blue-500">wasting</span> your
              <br /> time on YouTube
            </h1>
            <p className="text-gray-600 mb-9 max-w-lg text-left text-lg">
              StudyTube makes it easy to create smart video summaries, remove
              distractions and focus on learning.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 h-12 text-xl"
              asChild
            >
              <Link
                target="_blank"
                href="https://chromewebstore.google.com/detail/studytube-youtube-product/fejkjeggadgppepeoemfbebnmanikmlb"
              >
                <FaChrome className="mr-2 h-4 w-4" /> Try for free!
              </Link>
            </Button>
          </div>

          <div className="flex-1">
            <Image
              src="/studytube-hero.png"
              alt="StudyTube"
              className="w-[532px] h-auto"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-48">
          <div className="flex justify-between mb-12">
            <h2 className="text-5xl tracking-tighter font-spaceGrotesk font-bold">
              Get more from less.
            </h2>

            <p className="max-w-xs text-xl">
              Save time by generating concise AI summaries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-2xl col-span-2 p-10">
              {/* image placeholder */}
              <div className="w-full h-[700px] bg-gray-200 rounded-2xl mb-11"></div>
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold mb-4 font-spaceGrotesk">
                  Turn a one hour video into
                  <br />a one minute summary
                </h3>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 h-12 text-xl"
                  asChild
                >
                  <Link
                    target="_blank"
                    href="https://chromewebstore.google.com/detail/studytube-youtube-product/fejkjeggadgppepeoemfbebnmanikmlb"
                  >
                    <FaChrome className="mr-2 h-4 w-4" /> Try for free!
                  </Link>
                </Button>
              </div>
            </div>
            <div className="border rounded-2xl p-10">
              <div className="w-full h-[400px] bg-gray-200 rounded-2xl mb-11"></div>
              <h3 className="text-3xl font-bold mb-4 font-spaceGrotesk">
                Get a TLDR
              </h3>
              <p className="text-xl">Get straight to the point with a TLDR</p>
            </div>
            <div className="border rounded-2xl p-10">
              <div className="w-full h-[400px] bg-gray-200 rounded-2xl mb-11"></div>
              <h3 className="text-3xl font-bold mb-4 font-spaceGrotesk">
                Skip to key moments
              </h3>
              <p className="text-xl">
                Use timestamps to skip to specific sections
              </p>
            </div>
          </div>
        </div>

        <div className="mt-48">
          <div className="flex justify-between mb-12">
            <h2 className="text-5xl tracking-tighter font-spaceGrotesk font-bold">
              Design your YouTube
            </h2>

            <p className="max-w-md text-xl">
              Hide your home page, recommended videos, comments and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-2xl col-span-2 p-10">
              {/* image placeholder */}
              <div className="w-full h-[700px] bg-gray-200 rounded-2xl mb-11"></div>
              <div className="flex justify-between items-center"></div>
            </div>
            <div className="border rounded-2xl p-10">
              <div className="w-full h-[400px] bg-gray-200 rounded-2xl mb-11"></div>
              <h3 className="text-3xl font-bold mb-4 font-spaceGrotesk">
                Focus modes
              </h3>
              <p className="text-xl">Get locked-in with focus modes</p>
            </div>
            <div className="border rounded-2xl p-10">
              <div className="w-full h-[400px] bg-gray-200 rounded-2xl mb-11"></div>
              <h3 className="text-3xl font-bold mb-4 font-spaceGrotesk">
                Custom settings
              </h3>
              <p className="text-xl">Choose what you want to see</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-60 mb-20">
          <h2 className="text-5xl tracking-tighter font-spaceGrotesk font-bold mb-6">
            Get started now
          </h2>
          <p className="text-gray-600 mb-8">
            Optimise your YouTube experience with StudyTube
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 h-12 text-xl"
            asChild
          >
            <Link
              target="_blank"
              href="https://chromewebstore.google.com/detail/studytube-youtube-product/fejkjeggadgppepeoemfbebnmanikmlb"
            >
              <FaChrome className="mr-2 h-4 w-4" /> Try for free!
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
