import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="pl-[260px] max-w-[100svw]">
          <Outlet />
        </main>
      </SidebarProvider>
    );
  },
});
