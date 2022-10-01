import SubscriptionCard from "./SubscriptionCard"
import {motion} from "framer-motion"
import {container, item} from "../../constants/animation"
import { useAppContext } from "../../AppContextProvider"
import { useGetSubscriptionsQuery } from "../../generated/graphql"
import Alert, { Level } from "../../Alert"
import { useEffect } from "react"
import SkeletonSubscriptions from "./SkeletonSubscriptions"

export default function SubscriptionFeed() {

  const { user, setSubscriptions } = useAppContext()

	const [{data, fetching, error}] = useGetSubscriptionsQuery({
		variables: {
			id: user?.id
		}
	})

  useEffect(() => {
    const items: string[] = []
    data?.subscriptionsCollection?.edges.forEach(({ node: { title } }) => {
      items.push(title)
    })
    setSubscriptions(items)
  }, [data, setSubscriptions])

  if (fetching) return <SkeletonSubscriptions />

  if (error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

  return (
  <motion.ol variants={container} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    {data?.subscriptionsCollection?.edges.map((sub) => {
      return <motion.li key={sub.node.title} variants={item}>
        <SubscriptionCard sub={sub.node} />
      </motion.li> 
    })}
  </motion.ol>
  )

}