import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { QUERY_CLIENT } from "./lib/query-client";
import { HttpProvider } from "./api/http.provider";

function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <HttpProvider>{children}</HttpProvider>
    </QueryClientProvider>
  );
}

function App({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>;
}

export default App;
