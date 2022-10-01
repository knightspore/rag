import { motion } from "framer-motion"
import { container, item } from "../../constants/animation"
import { useGetArticlesFromSubscriptionsQuery, useGetLikesQuery  } from "../../generated/graphql"
import Alert, { Level } from "../../Alert"
import ArticleCard  from "./ArticleCard"
import { useAppContext } from "../../AppContextProvider"
import SkeletonArticles from "./SkeletonArticles"

export default function ArticleFeed() {

  const { subscriptions, user, filters } = useAppContext()

  const [{data, fetching, error}] = useGetArticlesFromSubscriptionsQuery({
    variables: {
      ids: subscriptions,
    }
  })

  const [likesData] = useGetLikesQuery({
    variables: {
      userId: user?.id
    }
  })

  const likes = likesData.data && likesData.data.likesCollection?.edges.map(({node}) => {
    return node.article_title
  })

  if (!subscriptions || fetching) return <SkeletonArticles />

  if (error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <motion.ol variants={container} initial="hidden" animate="show">
      {data && data?.articlesCollection?.edges.map(({ node }) => {
        if (filters.unread && node.is_read === true) {
          return null
        }
        const isLiked = likes && node.title && likes.includes(node.title)
        if (filters.liked && isLiked === false) {
          return null
        }
        return <motion.li key={node.title} variants={item}>
          <ArticleCard isLiked={isLiked || false} article={node} />
        </motion.li>
      })}
    </motion.ol>
  )

}