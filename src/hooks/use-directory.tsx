import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/api/http.provider";
import type { DirectoryResponse } from "@/api/root-endpoints.types";
import { mapObjectValues } from "@/lib/object.utils";
import { endpointToRoute } from "@/lib/endpoint";

/**
 * Fetches directory data.
 * @returns directory {@link DirectoryResponse}
 */
export function useDirectory() {
  const http = useHttp();

  return useQuery({
    queryKey: ["directory"],
    async queryFn() {
      const response = await http.get("/");

      return mapObjectValues(response.data as DirectoryResponse, (value) =>
        endpointToRoute(value)
      );
    },
    staleTime: Infinity,
  });
}
