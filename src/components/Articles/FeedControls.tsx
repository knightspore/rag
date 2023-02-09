
import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp, IoAddSharp, IoRefreshSharp } from "react-icons/io5"
import { useState } from "react"
import { refreshSubscriptions } from "../../lib/api"
import {useFilterContext} from "../Providers/FilterContextProvider"
import {useAppContext} from "../Providers/AppContextProvider"
import AddSubscriptionForm from "../Subscriptions/AddSubscriptionForm"
import { Disclosure } from "@headlessui/react"
import SignOut from "../Auth/SignOut"

export default function FeedControls() {

    const { user } = useAppContext()
    const { filters, setFilters } = useFilterContext()
    const [refreshing, setRefreshing] = useState(false)

    async function handleRefresh() {
        setRefreshing(true)
        await refreshSubscriptions(user?.id)
        setRefreshing(false)
        location.reload()
    }

    function toggleLikedArticlesFilter() {
        setFilters({ ...filters, liked: !filters.liked })
    }

    function toggleUnreadArticlesFilter() {
        setFilters({ ...filters, unread: !filters.unread })
    }

    return (
        <Disclosure>
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <button onClick={handleRefresh}>
                        Refresh 
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
                    <Disclosure.Button as="button">
                        <h2>Add</h2> <IoAddSharp size={16} />
                    </Disclosure.Button>
                </div>
            <SignOut />
            </div>
            <Disclosure.Panel>
                <AddSubscriptionForm />
            </Disclosure.Panel>
        </Disclosure>
	)
}
