import ArticleFeed from "../components/Articles/ArticleFeed"
import SubscriptionFeed from "../components/Subscriptions/SubscriptionFeed"
import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp, IoRefreshSharp } from "react-icons/io5"
import { useState } from "react"
import { useAppContext } from "../AppContextProvider"
import { supabase } from "../lib/supabase"
import refreshSubscriptions from "../util/refreshSubscriptions"
import AddSubscriptionForm from "../AddSubscriptionForm"
import Layout from "../components/Layout"

export default function HomePage() {

    const { user, setUser, filters, setFilters } = useAppContext()
    const [refreshing, setRefreshing] = useState(false)

    function signOut() {
        supabase.auth.signOut().finally(() => {
            setUser(null)
            window.location.reload()
        })
    }

    async function handleRefresh() {
        setRefreshing(true)
        user && await refreshSubscriptions(user?.id)
        setRefreshing(false)
        window.location.reload()
    }

    function toggleLikedArticlesFilter() {
        setFilters({ ...filters, liked: !filters.liked })
    }

    function toggleUnreadArticlesFilter() {
        setFilters({ ...filters, unread: !filters.unread })
    }

    return (<Layout signOut={signOut}>
            <section className="pr-2 space-y-2 overflow-x-hidden overflow-y-scroll md:col-span-6">
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
                <ArticleFeed />
                    </section>
            <section className="md:col-span-2">
                <div className="space-y-2">
                    <AddSubscriptionForm />
                    <SubscriptionFeed />
                </div>
            </section>
    </Layout>)
    }