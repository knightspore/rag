import {
    Subscriptions,
    useDeleteSubscriptionMutation,
} from '../../lib/graphql-generated';
import {useFilterContext} from '../Providers/FilterContextProvider';
import {IoTrashSharp} from 'react-icons/io5';
import Icon from '../Icon';
import {useAppContext} from '../Providers/AppContextProvider';

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

    return (
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
                <IoTrashSharp onClick={handleDeleteSubscription} />
            </div>
        </div>
          {/* <button onClick={handleFilter}> */}
            <h3 className="w-max">{sub.title}</h3>
          {/* </button> */}
        </div>
    );
}
