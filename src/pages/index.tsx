import AddSubscriptionForm from "../components/AddSubscriptionForm"
import ArticleFeed from "../components/ArticleFeed"
import { useUserContext } from "../components/provider/UserContextProvider"
import SubscriptionFeed from "../components/SubscriptionFeed"
import { supabase } from "../lib/supabase"

export default function HomePage() {

    const user = useUserContext()
    const signOut = () => {
        supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <>
            <div className="flex items-center justify-end gap-2 p-2">
                <AddSubscriptionForm />
                <button onClick={signOut}>Log Out: {user.email}</button>
            </div>
            <div className="grid flex-initial grid-cols-1 gap-4 md:grid-cols-8 overflow-clip">
                <section className="md:col-span-2">
                    <h2 className="mb-2 font-medium text-md">Subscriptions</h2>
                    <div>
                        <SubscriptionFeed />
                    </div>
                </section>
                <section className="gap-2 overflow-y-scroll md:col-span-6">
                    <h2 className="mb-2 font-medium text-md">Reading List</h2>
                    <div className="flex flex-col gap-2">
                      <ArticleFeed />
                    </div>
                </section>
            </div>
        </>
    )
}
