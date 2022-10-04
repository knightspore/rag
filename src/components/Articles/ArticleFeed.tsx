import { motion } from "framer-motion"
import Alert, { Level } from "../Alert"
import { useAppContext } from "../AppContext/AppContextProvider"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const app = useAppContext()

  if (app.fetching) return <SkeletonArticles />

  if (app.error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={feedContainer} initial="hidden" animate="show">
      {app.articles?.map(({ node }) => {
        if (app.filters.unread && node.is_read === true) {
          return null
        }
        return <motion.li key={node.title} variants={feedItem}>
          <ArticleCard article={node} />
        </motion.li>
      })}
    </motion.ol>
  )

}
