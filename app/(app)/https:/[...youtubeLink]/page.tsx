import { EnterUrlForm } from "../../dashboard/enter-url-form";
import { VideoSummarizer } from "../../dashboard/video-summarizer";

export default function SummarizeYoutubeVideo(props: {
  searchParams: { v: string };
  params: { youtubeLink: string[] };
}) {
  return (
    <div>
      <EnterUrlForm
        url={props.params.youtubeLink + "?v=" + props.searchParams.v}
      />
      {props.searchParams.v}
      {JSON.stringify(props.params.youtubeLink)}
      <VideoSummarizer
        youtubeLink={props.params.youtubeLink + "?v=" + props.searchParams.v}
      />
      <p>Here is your secret content</p>
    </div>
  );
}
