import { gql, useQuery } from "urql"
import { ArticlePreview } from "../types/types"
import Alert, { Level } from "./Alert"
import ArticleCard, {SkeletonArticleCard} from "./ArticleCard"
import {useAppContext} from "./provider/AppContextProvider"

type EdgeType = {
	node: ArticlePreview
}


export default function ArticleFeed() {
  
  const { articles } = useAppContext()

  const ArticlesQuery = gql`
    query ($ids: [UUID!]) {
      articlesCollection(filter: {id: {in: $ids}}, orderBy: {pub_date: DescNullsLast}) {
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
		query: ArticlesQuery,
    variables: {
      ids: articles,
    }
	})

  if (fetching) return <SkeletonArticleCard />
	if (error) return <Alert text="Error loading articles..." level={Level.warn} />
	return data.articlesCollection.edges.map((edge: EdgeType) => {
		return <ArticleCard key={edge.node.title} article={edge.node} />
	})

}
