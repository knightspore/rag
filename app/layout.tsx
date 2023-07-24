/** @format */

import {IBM_Plex_Sans} from '@next/font/google';
import DefaultHead from '../components/Head';
import './../src/styles/globals.css';

const ibmplex = IBM_Plex_Sans({
    subsets: ['latin'],
    variable: '--font-ibmplex',
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <DefaultHead />
            <body className={`text-slate-50 bg-slate-800 ${ibmplex.className}`}>
                <main>{children}</main>
            </body>
        </html>
    );
}
