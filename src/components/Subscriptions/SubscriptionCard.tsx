import { Subscriptions } from "../../lib/graphql-generated";
import { useFilterContext } from "../FilterContext/FilterContextProvider";
import Icon from "../Icon";

type Props = { sub: Partial<Subscriptions>, remove: (title?: string) => void }

export default function SubscriptionCard({ sub  }: Props ) {

  const { filters, setFilters } = useFilterContext()
  
  const filtered = filters.subscriptions?.length > 0
  
  const selected = sub.title && filters.subscriptions.includes(sub.title)

  function handleFilter() {
    if (selected) {
      setFilters({...filters,
      subscriptions: filters.subscriptions.filter(s => s !== sub.title)})
    } else if(!selected && filters.subscriptions && sub.title) {
      setFilters({ ...filters,
      subscriptions: [...filters.subscriptions, sub.title]})
    }
  }

  return (
      <button
        onClick={handleFilter}
        className={`select-none flex items-center p-px px-2 gap-2 card ${filtered && !selected && "opacity-50"}`}>
          <div className="transition-all duration-100">
          <Icon src={sub.icon}  />
          </div>
          <h3 className="w-max">{sub.title}</h3>
      </button>
  );
}
