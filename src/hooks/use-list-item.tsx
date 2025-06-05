import { useHttp } from "@/api/http.provider";
import { getEntityFn } from "@/services/entity.service";
import { useQuery } from "@tanstack/react-query";

export function useListItem<T>(selectedListEndpoint?: string, id?: string) {
  const http = useHttp();
  const url = `${selectedListEndpoint}/${id}`;

  const getEntity = getEntityFn<T>(http);

  return useQuery({
    enabled: !!http && !!selectedListEndpoint && !!id,
    queryKey: [selectedListEndpoint, id],
    async queryFn() {
      return await getEntity(url);
    },
  });
}
