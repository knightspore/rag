import ArticleFeed from "../components/ArticleFeed"
import Menu from "../components/Menu"
import SubscriptionFeed from "../components/SubscriptionFeed"

export default function HomePage() {


    return (
        <>
            <Menu />
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
