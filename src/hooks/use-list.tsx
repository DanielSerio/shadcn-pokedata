import { useHttp } from "@/api/http.provider";
import { useQuery } from "@tanstack/react-query";

export interface ListItem {
  name: string;
  url: string;
}

export function useList(selectedListEndpoint?: string) {
  const http = useHttp();
  const url = `${selectedListEndpoint}?limit=10000`.replace(/^\//, "");

  return useQuery({
    enabled: !!http && !!selectedListEndpoint,
    queryKey: [selectedListEndpoint, "list"],
    async queryFn() {
      const response = await http.get(url);

      return response.data.results as ListItem[];
    },
  });
}
