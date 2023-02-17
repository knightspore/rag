import { motion } from "framer-motion"
import Alert, { Level } from "../App/Alert"
import { feedContainer, feedItem } from "../../lib/animation"
import ArticleCard from "./ArticleCard"
import SkeletonArticles from "../SkeletonComponents/SkeletonArticles"
import { useUnreadArticlesQuery } from "../../lib/graphql-generated"
import { useEffect } from "react"
import { useAppContext } from "../Providers/AppContextProvider"
import {Tab} from "@headlessui/react"
import Pagination from "./Pagination"
import { FeedControl } from "../../lib/types"

export default function UnreadArticleFeed({ controls }: { controls: FeedControl}) {

  const app = useAppContext()

  const [articles, articlesQuery] = useUnreadArticlesQuery({
    variables: {
      id: app.user?.id,
      after: controls.after,
    }
  }) 

  useEffect(() => {
    if (app.refreshPending === true) {
      app.setRefreshPending(false)
      articlesQuery({ requestPolicy: "network-only" })
      controls.setAfter(null)
    }
  }, [ app, articlesQuery, controls ])

  const showPagination = articles?.data?.articles?.edges && articles?.data?.articles?.edges?.length > 0 || controls.after !== null ? true : false

  if (articles.fetching) return <SkeletonArticles />

  if (articles.error) return <Alert text="Error loading articles..." level={Level.warn} />

  return (
    <Tab.Panel className="pb-16 overflow-y-scroll">
      <motion.ol variants={feedContainer} initial="hidden" animate="show" className="p-2 m-2 overflow-y-scroll">
        {articles.data?.articles?.edges.map(({ node }) => {
          return <motion.li key={node.title} variants={feedItem}>
            <ArticleCard article={node} />
          </motion.li>
        })}
      </motion.ol>      
      {
        showPagination && <Pagination cursor={articles.data?.articles?.pageInfo.endCursor ?? null} controls={controls} />
      }
    </Tab.Panel>
  )

}

