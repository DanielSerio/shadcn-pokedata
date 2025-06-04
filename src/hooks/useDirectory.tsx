import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/api/http.provider";
import type { DirectoryResponse } from "@/api/root-endpoints.types";

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

      return response.data as DirectoryResponse;
    },
    staleTime: Infinity,
  });
}
