import { IoTrashSharp } from "react-icons/io5";
import { Subscriptions } from "../../lib/graphql-generated";
import Icon from "../Icon";
import { motion } from "framer-motion"

type Props = { sub: Partial<Subscriptions>, remove: (title?: string) => void }

export default function SubscriptionCard({ sub, remove }: Props ) {
  return (
      <span
        className="select-none flex items-center p-px px-2 gap-2 transition-all duration-100 card">
        <motion.div whileTap={{ scale: 0.8}} className="flex-grow m-auto group">
          <div className="transition-all duration-100 group-hover:hidden">
          <Icon src={sub.icon}  />
          </div>
          <div className="hidden cursor-pointer transition-all duration-100 group-hover:block">
            <IoTrashSharp onClick={() => remove(sub.title)} />
          </div>
        </motion.div>
        <h3 className="font-medium w-max">{sub.title}</h3>
      </span>
  );
}
