import { useState } from "react";
import { Subscriptions } from "../../generated/graphql";
import Icon from "../App/Icon";

export default function SubscriptionCard({ sub }: { sub: Partial<Subscriptions> }) {

  const [hidden, setHidden] = useState(false)

  const hide = async () => { 
    setHidden(!hidden)
  }
  return (
    <div
      className={`select-none flex cursor-pointer ${hidden && 'opacity-50'}`}
      onClick={hide}
    >
      <span
        className="flex items-center gap-2 p-px px-2 card">
        <div className="flex-grow m-auto">
          <Icon src={sub.icon} />
        </div>
        <p className="line-clamp-1">{sub.title}</p>
      </span>
    </div>
  );
}