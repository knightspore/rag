import { motion } from "framer-motion"
import { gql, useQuery } from "urql"
import { container, item } from "../constants/animation"
import { ArticlePreview } from "../types/types"
import Alert, { Level } from "./Alert"
import ArticleCard, { SkeletonArticleCard } from "./ArticleCard"
import { useAppContext } from "./provider/AppContextProvider"

type EdgeType = {
  node: ArticlePreview
}

export default function ArticleFeed() {

  const { articles } = useAppContext()

  const [{ data, fetching, error }] = useQuery({
    query: gql`
    query getArticles($ids: [UUID!]) {
      items: articlesCollection(
        filter: {id: {in: $ids}}
        orderBy: {pub_date: DescNullsLast}
      ) {
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
    `,
    variables: {
      ids: articles,
    }
  })

  if (fetching) return <LoadingState />

  if (error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={container} initial="hidden" animate="show">
      {data && data.items.edges.map((edge: EdgeType) => {
        return <motion.li key={edge.node.title} variants={item}>
          <ArticleCard article={edge.node} />
        </motion.li>
      })}
    </motion.ol>
  )

}

function LoadingState() {
  return <motion.ol variants={container} initial="hidden" animate="show">
    <motion.li variants={item}>
      <SkeletonArticleCard />
    </motion.li>
    <motion.li variants={item}>
      <SkeletonArticleCard />
    </motion.li>
    <motion.li variants={item}>
      <SkeletonArticleCard />
    </motion.li>
  </motion.ol>
}
