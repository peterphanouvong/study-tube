import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NextRequest } from "next/server";
import { z } from "zod";

const Section = z.object({
  title: z.string(),
  text: z.string(),
  timestamp: z.number(),
});
const Completion = z.object({
  sections: z.array(Section),
});

// Allow streaming responses up to 30 seconds

export async function POST(req: NextRequest) {
  const transcript = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const youtuber = searchParams.get("youtuber");
  const result = streamObject({
    model: openai("gpt-4o-mini"),
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
          JSON.stringify(transcript),
      },
    ],
    schema: Completion,
    // response_format: zodResponseFormat(Completion, "completion"),
  });

  return result.toTextStreamResponse();
}

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

  --
  Step 5: Highlight the most important information.
  
  When generating the text for each section, make sure to highlight the most important information. This will help the reader quickly understand the main points of the video.
  You can highlight the text by using the Markdown syntax "<mark>text</mark>".


Your response should be in this format:
{
  sections: {
   title: string, // the title of the section
   text: string, // the summary of the section in markdown format
   timestamp: number //the number of seconds from the start of the video that this section corresponds with
  }[]
}

The first section should be a TLDR (Too Long, Didn't Read) summary of the video that covers the main point of the video in one or two sentences.
`;
