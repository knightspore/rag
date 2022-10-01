import ArticleFeed from "../components/Articles/ArticleFeed"
import SubscriptionFeed from "../components/Subscriptions/SubscriptionFeed"
import Head from "next/head"
import { IoExitSharp, IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp, IoRefreshSharp } from "react-icons/io5"
import { useState } from "react"
import { useAppContext } from "../components/Provider/AppContextProvider"
import { supabase } from "../lib/supabase"
import refreshSubscriptions from "../util/refreshSubscriptions"
import AddSubscriptionForm from "../components/App/AddSubscriptionForm"

export default function HomePage() {

    const [refreshing, setRefreshing] = useState(false)
    const { user, setUser, filters, setFilters } = useAppContext()

    function signOut() {
        supabase.auth.signOut()
        setUser(null)
        setTimeout(() => {
            window.location.reload()
        }, 250)
    }

    async function refresh() {
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

    return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <div className="flex flex-col justify-between w-screen h-screen p-4 space-y-2">
                <div className="grid flex-initial grid-cols-1 gap-4 md:grid-cols-8 overflow-clip">
                    <section className="pr-2 space-y-2 overflow-x-hidden overflow-y-scroll md:col-span-6">
                        <div className="flex gap-4">
                            <button onClick={refresh}>
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

                </div>
                <button onClick={signOut}>Log Out <IoExitSharp size={16} /></button>
            </div>
        </>
    )
}
