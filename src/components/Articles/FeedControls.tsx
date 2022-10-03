
import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp, IoRefreshSharp } from "react-icons/io5"
import { useState } from "react"
import { useAppContext } from "../../components/AppContext/AppContextProvider"
import { refreshSubscriptions } from "../../lib/api"

export default function FeedControls() {

    const app = useAppContext()
    const [refreshing, setRefreshing] = useState(false)

    async function handleRefresh() {
        setRefreshing(true)
				navigator.vibrate(10)
        app.user && await refreshSubscriptions(app.user?.id)
        setRefreshing(false)
        window.location.reload()
    }

    function toggleLikedArticlesFilter() {
        app.setFilters({ ...app.filters, liked: !app.filters.liked })
    }

    function toggleUnreadArticlesFilter() {
        app.setFilters({ ...app.filters, unread: !app.filters.unread })
    }

	return (
                <div className="flex gap-4">
                    <button onClick={handleRefresh}>
                        Reading List 
                        <IoRefreshSharp size={16} title="Hide previously read posts." className={refreshing ? "animate-spin opacity-50" : ""} />
                    </button>
                    <button onClick={toggleLikedArticlesFilter}>
                        Saved 
                        {app.filters.liked ? <IoHeartSharp size={16} title="Filter: all articles" /> : <IoHeartOutline size={16} title="Filter: saved articles only" />}
                    </button>
                    <button onClick={toggleUnreadArticlesFilter}>
                        Unread
                        {app.filters.unread ? <IoEyeSharp size={16} title="Filter: all articles"/> : <IoEyeOutline size={16} title="Filter: unread articles" />}
                    </button>
                </div>
	)
}