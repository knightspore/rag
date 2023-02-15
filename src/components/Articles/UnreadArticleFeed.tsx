import { motion } from "framer-motion"
import Alert, { Level } from "../App/Alert"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "../SkeletonComponents/SkeletonArticles"
import {IoArrowBackSharp, IoArrowForwardSharp} from "react-icons/io5"
import { useUnreadArticlesQuery } from "../../lib/graphql-generated"
import { useEffect, useState } from "react"
import { useAppContext } from "../Providers/AppContextProvider"
import {Tab} from "@headlessui/react"

export default function UnreadArticleFeed() {

  const app = useAppContext()
  const [after, setAfter] = useState<string|null>(null)
  const [cursorHist, setCursorHist] = useState<[]|string[]>([])

  const [articles, articlesQuery] = useUnreadArticlesQuery({
    variables: {
      id: app.user?.id,
      after: after,
    }
  }) 

  useEffect(() => {
    if (app.refreshPending === true) {
      app.setRefreshPending(false)
      articlesQuery({ requestPolicy: "network-only" })
      setAfter(null)
    }
  }, [ app, articlesQuery ])

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

  const showPagination = articles?.data?.articles?.edges && articles?.data?.articles?.edges?.length > 0 || after !== null ? true : false

  return (
    <Tab.Panel className="overflow-y-scroll">
      <motion.ol variants={feedContainer} initial="hidden" animate="show" className="p-2 m-2 overflow-y-scroll">
        {articles.data?.articles?.edges.map(({ node }) => {
          return <motion.li key={node.title} variants={feedItem}>
            <ArticleCard article={node} />
          </motion.li>
        })}
      </motion.ol>      
      {
        showPagination && <div className="flex justify-between p-4">
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
      }
    </Tab.Panel>
  )

}
