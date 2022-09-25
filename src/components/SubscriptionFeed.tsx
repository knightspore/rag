import Alert, { Level } from "./Alert"
import SubscriptionCard, { SkeletonSubscriptionCard } from "./SubscriptionCard"
import { AppContextGQLResult } from "../types/types"
import { useAppContext } from "./provider/AppContextProvider"

export default function SubscriptionFeed() {

	const { data, fetching, error } = useAppContext()

  if (fetching) return <SkeletonSubscriptionCard />
	if (error) return <Alert text="Error loading subscriptions..." level={Level.warn} />
	return data.subscriptionsCollection.edges.map((edge: AppContextGQLResult) => {
		return <SubscriptionCard key={edge.node.title} sub={edge.node} />
	})

}
