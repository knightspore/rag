import ArticleFeed from "../components/Articles/ArticleFeed"
import SubscriptionFeed from "../components/Subscriptions/SubscriptionFeed"
import AddSubscriptionForm from "../components/Subscriptions/AddSubscriptionForm"
import Layout from "../components/Layout"
import FeedControls from "../components/Articles/FeedControls"

export default function HomePage() {
    return (
        <Layout>
            <section className="pr-2 space-y-2 overflow-x-hidden overflow-y-scroll md:col-span-6">
                <FeedControls /> 
                <ArticleFeed />
            </section>
            <section className="md:col-span-2">
                <div className="space-y-2">
                    <AddSubscriptionForm />
                    <SubscriptionFeed />
                </div>
            </section>
        </Layout>
    )
}