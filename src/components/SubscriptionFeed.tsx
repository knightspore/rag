import SubscriptionCard, { SkeletonSubscriptionCard } from "./SubscriptionCard"
import {motion} from "framer-motion"
import {container, item} from "../constants/animation"
import { useAppContext } from "./provider/AppContextProvider"

export default function SubscriptionFeed() {

	const app = useAppContext()

  if (!app?.subscriptions) return <LoadingState />

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

function LoadingState() {
  return <motion.ol variants={container} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    <motion.li variants={item}>
    <SkeletonSubscriptionCard/>
    </motion.li>
    <motion.li variants={item}>
    <SkeletonSubscriptionCard/>
    </motion.li>
    <motion.li variants={item}>
    <SkeletonSubscriptionCard/>
    </motion.li>
    </motion.ol>
}
