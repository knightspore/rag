import { gql, useQuery } from "urql"
import Alert, { Level } from "./Alert"
import SubscriptionCard from "./SubscriptionCard"
import { SubscriptionPreview } from "../types/types"

export type EdgeType = {
	node: SubscriptionPreview
}

const SubscriptionsQuery = gql`
    query {
        subscriptionsCollection {
            edges {
                node {
                    id
										title
										icon
                }
            }
        }
		}
`

export default function SubscriptionFeed() {

	const [{ data, fetching, error }] = useQuery({
		query: SubscriptionsQuery
	})

	if (fetching) return <SubscriptionCard sub={{ id: "none", title: "Loading...", icon: undefined }} />

	if (error) return <Alert text="Error loading subscriptions..." level={Level.warn} />

	return data.subscriptionsCollection.edges.map((edge: EdgeType) => {
		return <SubscriptionCard key={edge.node.title} sub={edge.node} />
	})

}