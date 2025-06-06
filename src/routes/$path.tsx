import { HTTP } from "@/api/http.provider";
import { LinkButton } from "@/components/navigation/LinkButton";
import { Skeleton } from "@/components/ui/skeleton";
import { getListFn } from "@/services/list.service";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
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
  const routerState = useRouterState();
  const path = Route.useParams().path;
  const navigate = useNavigate();
  const { data, isLoading } = useSuspenseQuery(
    queryOptions({
      queryKey: [path, "list"],
      queryFn: () => getListFn(HTTP)(`${path}`),
    })
  );

  const activeUrl =
    routerState.resolvedLocation?.pathname ?? routerState.location.pathname;

  return (
    <div className="relative flex w-full h-full">
      <ul
        style={{ maxHeight: "100svh" }}
        className="relative flex flex-col min-w-[248px] h-[100%]  overflow-y-auto"
      >
        {!data &&
          isLoading &&
          [...new Array(5)].map((_, i) => {
            return (
              <li key={i}>
                <Skeleton className="h-[36px] w-full rounded" />
              </li>
            );
          })}
        {data.map(({ name, url }) => (
          <li key={url}>
            <LinkButton
              navigate={navigate}
              name={name}
              activeUrl={activeUrl}
              url={url}
            />
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
