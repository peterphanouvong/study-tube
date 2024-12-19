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
      <nav className="flex justify-between items-center p-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="md:text-xl tracking-tighter font-bold font-spaceGrotesk"
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
        <div className="flex flex-col md:flex-row gap-12 md:mt-32">
          <div className="text-left pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="md:text-xl">5.0</div>
              <div className="flex items-center gap-1">
                <RiStarFill className="md:w-5 md:h-5" />
                <RiStarFill className="md:w-5 md:h-5" />
                <RiStarFill className="md:w-5 md:h-5" />
                <RiStarFill className="md:w-5 md:h-5" />
                <RiStarFill className="md:w-5 md:h-5" />
              </div>
            </div>
            <h1 className="text-4xl md:text-[80px] md:leading-none font-bold tracking-tighter mb-9 font-spaceGrotesk">
              Stop <span className="text-blue-500">wasting</span> your
              <br /> time on YouTube
            </h1>
            <p className="text-gray-600 mb-9 max-w-lg text-left md:text-lg">
              StudyTube makes it easy to create{" "}
              <span className="text-blue-600 font-semibold">
                smart video summaries
              </span>
              ,{" "}
              <span className="text-blue-600 font-semibold">
                remove distractions
              </span>{" "}
              and focus on learning.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 md:h-12 md:text-xl"
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
              className="w-[532px] h-auto hidden md:block"
              width={2000}
              height={2000}
            />
            <Image
              src="/studytube-hero-2.jpeg"
              alt="StudyTube"
              className="w-full h-auto md:hidden rounded-xl"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="md:mt-48 mt-32">
          <div className="md:flex justify-between mb-12">
            <h2 className="text-3xl md:text-5xl mb-2 md:mb-0 tracking-tighter font-spaceGrotesk font-bold">
              Get more from less.
            </h2>

            <p className="md:max-w-xs md:text-xl">
              Save time by generating concise AI summaries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-2xl md:col-span-2 p-6 md:p-10">
              <video
                className="w-full rounded-2xl mb-11"
                controls
                loop
                autoPlay
                src="/generate-summary.mp4"
              />
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-xl md:text-3xl font-bold mb-4 font-spaceGrotesk">
                  Turn a one hour video into
                  <br />a one minute summary
                </h3>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 md:h-12 md:text-xl"
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
            <div className="border rounded-2xl p-6 md:p-10">
              <div className="w-full md:h-[300px] flex items-center justify-center mb-11">
                <Image src="/tldr.png" alt="TLDR" width={1000} height={1000} />
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 font-spaceGrotesk">
                Get a TLDR
              </h3>
              <p className="md:text-xl">
                Get straight to the point with a TLDR
              </p>
            </div>
            <div className="border rounded-2xl p-6 md:p-10">
              <div className="w-full md:h-[300px] flex items-center justify-center mb-11">
                <Image
                  src="/timestamp.png"
                  alt="Timestamps"
                  className="border rounded-2xl shadow"
                  width={1000}
                  height={1000}
                />
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 font-spaceGrotesk">
                Skip to key moments
              </h3>
              <p className="md:text-xl">
                Use timestamps to skip to specific sections
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 md:mt-48">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <h2 className="text-3xl md:text-5xl mb-2 md:mb-0 tracking-tighter font-spaceGrotesk font-bold">
              Design your YouTube.
            </h2>

            <p className="md:max-w-xs md:text-xl">
              Hide your home page, recommended videos, comments and more
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-2xl md:col-span-2 p-6 md:p-10">
              <video
                className="w-full rounded-2xl mb-11"
                controls
                loop
                autoPlay
                src="/remove-distractions.mp4"
              />
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-xl md:text-3xl font-bold mb-4 font-spaceGrotesk">
                  Remove all the distractions
                </h3>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 md:h-12 md:text-xl"
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
            <div className="border rounded-2xl p-6 md:p-10">
              <div className="w-full md:h-[300px] flex items-center justify-center mb-11">
                <Image
                  src="/focus-modes.png"
                  alt="Focus modes"
                  width={1000}
                  height={1000}
                />
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 font-spaceGrotesk">
                Focus modes
              </h3>
              <p className="md:text-xl">Get locked-in with focus modes</p>
            </div>
            <div className="border rounded-2xl p-6 md:p-10">
              <div className="w-full md:h-[300px] flex items-center justify-center mb-11">
                <Image
                  src="/custom-settings.png"
                  alt="Custom settings"
                  className="border rounded-2xl shadow h-full w-auto"
                  width={1000}
                  height={1000}
                />
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 font-spaceGrotesk">
                Custom settings
              </h3>
              <p className="md:text-xl">Choose what you want to see</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-36 md:mt-60 mb-20">
          <h2 className="text-3xl md:text-5xl tracking-tighter font-spaceGrotesk font-bold mb-6">
            Get started now
          </h2>
          <p className="text-gray-600 mb-8">
            Optimise your YouTube experience with StudyTube
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 md:h-12 md:text-xl"
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
