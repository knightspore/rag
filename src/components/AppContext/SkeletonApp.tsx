import SkeletonArticles from "../../components/Articles/SkeletonArticles";
import Layout from "../../components/Layout";
import SkeletonSubscriptions from "../../components/Subscriptions/SkeletonSubscriptions";

export default function SkeletonApp() {
  return <Layout>
            <section className="pr-2 overflow-x-hidden overflow-y-scroll space-y-2 md:col-span-6">
                {/* <FeedControls /> */} 
                <SkeletonArticles />
            </section>
            <section className="md:col-span-2">
                <div className="space-y-2">
                    {/* <AddSubscriptionForm /> */}
                    <SkeletonSubscriptions />
                </div>
            </section>
  </Layout>
}
