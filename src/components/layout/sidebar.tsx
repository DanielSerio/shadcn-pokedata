import { useDirectory } from "@/hooks/use-directory";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import type { DirectoryResponse } from "@/api/root-endpoints.types";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SearchInput } from "../controls/SearchInput";
import { useDebounced } from "@/hooks/use-debounced";

export function AppSidebar() {
  const directoryQuery = useDirectory();
  const [filterInputValue, setFilterInputValue] = useState("");
  const filterValue = useDebounced(filterInputValue);

  const getFilteredSet = (text: string, links: string[]) => {
    return links.filter((link) =>
      `${link}`.toLowerCase().startsWith(`${text}`.toLowerCase())
    );
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterInputValue(e.target.value);

  const handleClick = (event: MouseEvent) => {
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
      <SidebarHeader>
        <SearchInput
          placeholder="Filter"
          value={filterInputValue}
          onChange={handleFilterChange}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div onClick={handleClick}>
            {!directoryQuery.isLoading &&
              directoryQuery.data &&
              getFilteredSet(filterValue, Object.keys(directoryQuery.data)).map(
                (key: string) => {
                  return (
                    <Button
                      key={key}
                      className={cn(buttonClasses)}
                      data-url={
                        directoryQuery.data[key as keyof DirectoryResponse]
                      }
                    >
                      {key}
                    </Button>
                  );
                }
              )}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
