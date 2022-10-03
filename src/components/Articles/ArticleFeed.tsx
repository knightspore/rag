import { motion } from "framer-motion"
import Alert, { Level } from "../Alert"
import { useAppContext } from "../AppContext/AppContextProvider"
import { feedContainer, feedItem } from "../../lib/animation"
import { useLikeMutation, useMarkAsReadMutation, useMarkAsUnreadMutation, useUnlikeMutation } from "../../lib/graphql-generated"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const app = useAppContext()

  const [read, markRead] = useMarkAsReadMutation()
  const [unread, markUnread] = useMarkAsUnreadMutation()
  const [like, likeMutation] = useLikeMutation()
  const [unlike, unlikeMutation] = useUnlikeMutation()

  async function handleMarkAsRead (id: string, is_read?: boolean | null) {
    if (!is_read) {
      await markRead({ id })
      if (read) {
        return read
      }
    } else if (is_read) {
      await markUnread({ id })
      if (unread) {
        return unread
      }
    }
  }

 async function handleLike (liked: boolean,  subscription?: string, title?: string) {
    if (liked !== true) {
    await likeMutation({ userId: app.user?.id, article: title, subscription: subscription })
    if (like) {
      return like
    }
    } else if (liked) {
      await unlikeMutation({userId: app.user?.id, articleTitle: title})
      if (unlike) {
        return unlike
      }
    }
  }

  if (app.fetching) return <SkeletonArticles />

  if (app.error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={feedContainer} initial="hidden" animate="show">
      {app.articles?.map(({ node }) => {
        if (app.filters.unread && node.is_read === true) {
          return null
        }
        const isLiked = app.likes?.includes(node.title)
        if (app.filters.liked && isLiked === false) {
          return null
        }
        return <motion.li key={node.title} variants={feedItem}>
          <ArticleCard isLiked={isLiked || false} article={node} like={handleLike} markRead={handleMarkAsRead} />
        </motion.li>
      })}
    </motion.ol>
  )

}