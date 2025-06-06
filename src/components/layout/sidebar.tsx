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
import { useNavigate, useRouterState } from "@tanstack/react-router";

export function AppSidebar() {
  const directoryQuery = useDirectory();
  const [filterInputValue, setFilterInputValue] = useState("");
  const filterValue = useDebounced(filterInputValue);
  const navigate = useNavigate();
  const routerState = useRouterState();

  const urlPath =
    routerState.resolvedLocation?.pathname ?? routerState.location.pathname;

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
      navigate({
        to: `${target.dataset.url}`,
      });
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

  const activePathKeys = urlPath.replace(/^\//, "").split(/\//g);

  return (
    <Sidebar
      collapsible="none"
      style={{ height: "100svh", position: "fixed", width: 260 }}
    >
      <SidebarHeader>
        <SearchInput
          placeholder="Filter"
          value={filterInputValue}
          onChange={handleFilterChange}
        />
      </SidebarHeader>
      <SidebarContent style={{ height: "calc(100svh - 52px)" }}>
        <SidebarGroup>
          <div onClick={handleClick}>
            {!directoryQuery.isLoading &&
              directoryQuery.data &&
              getFilteredSet(filterValue, Object.keys(directoryQuery.data)).map(
                (key: string) => {
                  return (
                    <Button
                      key={key}
                      className={cn(
                        buttonClasses,
                        activePathKeys.includes(
                          directoryQuery.data[
                            key as keyof DirectoryResponse
                          ].replace(/\//g, "")
                        )
                          ? "bg-sky-500 text-white"
                          : null
                      )}
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
