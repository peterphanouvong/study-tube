import { Innertube } from "youtubei.js";
import { EnterUrlForm } from "../../dashboard/enter-url-form";
import { getCanSummarize } from "@/app/actions";
import { VideoSummarizer } from "../../dashboard/video-summarizer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SummarizeYoutubeVideo(props: {
  searchParams: { v: string };
  params: { youtubeLink: string[] };
}) {
  const { getUser } = getKindeServerSession();
  const innertube = await Innertube.create({
    lang: "en",
    retrieve_player: false,
  });
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${props.searchParams.v}&key=${process.env.YOUTUBE_API_KEY}`
  ).then((res) => res.json());

  const fetchTranscript = async (): Promise<
    { offset: string; text: string }[]
  > => {
    try {
      const info = await innertube.getInfo(props.searchParams.v);
      const transcriptData = await info.getTranscript();
      // @ts-expect-error dw lol
      return transcriptData?.transcript?.content?.body?.initial_segments.map(
        (segment) => ({
          offset: parseFloat(segment.start_ms) / 1000,
          text: segment.snippet.text,
        })
      );
    } catch (error) {
      console.error("Error fetching transcript:", error);
      throw error;
    }
  };

  const transcript = await fetchTranscript();
  const user = await getUser();
  const canSummarize = await getCanSummarize(user.id);

  return (
    <div>
      <EnterUrlForm
        url={props.params.youtubeLink + "?v=" + props.searchParams.v}
      />
      <div className="my-4">
        <VideoSummarizer
          // @ts-expect-error dw lol
          transcript={transcript}
          video={response.items[0]}
          canSummarize={canSummarize}
        />
      </div>
    </div>
  );
}
