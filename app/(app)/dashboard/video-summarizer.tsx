"use client";

import { Summary } from "./summary";

export const VideoSummarizer = (props: {
  video: { id: string; snippet: { title: string; channelTitle: string } };
  transcript: { text: string; offset: number }[];
  canSummarize: boolean;
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6 rounded-lg shadow border">
      {/* Main Video Section */}
      <div className="flex-grow flex-shrink-0">
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

        {/* Summary Sections */}
        <div className="space-y-6">
          <Summary
            video={props.video}
            transcript={props.transcript}
            canSummarize={props.canSummarize}
          />
        </div>
      </div>
    </div>
  );
};
