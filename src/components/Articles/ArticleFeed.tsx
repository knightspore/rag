import { motion } from "framer-motion"
import Alert, { Level } from "../Alert"
import { useAppContext } from "../AppContext/AppContextProvider"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const app = useAppContext()

  const hideWhenUnreadOnly = (is_read: boolean) => app.filters.unread && is_read === true
  const hideWhenLiked = (title: string) => app.filters.liked && app.likes && !app?.likes.includes(title)

  if (app.fetching) return <SkeletonArticles />

  if (app.error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={feedContainer} initial="hidden" animate="show">
      {app.articles?.map(({ node }) => {
        if (hideWhenLiked(node.title) || hideWhenUnreadOnly(node.is_read || false)) {
          return null
        }
        return <motion.li key={node.title} variants={feedItem}>
          <ArticleCard article={node} />
        </motion.li>
      })}
    </motion.ol>
  )

}
