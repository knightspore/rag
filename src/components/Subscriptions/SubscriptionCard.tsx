import { IoTrashSharp } from "react-icons/io5";
import { Subscriptions } from "../../lib/graphql-generated";
import Icon from "../Icon";
import { motion } from "framer-motion"

type Props = { sub: Partial<Subscriptions>, remove: (title?: string) => void }

export default function SubscriptionCard({ sub, remove }: Props ) {
  return (
    <div
      className="flex select-none group"
    >
      <span
        className="flex items-center gap-2 p-px px-2 transition-all duration-100 card">
        <motion.div whileTap={{ scale: 0.8}} className="flex-grow m-auto">
          <div className="transition-all duration-100 group-hover:hidden">
          <Icon src={sub.icon}  />
          </div>
          <div className="hidden transition-all duration-100 cursor-pointer group-hover:block">
            <IoTrashSharp onClick={() => remove(sub.title)} />
          </div>
        </motion.div>
        <p className="line-clamp-1">{sub.title}</p>
      </span>
    </div>
  );
}