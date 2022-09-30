import ArticleFeed from "../components/Articles/ArticleFeed"
import SubscriptionFeed from "../components/Subscriptions/SubscriptionFeed"
import Head from "next/head"
import { IoExitSharp, IoRefreshSharp } from "react-icons/io5"
import AddSubscriptionForm from "../components/App/AddSubscriptionForm"
import { useState } from "react"
import { useAppContext } from "../components/Provider/AppContextProvider"
import { supabase } from "../lib/supabase"

export default function HomePage() {

    const [refreshing, setRefreshing] = useState(false)
    const { user, setUser } = useAppContext()

    function signOut() {
        supabase.auth.signOut()
        setUser(null)
        setTimeout(() => {
            window.location.reload
        }, 250)
    }

    async function refreshSubscriptions() {
        setRefreshing(true)
        user && await fetch("/api/subscriptions/refresh", {
            method: "POST",
            body: JSON.stringify({
                userId: user.id
            })
        })
        setRefreshing(false)
    }

    return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <div className="flex flex-col justify-between w-screen h-screen p-4">
                <div className="grid flex-initial grid-cols-1 gap-4 md:grid-cols-8 overflow-clip">
                    <section className="md:col-span-2">
                        <div className="space-y-2">
                        <AddSubscriptionForm />
                        <SubscriptionFeed />
                        <button onClick={signOut}>Log Out <IoExitSharp size={16} /></button>
                        </div>
                    </section>
                    <section className="space-y-2 overflow-x-hidden overflow-y-scroll md:col-span-6">
                        <button onClick={refreshSubscriptions}>Reading List <IoRefreshSharp size={16} title="Hide previously read posts." className={refreshing ? "animate-spin opacity-50" : ""} /></button>
                        <ArticleFeed />
                    </section>
                </div>
            </div>
        </>
    )
}
