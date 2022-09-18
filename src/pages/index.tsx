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
                <b>{user.email}</b>
                <button onClick={signOut}>Sign Out</button>
            </div>
            <div className="grid flex-initial grid-cols-8 overflow-clip">
                <section className="col-span-2 p-2">
                    <h2 className="mb-2 font-medium text-md">Subscriptions</h2>
                    <div className="flex flex-row flex-wrap gap-2">
                        <SubscriptionFeed />
                    </div>
                </section>
                <section className="gap-2 p-2 overflow-y-scroll cols-span-6">
                    <h2 className="mb-2 font-medium text-md">Reading List</h2>
                    <div className="flex flex-col gap-2">
                        ...ReadingList
                    </div>
                </section>
            </div>
        </>
    )
}
