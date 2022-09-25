import { useState } from "react";
import { SubscriptionPreview } from "../types/types";
import Icon from "./Icon";

export default function SubscriptionCard({ sub }: { sub: SubscriptionPreview }) {
  const [hidden, setHidden] = useState(false)
  const hide = () => { setHidden(!hidden) }
  return (
    <div
      className={`select-none flex cursor-pointer ${hidden && 'opacity-50'}`}
      onClick={hide}
    >
      <span
        className="flex items-center gap-2 p-px px-2 font-bold transition-all duration-150 border-2 rounded-sm line-clamp border-slate-700/30 bg-slate-700/30 hover:bg-slate-700">
        <div className="flex-grow m-auto">
          <Icon src={sub.icon} />
        </div>
        <p className="line-clamp-1">{sub.title}</p>
      </span>
    </div>
  );
}

export function SkeletonSubscriptionCard() {
return (
      <span
        className="animate-pulse flex items-center gap-2 p-px px-2 font-bold transition-all duration-150 border-2 rounded-sm line-clamp border-slate-700/30 bg-slate-700/30">
        <div className="flex-grow m-auto">
          <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
        </div>
        <div className="h-4 rounded-full bg-slate-700/80 my-1 w-24"/>
      </span>
  )
}
