"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, List, MoreHorizontal, Share2, Sparkles } from "lucide-react";
export const VideoSummarizer = (props: { youtubeLink: string }) => {
  const handleSummarize = () => {
    console.log("Summarizing video...", props);
    // check how many summaries the user has left
    // if not enough, then show the pricing page / popup
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg shadow border">
      {/* Main Video Section */}
      <div className="lg:col-span-2">
        {/* Video Player */}
        <div className="relative bg-black aspect-video w-full rounded-lg mb-4">
          {/* <img
            src="/api/placeholder/800/450"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center text-white">
              <span className="text-sm">0:01 / 2:26:12</span>
            </div>
          </div>
        </div>

        {/* Video Title and Controls */}
        <h1 className="text-xl font-semibold mb-4">
          30 Years of Business Knowledge in 2hrs 26mins
        </h1>
      </div>
      <div>
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Tabs defaultValue="funny">
              <TabsList>
                <TabsTrigger value="funny" className="text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Funny
                </TabsTrigger>
                <TabsTrigger value="list" className="text-sm">
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
                <TabsTrigger value="auto" className="text-sm">
                  Auto
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Sections */}
        <div className="space-y-6">
          <Button
            onClick={handleSummarize}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Summarize
          </Button>
          {/* <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">
                Stairway to Heaven (and PR)
              </h2>
              <p className="text-gray-700 mb-4">
                🪜 Who knew a $26,000 staircase could be your ticket to the
                front page of BBC and NYT? It's like buying a ladder to climb
                the PR mountain!
              </p>
              <p className="text-gray-700">
                🔔 Turns out, the secret to free PR is just a doorbell away –
                press for dreams, get 4 million followers, and watch the media
                come running!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-3">
                Local Heroes and Twitter Tactics
              </h2>
              <p className="text-gray-700 mb-4">
                🍒 When life gives you cherries, sell them on the street and
                call the local paper – it's the small-town Pulitzer waiting to
                happen!
              </p>
              <p className="text-gray-700">
                🌐 Journalists on Twitter are like rare Pokémon – catch them
                with comments, and you might just evolve into a PR master!
              </p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};
