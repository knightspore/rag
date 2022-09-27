import { motion } from "framer-motion"
import { container, item } from "../../constants/animation"
import { useGetArticlesFromSubscriptionsQuery  } from "../../generated/graphql"
import Alert, { Level } from ".././App/Alert"
import ArticleCard  from "./ArticleCard"
import { useAppContext } from "../Provider/AppContextProvider"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const { subscriptions } = useAppContext()

  const [{data, fetching, error}] = useGetArticlesFromSubscriptionsQuery({
    variables: {
      ids: subscriptions,
    }
  })

  if (!subscriptions || fetching) return <SkeletonArticles />

  if (error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={container} initial="hidden" animate="show">
      {data && data?.articlesCollection?.edges.map(({ node }) => {
        return <motion.li key={node.title} variants={item}>
          <ArticleCard article={node} />
        </motion.li>
      })}
    </motion.ol>
  )

}