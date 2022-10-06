import { motion } from "framer-motion"
import Alert, { Level } from "../Alert"
import { useAppContext } from "../AppContext/AppContextProvider"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "./SkeletonArticles"
import {useFilterContext} from "../FilterContext/FilterContextProvider"
import {IoArrowBackSharp, IoArrowForwardSharp} from "react-icons/io5"

export default function ArticleFeed() {

  const app = useAppContext()
  const { filters } = useFilterContext()

  const hideWhenUnreadOnly = (is_read: boolean) => filters.unread && is_read === true
  const hideWhenLiked = (title: string) => filters.liked && app.likes && !app?.likes.includes(title)
  const handleNextPage = () => {
    app.setCursor([app.cursor.startCursor,app.cursor?.endCursor]) 
  }
  const handlePrevPage = () => {
    app.setCursor([null,app.cursor?.startCursor]) 
  }

  if (app.fetching.articles) return <SkeletonArticles />

  if (app.error.articles) return <Alert text="Error loading articles..." level={Level.warn} />

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
      <div className="flex justify-between py-4 gap-4">
        <button onClick={handlePrevPage}>
          <IoArrowBackSharp size={18} /> Prev 
        </button>
        <button onClick={handleNextPage}>
          Next <IoArrowForwardSharp size={18} />
        </button>
      </div>
    </motion.ol>
  )

}
