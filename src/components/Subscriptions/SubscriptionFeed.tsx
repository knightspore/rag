import SubscriptionCard from "./SubscriptionCard"
import {motion} from "framer-motion"
import {feedContainer, feedItem} from "../../lib/animation"
import { useAppContext } from "../AppContext/AppContextProvider"
import Alert, { Level } from "../Alert"
import SkeletonSubscriptions from "./SkeletonSubscriptions"
import { useDeleteSubscriptionMutation } from "../../lib/graphql-generated"

export default function SubscriptionFeed() {

  const app = useAppContext()

  const [, deleteSubscription] = useDeleteSubscriptionMutation()

  async function handleDeleteSubscription(title?: string) {
    await deleteSubscription({
        title: title,
        id: app.user?.id,
    })
    app.refreshAppContext()
  }

  if (app.fetching) return <SkeletonSubscriptions />

  if (app.error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

  return (
  <motion.ol variants={feedContainer} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    {
      app.subscriptions?.map((sub) => {
        return <motion.li key={sub.node.title} variants={feedItem}>
          <SubscriptionCard sub={sub.node} remove={handleDeleteSubscription} />
        </motion.li> 
      })
    }
  </motion.ol>
  )

}
