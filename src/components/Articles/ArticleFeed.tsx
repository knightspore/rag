import { motion } from "framer-motion"
import Alert, { Level } from "../../Alert"
import { useAppContext } from "../../AppContextProvider"
import { container, item } from "../../constants/animation"
import { useLikeMutation, useMarkAsReadMutation, useMarkAsUnreadMutation, useUnlikeMutation } from "../../generated/graphql"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const { filters, error, articles, likes, user } = useAppContext()

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
    await likeMutation({ userId: user?.id, article: title, subscription: subscription })
    if (like) {
      return like
    }
    } else if (liked) {
      await unlikeMutation({articleTitle: title})
      if (unlike) {
        return unlike
      }
    }
  }

  if (!articles) return <SkeletonArticles />

  if (error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={container} initial="hidden" animate="show">
      {articles?.map(({ node }) => {
        if (filters.unread && node.is_read === true) {
          return null
        }
        const isLiked = likes?.includes(node.title)
        if (filters.liked && isLiked === false) {
          return null
        }
        return <motion.li key={node.title} variants={item}>
          <ArticleCard isLiked={isLiked || false} article={node} like={handleLike} markRead={handleMarkAsRead} />
        </motion.li>
      })}
    </motion.ol>
  )

}