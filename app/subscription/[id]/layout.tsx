/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import LoadingApp from '../../../components/LoadingApp';
import {Suspense} from 'react';

export default async function SubscriptionLayout({
    params: {id},
    children,
}: {
    params: {id: string};
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient({cookies});
    const {data: subscription} = await supabase
        .from('subscriptions')
        .select('title, url, description, updated_at')
        .eq('id', id)
        .limit(1)
        .single();

    return (
        <div className="p-2">
            <h1 className="flex items-center mb-2 text-2xl font-bold gap-2">
                <Image
                    alt={`${subscription?.title} logo`}
                    src={`https://www.google.com/s2/favicons?domain=${subscription?.url}&sz=128`}
                    width={32}
                    height={32}
                />
                {subscription?.title}
            </h1>
            {subscription?.description !== subscription?.title && (
                <p className="font-medium">{subscription?.description}</p>
            )}
            <p className="text-sm text-slate-400">
                <a
                    href={`https://${new URL(subscription?.url).hostname}`}
                    target="_blank"
                >
                    {new URL(subscription?.url).hostname}
                </a>
            </p>
            <p className="text-sm text-slate-400">
                Updated:{' '}
                <time>
                    {new Date(subscription?.updated_at).toLocaleTimeString(
                        'en-ZA',
                        {
                            day: 'numeric',
                            month: 'short',
                            hour: 'numeric',
                            minute: '2-digit',
                        },
                    )}
                </time>
            </p>
            <div className="flex items-center mt-4 gap-2">
                <Link
                    className="flex items-center p-1 px-2 text-sm rounded-lg select-none bg-slate-800 transition-all duration-75 gap-2 card"
                    href={`/subscription/${id}/edit`}
                >
                    Edit
                </Link>
                <Link
                    className="flex items-center p-1 px-2 text-sm rounded-lg select-none bg-slate-800 transition-all duration-75 gap-2 card warn"
                    href={`/subscription/${id}/edit`}
                >
                    Delete
                </Link>
            </div>
            <hr className="mt-4 mb-2 border-slate-700" />
            <Suspense fallback={<LoadingApp />}>{children}</Suspense>
        </div>
    );
}
