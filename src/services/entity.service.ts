import type { AxiosInstance } from "axios";

export function getEntityFn<T>(http: AxiosInstance) {
  return async function getEntity(url: string) {
    const response = await http.get(url);

    return response.data as T;
  };
}