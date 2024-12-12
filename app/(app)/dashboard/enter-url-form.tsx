import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export const EnterUrlForm = (props: { url?: string }) => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const url = formData.get("url") as string;

    redirect("/" + url);
  };
  return (
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'formData' implicitly has an 'any' type.
    <form action={handleSubmit} className="flex gap-2">
      <Input
        name="url"
        type="text"
        placeholder="Enter YouTube video URL"
        defaultValue={props.url}
      />
      <Button type="submit" variant={"default"}>
        Load video
      </Button>
    </form>
  );
};
