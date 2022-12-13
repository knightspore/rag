import { motion } from "framer-motion"
import Alert, { Level } from "../Alert"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "../SkeletonComponents/SkeletonArticles"
import {useFilterContext} from "../Providers/FilterContextProvider"
import {IoArrowBackSharp, IoArrowForwardSharp} from "react-icons/io5"
import { useArticlesQuery } from "../../lib/graphql-generated"
import { useState } from "react"
import { useQueryContext } from "../Providers/QueryContextProvider"
import { useAppContext } from "../Providers/AppContextProvider"

export default function ArticleFeed() {

  const app = useAppContext()
  const { likes } = useQueryContext()
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
  const hideWhenLiked = (title: string) => filters.liked && likes && !likes.includes(title)

  const handleNextPage = () => {
    const cursor =  articles.data?.articles?.pageInfo.endCursor
    if (cursor) {
      after === null 
        ? setCursorHist([""]) 
        : setCursorHist([...cursorHist, after])
      setAfter(cursor)
      articlesQuery({ requestPolicy: "network-only" })
    }
  }
  const handlePrevPage = () => {
    if (cursorHist.length > 0) {
      const hist = cursorHist
      const cursor = hist.pop()
      setCursorHist(hist)
      cursor === "" ? setAfter(null) : setAfter(cursor ?? null)
      articlesQuery({ requestPolicy: "network-only" })
    }
  }

  if (articles.fetching) return <SkeletonArticles />

  if (articles.error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <>
      <motion.ol variants={feedContainer} initial="hidden" animate="show" className="p-2 m-2 overflow-y-scroll">
        {articles.data?.articles?.edges.map(({ node }) => {
          if (hideWhenLiked(node.title) || hideWhenUnreadOnly(node.is_read || false)) {
            return null
          }
          return <motion.li key={node.title} variants={feedItem}>
            <ArticleCard article={node} />
          </motion.li>
        })}
      </motion.ol>      
      <div className="flex justify-between p-4">
        <button onClick={handlePrevPage} className={cursorHist.length === 0 ? "opacity-0" : ""} disabled={cursorHist.length === 0}>
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
