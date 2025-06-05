import { useList } from "@/hooks/use-list";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function ListSidebar({
  selectedListEndpoint,
}: {
  selectedListEndpoint: string | null;
}) {
  const listQuery = useList(selectedListEndpoint ?? undefined);

  if (selectedListEndpoint === null && !listQuery.isLoading) {
    return <>No Data</>;
  }

  if (listQuery.isLoading) {
    return <>Loading...</>;
  }

  const buttonClasses = [
    // layout
    "w-full mb-1",
    // color
    "bg-transparent text-inherit",
    // selectors
    "hover:bg-secondary",
  ];

  return (
    <div className="flex flex-col w-[224px] max-h-[100svh] overflow-y-auto">
      {listQuery.data.map(({ url, name }: { url: string; name: string }) => {
        return (
          <Button key={url} className={cn(buttonClasses)}>
            {name}
          </Button>
        );
      })}
    </div>
  );
}
