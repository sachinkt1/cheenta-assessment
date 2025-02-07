import "@/styles/globals.css";
import ToasterProvider from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <ToasterProvider />
            <SessionProvider session={pageProps.session}>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </ApolloProvider>
    );
}
