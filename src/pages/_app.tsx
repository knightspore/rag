import type {AppProps} from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import AppContextProvider from '../components/Providers/AppContextProvider';
import UrqlContextProvider from '../components/Providers/UrqlContextProvider';
import HeaderIconLinks from '../components/App/HeaderIconLinks';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <div className="min-h-screen text-slate-50 bg-slate-800">
            <Head>
                <title>RAG</title>
                <HeaderIconLinks />
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
