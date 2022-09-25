import { gql, useQuery } from "urql"
import { ArticlePreview } from "../types/types"
import Alert, { Level } from "./Alert"
import ArticleCard, {SkeletonArticleCard} from "./ArticleCard"
import {useAppContext, useSubscriptionArticlesContext} from "./provider/AppContextProvider"

type EdgeType = {
	node: ArticlePreview
}


export default function ArticleFeed() {
  
  const { articles } = useAppContext()

  console.log(articles.length)
  
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

	const [{ data, fetching, error }] = useQuery({
		query: ArticlesQuery
	})

  if (fetching) return <SkeletonArticleCard />
	if (error) return <Alert text="Error loading articles..." level={Level.warn} />
	return data.articlesCollection.edges.map((edge: EdgeType) => {
		return <ArticleCard key={edge.node.title} article={edge.node} />
	})

}
