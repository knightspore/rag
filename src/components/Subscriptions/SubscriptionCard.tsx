/** @format */

import {
    Subscriptions,
    useDeleteSubscriptionMutation,
} from '../../lib/graphql-generated';
import {IoTrashSharp} from 'react-icons/io5';
import Icon from '../App/Icon';
import {useAppContext} from '../Providers/AppContextProvider';
import {useState} from 'react';
import {Dialog} from '@headlessui/react';

type Props = {sub: Partial<Subscriptions>; remove: (title?: string) => void};

export default function SubscriptionCard({sub}: Props) {
    const {user} = useAppContext();

    const [deleted, deleteSubscription] = useDeleteSubscriptionMutation();

    async function handleDeleteSubscription() {
        await deleteSubscription({
            title: sub.title,
            id: user?.id,
        });
        if (deleted) {
            return deleted;
        }
    }

    const [deletePromptOpen, setDeletePromptOpen] = useState(false);

    return (
        <>
            <div className="flex items-center p-1 px-2 select-none gap-2 card">
                <div className="group">
                    <div className="transition-all duration-100 group-hover:hidden">
                        <Icon src={sub.icon} />
                    </div>
                    <div className="hidden transition-all duration-100 group-hover:block">
                        <IoTrashSharp
                            onClick={() => setDeletePromptOpen(true)}
                        />
                    </div>
                </div>
                <h3 className="text-sm w-max">{sub.title}</h3>
            </div>
            <Dialog
                open={deletePromptOpen}
                onClose={() => setDeletePromptOpen(false)}
            >
                <div className="absolute inset-0 z-50 flex items-center justify-center select-none bg-slate-900/90">
                    <Dialog.Panel
                        as="div"
                        className="p-4 text-slate-400"
                    >
                        <Dialog.Title
                            as="h2"
                            className="text-lg"
                        >
                            Remove{' '}
                            <span className="font-bold text-slate-300">
                                {sub.title}
                            </span>{' '}
                            from your subscriptions?
                        </Dialog.Title>
                        <div className="flex justify-center mt-4 gap-4">
                            <button
                                onClick={handleDeleteSubscription}
                                className="p-1 px-2 text-lg card error"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeletePromptOpen(false)}
                                className="p-1 px-2 text-lg card"
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
