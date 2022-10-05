import ArticleFeed from "../components/Articles/ArticleFeed"
import SubscriptionFeed from "../components/Subscriptions/SubscriptionFeed"
import AddSubscriptionForm from "../components/Subscriptions/AddSubscriptionForm"
import Layout from "../components/Layout"
import FeedControls from "../components/Articles/FeedControls"
import FilterContextProvider from "../components/FilterContext/FilterContextProvider"

export default function HomePage() {
    return (
        <Layout>
          <FilterContextProvider>
            <section className="pr-2 overflow-x-hidden overflow-y-scroll space-y-2 md:col-span-6">
                  <FeedControls /> 
                  <ArticleFeed />
            </section>
            <section className="md:col-span-2">
                <div className="space-y-2">
                      <AddSubscriptionForm />
                      <SubscriptionFeed />
                </div>
            </section>
          </FilterContextProvider>
        </Layout>
    )
}
