"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { experimental_useObject as useObject } from "ai/react";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RiSparkling2Line } from "react-icons/ri";
import Markdown from "react-markdown";
import { z } from "zod";
import rehypeRaw from "rehype-raw";

const Section = z.object({
  title: z.string(),
  text: z.string(),
  timestamp: z.number(),
});
const Completion = z.object({
  sections: z.array(Section),
});

export const Summary = (props: {
  video: { id: string; snippet: { title: string; channelTitle: string } };
  transcript: { text: string; offset: number }[];
}) => {
  const [player, setPlayer] = useState(null);

  const { object: summary, submit } = useObject({
    api: "/api/summarize?youtuber=" + props.video.snippet.channelTitle,
    schema: Completion,
  });

  useEffect(() => {
    // Create script tag for YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    // @ts-expect-error dw lol
    window.onYouTubeIframeAPIReady = () => {
      // @ts-expect-error dw lol
      new window.YT.Player("youtube-player", {
        videoId: props.video.id,
        events: {
          // @ts-expect-error dw lol
          onReady: (event) => {
            setPlayer(event.target);
          },
        },
      });
    };
  }, [props.video.id]);

  const skipToTimestamp = (seconds: number) => {
    if (player) {
      // @ts-expect-error dw lol
      player.seekTo(seconds, true);
      // @ts-expect-error dw lol
      player.playVideo();
    } else {
      // Fallback to URL parameter method if player isn't initialized
      const iframe = document.querySelector("iframe");
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${props.video.id}?start=${seconds}&autoplay=1`;
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readingTime = useMemo(() => {
    const wordCount =
      summary?.sections?.reduce((acc, section) => {
        return acc + (section?.text ? section.text.split(" ").length : 0);
      }, 0) || 0;

    return Math.ceil(wordCount / 200);
  }, [summary]);

  return (
    <div>
      <div className="py-4">
        {readingTime > 0 && (
          <span className="text-muted-foreground text-sm">
            {readingTime} min read
          </span>
        )}
      </div>
      <div className="min-w-[400px] max-w-xl">
        {!summary?.sections?.length && (
          <Button
            onClick={() => submit(JSON.stringify(props.transcript))}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <RiSparkling2Line className="mr-2" />
            Summarize
          </Button>
        )}

        <ScrollArea className="h-[520px] overflow-auto relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10" />
          <div className="space-y-4 ">
            {summary?.sections?.map((section, idx) => {
              return (
                <div key={idx}>
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{section?.title}</CardTitle>
                      <CardTimestamp
                        skipToTimestamp={skipToTimestamp}
                        timestamp={section?.timestamp}
                      />
                    </CardHeader>

                    <CardContent className="markdown-body text-sm">
                      <Markdown rehypePlugins={[rehypeRaw]}>
                        {section?.text}
                      </Markdown>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10" />
        </ScrollArea>
      </div>
    </div>
  );
};

const CardTimestamp = (props: {
  timestamp?: number;
  skipToTimestamp: (seconds: number) => void;
}) => {
  if (!props?.timestamp) return null;
  return (
    <CardDescription>
      <Button
        onClick={props.skipToTimestamp.bind(null, props.timestamp)}
        className="bg-transparent p-0 flex items-center"
        variant={"link"}
      >
        <Clock className="h-4 w-4 mr-2" />
        {new Date(props.timestamp * 1000).toISOString().slice(11, 19)}
      </Button>
    </CardDescription>
  );
};
