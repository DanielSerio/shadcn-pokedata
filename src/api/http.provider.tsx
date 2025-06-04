import axios from "axios";
import { createContext, useContext, type PropsWithChildren } from "react";

export const BASE_URL = `https://pokeapi.co/api/v2/`;

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const HttpContext = createContext(http);

/**
 * Provides an HTTP context.
 */
export const HttpProvider = ({ children }: PropsWithChildren) => {
  return <HttpContext.Provider value={http}>{children}</HttpContext.Provider>;
};

/**
 * Provides access to HttpContext.
 */
export const useHttp = () => useContext(HttpContext);
