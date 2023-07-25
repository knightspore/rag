/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import Icon from '../../src/components/App/Icon';
import {cookies} from 'next/headers';

type Props = {
    id: string;
};

export default async function SubCard({id}: Props) {
    const supabase = createServerComponentClient({cookies});

    const {data: subscription} = await supabase
        .from('subscriptions')
        .select('title, icon')
        .eq('id', id)
        .limit(1)
        .single();

    return (
        <div className="flex items-center p-1 px-2 select-none gap-2 card">
            <Icon src={subscription?.icon} />
            <h3 className="text-sm w-max">{subscription?.title}</h3>
        </div>
    );
}
