"use client"

import { SessionProvider } from "next-auth/react"
<<<<<<< HEAD
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"


function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,       // 5 minutes — data is "fresh" for this long
        gcTime: 1000 * 60 * 30,          // 30 minutes — cache kept in memory
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });
}

// Module-level singleton — survives component re-renders & React Compiler optimizations
let browserQueryClient = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always create a new client (no sharing across requests)
    return makeQueryClient();
  }
  // Browser: reuse the same client (true singleton)
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function Providers({children}){
    const queryClient = getQueryClient();
    return(
    <SessionProvider>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
=======


export default function Providers({children}){
    return(
    <SessionProvider>
        {children}
>>>>>>> ce95edb81eabee8d726dafaf06f7fc22d11154f6
    </SessionProvider>
    )
}