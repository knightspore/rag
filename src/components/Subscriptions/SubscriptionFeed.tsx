import SubscriptionCard from "./SubscriptionCard"
import {motion} from "framer-motion"
import {feedContainer, feedItem} from "../../lib/animation"
import { useAppContext } from "../AppContext/AppContextProvider"
import Alert, { Level } from "../Alert"
import SkeletonSubscriptions from "../SkeletonComponents/SkeletonSubscriptions"
import { useDeleteSubscriptionMutation, useSubscriptionsQuery } from "../../lib/graphql-generated"

export default function SubscriptionFeed() {

  const app = useAppContext()

  const [subs, subsQuery] = useSubscriptionsQuery({
    variables: {
      id: app?.user?.id
    }
  })
  const [, deleteSubscription] = useDeleteSubscriptionMutation()

  async function handleDeleteSubscription(title?: string) {
    await deleteSubscription({
        title: title,
        id: app.user?.id,
    })
    subsQuery({ requestPolicy: "network-only" })
    // TODO: Refresh Articles
  }

  if (subs.fetching) return <SkeletonSubscriptions />

  if (subs.error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

  return (
    <div className="relative">
      <div className="fixed absolute top-0 bottom-0 right-0 bg-gradient-to-l from-slate-900 w-24 z-30" />
        <motion.ol variants={feedContainer} initial="hidden" animate="show" className="no-scrollbar flex overflow-x-auto gap-2 md:flex-wrap relative">
          {
            subs.data?.subscriptions?.edges.map((sub: any) => {
              return <motion.li key={sub.node.title} variants={feedItem}>
                <SubscriptionCard sub={sub.node} remove={handleDeleteSubscription} />
              </motion.li> 
            })
          }
        </motion.ol>
    </div>
  )

}
