import "@/styles/globals.css";
import ToasterProvider from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <ToasterProvider />
            <SessionProvider session={pageProps.session}>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </>
  );
}
