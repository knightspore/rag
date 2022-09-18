import { gql, useQuery } from "urql"
import { ArticlePreview } from "../types/types"
import Alert, { Level } from "./Alert"
import ArticleCard from "./ArticleCard"

type EdgeType = {
	node: ArticlePreview
}

const ArticlesQuery = gql`
	query {
		articlesCollection(orderBy: [{ pub_date: AscNullsFirst }]) {
			edges {
				node {
					id
					title
					description
					url
					pub_date
					subscription
					is_read
				}
			}
		}
	}
`

export default function ArticleFeed() {

	const [{ data, fetching, error }] = useQuery({
		query: ArticlesQuery
	})

	if (fetching) return <Alert text="Loading articles..." level={Level.info} />

	if (error) return <Alert text="Error loading articles..." level={Level.warn} />

	return data.articlesCollection.edges.map((edge: EdgeType) => {
		return <ArticleCard key={edge.node.title} article={edge.node} />
	})

}