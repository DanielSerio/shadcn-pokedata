import { HTTP } from "@/api/http.provider";
import { Button } from "@/components/ui/button";
import { endpointToRoute } from "@/lib/endpoint";
import { cn } from "@/lib/utils";
import { getListFn } from "@/services/list.service";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/$path")({
  loader: ({ context: { queryClient }, params: { path } }) => {
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: [path, "list"],
        queryFn: () => getListFn(HTTP)(`${path}`),
      })
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const path = Route.useParams().path;
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(
    queryOptions({
      queryKey: [path, "list"],
      queryFn: () => getListFn(HTTP)(`${path}`),
    })
  );

  const buttonClasses = [
    // layout
    "w-full mb-1",
    // color
    "bg-transparent text-inherit",
    // selectors
    "hover:bg-secondary",
  ];

  return (
    <div className="relative flex w-full h-full">
      <ul
        style={{ maxHeight: "100svh" }}
        className="relative flex flex-col min-w-[248px] h-[100%]  overflow-y-auto"
      >
        {data.map(({ name, url }) => (
          <li key={url}>
            <Button
              className={cn(buttonClasses)}
              onClick={() =>
                navigate({
                  to: endpointToRoute(url),
                })
              }
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
