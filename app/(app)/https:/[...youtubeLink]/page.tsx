import { YoutubeTranscript } from "youtube-transcript";
import { EnterUrlForm } from "../../dashboard/enter-url-form";
import { VideoSummarizer } from "../../dashboard/video-summarizer";

export default async function SummarizeYoutubeVideo(props: {
  searchParams: { v: string };
  params: { youtubeLink: string[] };
}) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${props.searchParams.v}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  ).then((res) => res.json());

  const rawTranscript = await YoutubeTranscript.fetchTranscript(
    props.searchParams.v
  );
  const alteredTranscript = rawTranscript.map((transcript) => {
    return {
      offset: transcript.offset,
      text: transcript.text,
    };
  });

  return (
    <div>
      <EnterUrlForm
        url={props.params.youtubeLink + "?v=" + props.searchParams.v}
      />
      <div className="my-4">
        <VideoSummarizer
          transcript={alteredTranscript}
          video={response.items[0]}
        />
      </div>
    </div>
  );
}
