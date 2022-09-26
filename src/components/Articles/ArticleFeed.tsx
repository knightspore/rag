import { motion } from "framer-motion"
import { container, item } from "../../constants/animation"
import { useGetArticlesQuery } from "../../generated/graphql"
import Alert, { Level } from ".././App/Alert"
import ArticleCard  from "./ArticleCard"
import { useAppContext } from ".././provider/AppContextProvider"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const { articleIDs } = useAppContext()

  const [{ data, fetching, error }] = useGetArticlesQuery({
    variables: {
      ids: articleIDs,
    }
  })

  if (!articleIDs || fetching) return <SkeletonArticles />

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