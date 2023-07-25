/** @format */

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import Icon from '../../src/components/App/Icon';
import {cookies} from 'next/headers';
import Link from 'next/link';
import Indicator from './Indicator';

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
        <Indicator id={id}>
            <Link
                href={`/subscription/${id}`}
                className="flex items-center p-1 px-2 select-none gap-2 card"
            >
                <Icon src={subscription?.icon} />
                <h3 className="text-sm font-medium w-max">
                    {subscription?.title}
                </h3>
            </Link>
        </Indicator>
    );
}
