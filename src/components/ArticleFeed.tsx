import { motion } from "framer-motion"
import { container, item } from "../constants/animation"
import { useGetArticlesQuery } from "../generated/graphql"
import Alert, { Level } from "./Alert"
import ArticleCard, { SkeletonArticleCard } from "./ArticleCard"
import { useAppContext } from "./provider/AppContextProvider"

export default function ArticleFeed() {

  const app = useAppContext()

  const [{ data, fetching, error }] = useGetArticlesQuery({
    variables: {
      ids: app?.articles,
    }
  })

  if (fetching) return <LoadingState />

  if (error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={container} initial="hidden" animate="show">
      {data && data?.items?.edges.map(({ node }) => {
        return <motion.li key={node.title} variants={item}>
          <ArticleCard article={node} />
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
