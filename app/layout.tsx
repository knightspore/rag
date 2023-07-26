/** @format */

import {IBM_Plex_Sans} from 'next/font/google';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import DefaultHead from '../components/Head';
import {Database} from '../lib/supabase';
import {cookies} from 'next/headers';
import './globals.css';
import LoginForm from '../components/LoginForm';
import {Metadata} from 'next';
import SubFeed from '../components/subscriptions/SubFeed';
import {Suspense} from 'react';
import LoadingApp from '../components/LoadingApp';
import UserMenu from '../components/UserMenu';

const ibmplex = IBM_Plex_Sans({
    subsets: ['latin'],
    variable: '--font-ibmplex',
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    title: {
        default: 'RAG | a Modern RSS Feed Reader',
        template: '%s | RAG',
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({cookies});

    const {
        data: {session},
    } = await supabase.auth.getSession();

    return (
        <html lang="en">
            <DefaultHead />
            <body
                className={`text-slate-50 bg-slate-800 ${ibmplex.variable} font-sans`}
            >
                <main>
                    <div className="relative shadow-inner bg-slate-900/50">
                        <div
                            id="shadow"
                            className="fixed absolute top-0 bottom-0 right-0 z-30 w-24 bg-gradient-to-l from-slate-900"
                        />
                        <div className="relative flex items-center p-2 pl-2 overflow-x-auto no-scrollbar gap-2">
                            <UserMenu />
                            <hr className="h-6 mx-2 card" />
                            <SubFeed />
                        </div>
                        <div />
                    </div>
                    <Suspense fallback={<LoadingApp />}>
                        {session ? (
                            <div className="p-2 overflow-y-scroll">
                                {children}
                            </div>
                        ) : (
                            <LoginForm />
                        )}
                    </Suspense>
                </main>
            </body>
        </html>
    );
}
