import { HTTP } from "@/api/http.provider";
import { JSONViewer } from "@/components/display/JSONViewer/JSONViewer";
import { getEntityFn } from "@/services/entity.service";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$path/$id")({
  loader: ({ context: { queryClient }, params: { path, id } }) => {
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: [path, id],
        queryFn: () => getEntityFn(HTTP)(`${path}/${id}`),
      })
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { path, id } = Route.useParams();

  const { data, isLoading } = useSuspenseQuery(
    queryOptions({
      queryKey: [path, id],
      queryFn: () =>
        getEntityFn<object & Record<string, any>>(HTTP)(`${path}/${id}`),
    })
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return <JSONViewer json={data} />;
}
