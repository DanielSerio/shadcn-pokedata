import { ListSidebar } from "@/components/layout/ListSidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createRootRoute({
  component: () => {
    const [selectedListEndpoint, setSelectedListEndpoint] = useState<
      null | string
    >(null);

    return (
      <SidebarProvider>
        <AppSidebar selectEndpoint={setSelectedListEndpoint} />
        <ListSidebar selectedListEndpoint={selectedListEndpoint} />
        <main>
          <Outlet />
        </main>
      </SidebarProvider>
    );
  },
});
