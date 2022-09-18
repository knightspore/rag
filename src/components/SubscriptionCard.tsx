import { useState } from "react";
import { SubscriptionListItem } from "../types/types";
import Icon from "./Icon";

export default function SubscriptionCard({ sub }: { sub: SubscriptionListItem }) {
  const [hidden,  setHidden] = useState(false)
  const hide = () => { setHidden(!hidden)}
  return (
    <div
      className={`select-none flex cursor-pointer ${hidden && 'opacity-50'}`}
      onClick={hide}
    >
      <span
        className="flex items-center gap-2 p-px px-2 font-bold transition-all duration-150 border-2 rounded-full line-clamp border-slate-700/30 bg-slate-700/30 hover:bg-slate-700">
        <Icon src={sub?.link} />
        <p>{sub.title}</p>
      </span>
    </div>
  );
}