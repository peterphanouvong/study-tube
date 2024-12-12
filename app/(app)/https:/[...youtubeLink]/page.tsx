export default function SummarizeYoutubeVideo(props: {
  searchParams: { v: string };
  params: { youtubeLink: string[] };
}) {
  return (
    <div>
      <h1>Summarize Youtube Video</h1>
      {props.searchParams.v}
      {JSON.stringify(props.params.youtubeLink)}
      <p>Here is your secret content</p>
    </div>
  );
}
