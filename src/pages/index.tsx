import ArticleCard from "../components/ArticleCard";
import { useUserContext } from "../components/provider/UserContextProvider";
import SubscriptionCard from "../components/SubscriptionCard";

export default function HomePage() {
    const { subscriptions, readingList } = useUserContext()

    return (
        <div className="grid flex-initial grid-cols-1 md:grid-cols-8 overflow-clip">
            <section className="col-span-2 p-2">
                <h2 className="mb-2 font-medium text-md">Subscriptions</h2>
                <div className="flex flex-row flex-wrap gap-2">
                    {subscriptions.map(sub => <SubscriptionCard key={sub.title} {...{ sub }} />)}
                </div>
            </section>
            <section className="gap-2 p-2 overflow-y-scroll cols-span-1">
                <h2 className="mb-2 font-medium text-md">Reading List</h2>
                <div className="flex flex-col gap-2">
                    {readingList.map(article => <ArticleCard key={article.title} {...{ article }} />)}
                </div>
            </section>
        </div>
    )
}
