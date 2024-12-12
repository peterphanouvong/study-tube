import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parse } from "best-effort-json-parser";
import { Clock } from "lucide-react";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { useEffect, useState } from "react";
import { RiSparkling2Line } from "react-icons/ri";
import Markdown from "react-markdown";
import { z } from "zod";

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
  const [summary, setSummary] = useState({
    sections: [],
  });
  const [player, setPlayer] = useState(null);

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

  const updateAndStreamSummary = async ({ youtuber }: { youtuber: string }) => {
    const tempResponse = {
      feature_flags: {
        openaikey: {
          v: process.env.OPENAI_KEY,
        },
      },
    };
    const openAiApiKey = tempResponse.feature_flags.openaikey.v;
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: openAiApiKey,
    });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful transcript summarizing assistant. You receive Youtube transcripts and you are tasked with summarizing them.`,
        },
        {
          role: "user",
          content:
            `The youtuber in the video is ${youtuber}` +
            INSTRUCTIONS +
            JSON.stringify(props.transcript),
        },
      ],
      response_format: zodResponseFormat(Completion, "completion"),
      stream: true,
    });

    let summary = "";

    for await (const chunk of stream) {
      summary += chunk.choices[0]?.delta?.content || "";
      setSummary(parse(summary));
    }
  };

  return (
    <div>
      {!summary?.sections?.length && (
        <Button
          onClick={() =>
            updateAndStreamSummary({
              youtuber: props.video.snippet.channelTitle,
            })
          }
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <RiSparkling2Line className="mr-2" />
          Summarize
        </Button>
      )}

      <ScrollArea className="h-[520px] overflow-auto relative">
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="space-y-4 ">
          {summary?.sections?.map(
            (
              section: {
                title: string;
                timestamp: number;
                text: string;
              },
              idx
            ) => {
              return (
                <div key={idx}>
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                      {section.timestamp > 0 && (
                        <CardDescription>
                          <Button
                            onClick={skipToTimestamp.bind(
                              null,
                              section.timestamp
                            )}
                            className="bg-transparent p-0 flex items-center"
                            variant={"link"}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {new Date(section.timestamp * 1000)
                              .toISOString()
                              .slice(11, 19)}
                          </Button>
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardContent className="markdown-body text-sm">
                      <Markdown>{section.text}</Markdown>
                    </CardContent>
                  </Card>
                </div>
              );
            }
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10" />
      </ScrollArea>
    </div>
  );
};

const INSTRUCTIONS = `
  You will receive an array of JSON Objects as input.
Each JSON object contains data about a section of a YouTube video transcript.

The data has this schema:
{
  text: string, // the caption from the video
  offset: number // the number of seconds from the beginning of the video where the text is said
}

Your task is to summarize the YouTube video transcript into sections.

Here is a formatting guide for your summary. 

Step 1: Start every section with a single-sentence opener.

  When you open each area of your work with a single sentence you:

  • Keep readers interested
  • Make things easier to read
  • Subconsciously encourage them to continue

  Here are the 6 most effective openers:

  • Open with a moment in time
  • Open with a vulnerable statement
  • Open with a controversial opinion
  • Open with a weird, unique insight
  • Open with a thought-provoking question
  • Open with 1 strong, declarative sentence

  These are my go-to proven ways of hooking the reader.

  --
  Step 2: Always look for opportunities to turn long paragraphs into bulleted lists.

  If you are:

  • Listing anything, ever, or,
  • Rambling off a dozen quick examples, or,
  • Making a series of distinct points to drive home a point

  ...make it into a bulleted list.

  (Like this!)

  --
  Step 3: Where are your subheads?

  Subheads are bolded sentences that help the reader more easily follow your line of thinking.

  • They split the page up evenly
  • They offer big, bolded “milestones”
  • They help the reader identify where they’re going

  Subheads give clarity.

  --
  Step 4: Use the 1/3/1 writing rhythm.

  1/3/1 is a cadence that makes it easy for readers to fall into your writing. The first and last sentences read like candy. But the middle paragraph is where the value is.

  You can also use:

  • 1/4/1
  • 1/5/1
  • 1/2/5/2/1
  • Etc.

  The key to injecting skimmability into your writing is alternating the length of sentences and sections.

  --
  In all your formatting choices, your primary concern should always be:

  "How can I make this easier for the reader?"

  • Is a bulleted list easiest? Do that.
  • Is a step-by-step guide easiest? Do that.
  • Is a series of small, rapid-fire sections easiest? Do that.

  Your North Star is the reader's enjoyment.

Your response should be in this format:
{
  sections: {
   title: string, // the title of the section
   text: string, // the summary of the section in markdown format
   timestamp: number //the number of seconds from the start of the video that this section corresponds with
  }[]
}

The first section should be a TLDR (Too Long, Didn't Read) summary of the video that covers the main points of the video in a few sentences.
`;
