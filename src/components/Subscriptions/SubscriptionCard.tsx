import { IoTrashSharp } from "react-icons/io5";
import { Subscriptions, useDeleteSubscriptionMutation } from "../../generated/graphql";
import Icon from "../App/Icon";
import { motion } from "framer-motion"

export default function SubscriptionCard({ sub }: { sub: Partial<Subscriptions> }) {

  const [deleted, deleteSubscription] = useDeleteSubscriptionMutation()

  async function handleDeleteSubscription() {
    sub.title && await deleteSubscription({
        title: sub.title,
    })
    if (deleted) {
      return deleted
    }
  }


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
          <div className="hidden transition-all duration-100 group-hover:block">
            <IoTrashSharp onClick={handleDeleteSubscription} />
          </div>
        </motion.div>
        <p className="line-clamp-1">{sub.title}</p>
      </span>
    </div>
  );
}