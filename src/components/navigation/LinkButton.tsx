import type { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { useNavigate } from "@tanstack/react-router";
import { endpointToRoute } from "@/lib/endpoint";

export interface LinkButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  url: string;
  activeUrl: string;
  navigate: ReturnType<typeof useNavigate>;
}

export function LinkButton({
  name,
  url,
  activeUrl,
  navigate,
}: LinkButtonProps) {
  const route = endpointToRoute(url);
  const buttonClasses = [
    // layout
    "w-full mb-1",
    // color
    "bg-transparent text-inherit",
    // selectors
    "hover:bg-secondary",
  ];

  return (
    <Button
      className={cn(
        buttonClasses,
        `${activeUrl}/`.includes(route) ? "bg-sky-500 text-white" : null
      )}
      onClick={() =>
        navigate({
          to: route,
        })
      }
    >
      {name}
    </Button>
  );
}
