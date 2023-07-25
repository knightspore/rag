/** @format */

import {
    Subscriptions,
    useDeleteSubscriptionMutation,
} from '../../lib/graphql-generated';
import {IoTrashSharp} from 'react-icons/io5';
import Icon from '../App/Icon';
import {useAppContext} from '../Providers/AppContextProvider';
import {useState} from 'react';
import Modal from '../App/Modal';

type Props = {sub: Partial<Subscriptions>; remove: (title?: string) => void};

export default function SubscriptionCard({sub}: Props) {
    const {user} = useAppContext();

    const [deleted, deleteSubscription] = useDeleteSubscriptionMutation();
    const [open, setOpen] = useState(false);

    async function handleDeleteSubscription() {
        await deleteSubscription({
            title: sub.title,
            id: user?.id,
        });
        if (deleted) {
            return deleted;
        }
    }

    return (
        <>
            <div className="flex items-center p-1 px-2 select-none gap-2 card">
                <div className="group">
                    <div className="transition-all duration-100 group-hover:hidden">
                        {/* @ts-expect-error Old Component */}
                        <Icon src={sub.icon} />
                    </div>
                    <div className="hidden transition-all duration-100 group-hover:block">
                        <IoTrashSharp onClick={() => setOpen(true)} />
                    </div>
                </div>
                <h3 className="text-sm w-max">{sub.title}</h3>
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                title={`Remove '${sub.title}' from your subscriptions?`}
                text="Delete"
                callback={handleDeleteSubscription}
            />
        </>
    );
}
