import { BASE_URL } from "@/api/http.provider";
import type { Directory } from "@/api/root-endpoints.types";

export type EndpointRoute<Endpoint extends keyof Directory, ID extends string | undefined> = ID extends string ? `/${Endpoint}/${ID}` : `/${Endpoint}`;
export function endpointToRoute<Endpoint extends keyof Directory, ID extends string | undefined>(url: string): EndpointRoute<Endpoint, ID> {
  const path = url.replace(BASE_URL, '/');

  return path as EndpointRoute<Endpoint, ID>;
}