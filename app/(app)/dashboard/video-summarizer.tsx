"use client";

import { Summary } from "./summary";

export const VideoSummarizer = (props: {
  video: { id: string; snippet: { title: string; channelTitle: string } };
  transcript: { text: string; offset: number }[];
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg shadow border">
      {/* Main Video Section */}
      <div className="lg:col-span-2">
        {/* Video Player */}
        <div className="relative bg-black aspect-video w-full rounded-lg mb-3">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 bg-gray-100">
            {props.video.id ? (
              <iframe
                src={`https://www.youtube.com/embed/${props.video.id}`}
                id="youtube-player"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Enter a YouTube URL to get started
              </div>
            )}
          </div>
        </div>

        {/* Video Title and Controls */}
        <h1 className="text-xl font-semibold">{props.video.snippet.title}</h1>
        <p className="text-muted-foreground">
          {props.video.snippet.channelTitle}
        </p>
      </div>
      <div>
        {/* Action Buttons */}
        {/* <div className="flex items-center justify-between mb-6">
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
        </div> */}

        {/* Summary Sections */}
        <div className="space-y-6">
          <Summary video={props.video} transcript={props.transcript} />
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
