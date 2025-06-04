import { useDirectory } from "@/hooks/use-directory";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import type { DirectoryResponse } from "@/api/root-endpoints.types";
import type { MouseEvent } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const directoryQuery = useDirectory();

  const handleClick = (event: MouseEvent) => {
    console.info(event.target);

    const target = event.target as HTMLElement;

    if (target.dataset.url && target.tagName === "BUTTON") {
      console.info(target.dataset.url);
    }
  };

  const buttonClasses = [
    // layout
    "w-full mb-1",
    // color
    "bg-transparent text-inherit",
    // selectors
    "hover:bg-secondary",
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <div onClick={handleClick}>
          {!directoryQuery.isLoading &&
            directoryQuery.data &&
            Object.keys(directoryQuery.data).map((key: string) => {
              return (
                <Button
                  key={key}
                  className={cn(buttonClasses)}
                  data-url={directoryQuery.data[key as keyof DirectoryResponse]}
                >
                  {key}
                </Button>
              );
            })}
        </div>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
