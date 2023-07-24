/** @format */

import {IBM_Plex_Sans} from '@next/font/google';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import DefaultHead from '../components/Head';
import {Database} from '../lib/supabase';
import {cookies} from 'next/headers';
import './../src/styles/globals.css';
import LoginForm from '../components/LoginForm';

const ibmplex = IBM_Plex_Sans({
    subsets: ['latin'],
    variable: '--font-ibmplex',
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
});

const supabase = createServerComponentClient<Database>({cookies});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        data: {session},
    } = await supabase.auth.getSession();

    return (
        <html lang="en">
            <DefaultHead />
            <body className={`text-slate-50 bg-slate-800 ${ibmplex.className}`}>
                <main>{session ? children : <LoginForm />}</main>
            </body>
        </html>
    );
}
