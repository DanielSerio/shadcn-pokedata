import type { ListItem } from "@/hooks/use-list";
import type { AxiosInstance } from "axios";

export function getListFn(http: AxiosInstance) {
  return async function getList(url: string) {
    const response = await http.get(`${url}?limit=10000`);

    return response.data.results as ListItem[];
  };
}