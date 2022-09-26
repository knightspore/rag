import SubscriptionCard from "./SubscriptionCard"
import {motion} from "framer-motion"
import {container, item} from "../../constants/animation"
import { useAppContext } from ".././provider/AppContextProvider"
import SkeletonSubscriptions from "./SkeletonSubscriptions"

export default function SubscriptionFeed() {

	const app = useAppContext()

  if (!app?.subscriptions) return <SkeletonSubscriptions />

  return (
  <motion.ol variants={container} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    {app.subscriptions.edges.map((sub) => {
      return <motion.li key={sub.node.title} variants={item}>
        <SubscriptionCard sub={sub.node} />
      </motion.li> 
    })}
  </motion.ol>
  )

}