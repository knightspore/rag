/** @format */
'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

type Props = {
    text: string;
    path: string;
    icon: React.ReactNode;
};

export default function MenuItem({text, path, icon}: Props) {
    const pathname = usePathname();
    const isActive = pathname === path;
    return (
        <Link
            href={path}
            className={`flex items-center p-1 px-2 rounded-lg select-none bg-slate-800 transition-all duration-75 gap-2 card ${
                isActive && '!bg-slate-300 text-slate-900'
            }`}
        >
            {icon}
            <h3 className="text-sm w-max">{text}</h3>
        </Link>
    );
}
