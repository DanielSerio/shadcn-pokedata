import { useHttp } from "@/api/http.provider";
import { getListFn } from "@/services/list.service";
import { useQuery } from "@tanstack/react-query";

export interface ListItem {
  name: string;
  url: string;
}

export function useList(selectedListEndpoint?: string) {
  const http = useHttp();
  const url = `${selectedListEndpoint}?limit=10000`.replace(/^\//, "");

  const getList = getListFn(http);

  return useQuery({
    enabled: !!http && !!selectedListEndpoint,
    queryKey: [selectedListEndpoint, "list"],
    async queryFn() {
      return await getList(url);
    },
  });
}
