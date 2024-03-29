import SubscriptionCard from "./SubscriptionCard"
import {motion} from "framer-motion"
import {feedContainer, feedItem} from "../../lib/animation"
import { useAppContext } from "../Providers/AppContextProvider"
import Alert, { Level } from "../App/Alert"
import SkeletonSubscriptions from "../SkeletonComponents/SkeletonSubscriptions"
import { useDeleteSubscriptionMutation, useSubscriptionsQuery } from "../../lib/graphql-generated"
import {useEffect} from "react"

export default function SubscriptionFeed() {

  const app = useAppContext()

  const [subs, subsQuery] = useSubscriptionsQuery({
    variables: {
      id: app?.user?.id
    }
  })
  const [, deleteSubscription] = useDeleteSubscriptionMutation()

  useEffect(() => {
   if (subs.data?.subscriptions?.edges && subs.data?.subscriptions?.edges.length === 0) {
      app.setOnboarding(true)
   }
    if (app.refreshPending === true) {
      app.setRefreshPending(false)
      subsQuery({ requestPolicy: "network-only" })
    }
  }, [subs, app, subsQuery])

  async function handleDeleteSubscription(title?: string) {
    deleteSubscription({
        title: title,
        id: app.user?.id,
    })
    app.setRefreshPending(true)
  }


  if (subs.fetching) return <SkeletonSubscriptions />

  if (subs.error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

  return (
    <div className="relative shadow-inner bg-slate-900/50">
        <div className="fixed absolute top-0 bottom-0 right-0 z-30 w-24 bg-gradient-to-l from-slate-900" />
          <motion.ol variants={feedContainer} initial="hidden" animate="show" className="relative flex overflow-x-auto no-scrollbar gap-2">
            <div />
            {
              subs.data?.subscriptions?.edges.map((sub) => {
                return <motion.li className="py-2" key={sub.node.title} variants={feedItem}>
                  <SubscriptionCard sub={sub.node} remove={handleDeleteSubscription} />
                </motion.li> 
              })
            }
          </motion.ol>
      </div>
  )

}

