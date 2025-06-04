import { useDirectory } from "@/hooks/useDirectory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const directory = useDirectory();

  return <div className="p-2">{JSON.stringify(directory.data)}</div>;
}
