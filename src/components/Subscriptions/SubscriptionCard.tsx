import {
    Subscriptions,
    useDeleteSubscriptionMutation,
} from '../../lib/graphql-generated';
import {useFilterContext} from '../Providers/FilterContextProvider';
import {IoTrashSharp} from 'react-icons/io5';
import Icon from '../Icon';
import {useAppContext} from '../Providers/AppContextProvider';
import {useState} from 'react';
import {Dialog} from '@headlessui/react';

type Props = {sub: Partial<Subscriptions>; remove: (title?: string) => void};

export default function SubscriptionCard({sub}: Props) {
    const {filters, setFilters} = useFilterContext();
    const filtered = filters.subscriptions?.length > 0;
    const selected =
        sub.title && filters.subscriptions.toString().includes(sub.title);

    function handleFilter() {
        if (selected) {
            setFilters({
                ...filters,
                subscriptions: filters.subscriptions.filter(
                    (s) => s !== sub.title
                ),
            });
        } else if (!selected && filters.subscriptions && sub.title) {
            setFilters({
                ...filters,
                subscriptions: [...filters.subscriptions, sub.title],
            });
        }
    }

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
            <div
                className={`select-none flex items-center p-1 px-2 gap-2 card ${
                    filtered && !selected && 'opacity-50'
                }`}
            >
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
                <button onClick={handleFilter}>
                    <h3 className="w-max">{sub.title}</h3>
                </button>
            </div>
            <Dialog
                open={deletePromptOpen}
                onClose={() => setDeletePromptOpen(false)}
            >
                <div className="absolute inset-0 z-50 flex items-center justify-center select-none bg-slate-900/90">
                    <Dialog.Panel
                        as="div"
                        className="p-4 card text-slate-400"
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
                        <div className="flex justify-center mt-2 gap-4">
                            <button
                                onClick={handleDeleteSubscription}
                                className="p-1 px-2 bg-red-700 rounded-md"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeletePromptOpen(false)}
                                className="p-1 px-2 bg-slate-700 rounded-md"
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
