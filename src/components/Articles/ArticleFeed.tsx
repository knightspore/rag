import { motion } from "framer-motion"
import Alert, { Level } from "../Alert"
import { useAppContext } from "../AppContext/AppContextProvider"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "./SkeletonArticles"
import {useFilterContext} from "../FilterContext/FilterContextProvider"
import {IoArrowBackSharp, IoArrowForwardSharp} from "react-icons/io5"
import { useArticlesQuery } from "../../lib/graphql-generated"
import { useState } from "react"

export default function ArticleFeed() {

  const app = useAppContext()
  const { filters } = useFilterContext()
  const [after, setAfter] = useState<string|null>(null)
  const [cursorHist, setCursorHist] = useState<[]|string[]>([])

  const [articles, articlesQuery] = useArticlesQuery({
    variables: {
      id: app.user?.id,
      after: after,
    }
  }) 

  const hideWhenUnreadOnly = (is_read: boolean) => filters.unread && is_read === true
  const hideWhenLiked = (title: string) => filters.liked && app.likes && !app?.likes.includes(title)

  const handleNextPage = () => {
    const cursor =  articles.data?.articles?.pageInfo.endCursor
    if (cursor) {
      after === null 
        ? setCursorHist([""]) 
        : setCursorHist([...cursorHist, after])
      setAfter(cursor)
      articlesQuery()
    }
  }
  const handlePrevPage = () => {
    if (cursorHist.length > 0) {
      const hist = cursorHist
      const cursor = hist.pop()
      setCursorHist(hist)
      cursor === "" ? setAfter(null) : setAfter(cursor ?? null)
      articlesQuery()
    }
  }

  if (articles.fetching) return <SkeletonArticles />

  if (articles.error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <>
      <motion.ol variants={feedContainer} initial="hidden" animate="show" className="relative">
        {articles.data?.articles?.edges.map(({ node }) => {
          if (hideWhenLiked(node.title) || hideWhenUnreadOnly(node.is_read || false)) {
            return null
          }
          return <motion.li key={node.title} variants={feedItem}>
            <ArticleCard article={node} />
          </motion.li>
        })}
      </motion.ol>      
      <div className="flex justify-between py-4 gap-4">
        <button onClick={handlePrevPage} className={cursorHist.length === 0 ? "opacity-0" : ""}>
          <IoArrowBackSharp size={18} /> Prev 
        </button>
        <button disabled>
          {cursorHist.length+1}
        </button>
        <button onClick={handleNextPage}>
          Next <IoArrowForwardSharp size={18} />
        </button>
      </div>
    </>
  )

}
