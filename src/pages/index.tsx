import Head from 'next/head';
import TabbedFeed from '../components/Articles/TabbedFeed';

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <TabbedFeed />
        </>
    );
}
