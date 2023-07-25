/** @format */

'use client';

import {usePathname} from 'next/navigation';

type Props = {
    id: string;
    children: React.ReactNode;
};

export default function Indicator({id, children}: Props) {
    const pathname = usePathname();
    const isActive = pathname.endsWith(id);
    return (
        <div
            className={`bg-slate-800 ${
                isActive && 'bg-slate-300 text-slate-900'
            } rounded-lg transition-all duration-75`}
        >
            {children}
        </div>
    );
}
