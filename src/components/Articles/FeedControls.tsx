
import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp, IoRefreshSharp } from "react-icons/io5"
import { useEffect, useState } from "react"
import { refreshSubscriptions } from "../../lib/api"
import {useFilterContext} from "../FilterContext/FilterContextProvider"
import {useAppContext} from "../AppContext/AppContextProvider"

export default function FeedControls() {

    const { user, refreshAppContext } = useAppContext()
    const { filters, setFilters } = useFilterContext()
    const [refreshing, setRefreshing] = useState(false)

    async function handleRefresh() {
        setRefreshing(true)
        await refreshSubscriptions(user?.id)
        setRefreshing(false)
        refreshAppContext()
    }

    function toggleLikedArticlesFilter() {
        setFilters({ ...filters, liked: !filters.liked })
    }

    function toggleUnreadArticlesFilter() {
        setFilters({ ...filters, unread: !filters.unread })
    }

    useEffect(() => {
      async function refresh() {
        setRefreshing(true)
        await refreshSubscriptions(user?.id)
        setRefreshing(false)
        refreshAppContext()
      }
      refresh()
    }, [])

    return (
        <div className="flex gap-4">
            <button onClick={handleRefresh}>
                Reading List 
                <IoRefreshSharp size={16} title="Hide previously read posts." className={refreshing ? "animate-spin opacity-50" : ""} />
            </button>
            <button onClick={toggleLikedArticlesFilter}>
                Saved 
                {filters.liked ? <IoHeartSharp size={16} title="Filter: all articles" /> : <IoHeartOutline size={16} title="Filter: saved articles only" />}
            </button>
            <button onClick={toggleUnreadArticlesFilter}>
                Unread
                {filters.unread ? <IoEyeSharp size={16} title="Filter: all articles"/> : <IoEyeOutline size={16} title="Filter: unread articles" />}
            </button>
        </div>
	)
}
