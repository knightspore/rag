/** @format */
'use client';

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useState} from 'react';
import {IoRefreshSharp} from 'react-icons/io5';
import {refreshSubscriptions} from '../lib/api';

export default function RefreshButton() {
    const supabase = createClientComponentClient();
    const [refreshing, setRefreshing] = useState(false);

    async function handleRefresh() {
        setRefreshing(true);
        const {
            data: {user},
        } = await supabase.auth.getUser();
        await refreshSubscriptions(user?.id);
        setRefreshing(false);
    }

    return (
        <button
            onClick={handleRefresh}
            className="flex items-center p-1 px-2 rounded-lg select-none bg-slate-800 transition-all duration-75 gap-2 card"
        >
            <IoRefreshSharp
                size={14}
                className={`${refreshing && 'animate-spin'}`}
            />
            <h3 className="text-sm font-medium w-max">Refresh</h3>
        </button>
    );
}
