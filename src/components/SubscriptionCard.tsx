import { useState } from "react";
import Icon from "./Icon";

export default function SubscriptionCard({ sub }: { sub: any }) {
  const [hidden,  setHidden] = useState(false)
  return (
    <div
      className={`flex cursor-pointer ${hidden && 'opacity-50'}`}
      onClick={() => setHidden(!hidden)}
    >
      <span
        className="flex items-center gap-2 p-px px-2 font-bold transition-all duration-150 border-2 rounded-full line-clamp border-slate-700/30 bg-slate-700/30 hover:bg-slate-700">
        <Icon src={sub.icon} />
        <p>{sub.title}</p>
      </span>
    </div>
  );
}
