/** @format */

import type {AppProps} from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import AppContextProvider from '../components/Providers/AppContextProvider';
import UrqlContextProvider from '../components/Providers/UrqlContextProvider';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <div className="min-h-screen text-slate-50 bg-slate-800">
            <Head>
                <title>RAG</title>
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/android-chrome-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="512x512"
                    href="/android-chrome-512x512.png"
                />

                <link
                    rel="manifest"
                    href="/manifest.json"
                />
                <meta
                    name="theme-color"
                    content="#ffffff"
                />
            </Head>
            <UrqlContextProvider>
                <AppContextProvider>
                    <Component {...pageProps} />
                </AppContextProvider>
            </UrqlContextProvider>
        </div>
    );
}

export default MyApp;
