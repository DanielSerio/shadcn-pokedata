import { BASE_URL } from "@/api/http.provider";

export function endpointToRoute(url: string): string {
  const path = url.replace(BASE_URL, '/');

  return path as string;
}