import SubscriptionCard from "./SubscriptionCard"
import {motion} from "framer-motion"
import {container, item} from "../../constants/animation"
import { useAppContext } from "../../AppContextProvider"
import Alert, { Level } from "../../Alert"
import SkeletonSubscriptions from "./SkeletonSubscriptions"
import { useDeleteSubscriptionMutation } from "../../generated/graphql"

export default function SubscriptionFeed() {

  const app = useAppContext()

  const [deleted, deleteSubscription] = useDeleteSubscriptionMutation()

  async function handleDeleteSubscription(title?: string) {
    await deleteSubscription({
        title: title,
    })
    if (deleted) {
      return deleted
    }
  }

  if (app.fetching) return <SkeletonSubscriptions />

  if (app.error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

  return (
  <motion.ol variants={container} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    {app.subscriptions?.map((sub) => {
      return <motion.li key={sub.node.title} variants={item}>
        <SubscriptionCard sub={sub.node} remove={handleDeleteSubscription} />
      </motion.li> 
    })}
  </motion.ol>
  )

}