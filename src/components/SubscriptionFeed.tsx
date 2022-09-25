import Alert, { Level } from "./Alert"
import SubscriptionCard, { SkeletonSubscriptionCard } from "./SubscriptionCard"
import { useAppContext } from "./provider/AppContextProvider"
import {motion} from "framer-motion"
import {container, item} from "../constants/animation"
import {SubscriptionPreview} from "../types/types"

type EdgeType = {
  node: SubscriptionPreview
}

export default function SubscriptionFeed() {

	const { data, fetching, error } = useAppContext()

  if (fetching) return <LoadingState />

	if (error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

  return (
  <motion.ol variants={container} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    {data && data.subscriptionsCollection.edges.map((edge: EdgeType) => {
      return <motion.li key={edge.node.title} variants={item}>
        <SubscriptionCard sub={edge.node} />
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
