import { useMemo } from "react";
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // Disable during SSR
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:5002/graphql",
            credentials: "include", // Adjust if needed
        }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState: any = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === "undefined") return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: any) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
