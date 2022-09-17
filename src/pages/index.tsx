import SubscriptionCard from "../components/SubscriptionCard";

const mockSubscription = { 
  title: "Blog Title", 
  icon: "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://ciaran.co.za&size=48" 
}

export default function HomePage() {
  return (
      <div className="flex flex-col w-screen h-screen text-slate-200 bg-gradient-to-b from-slate-900 to-gray-900">
          <header className="flex justify-between p-2 align-middle">
              <div>
                  <h1 className="font-bold">📄 Reader</h1>
              </div>
              <span className="p-1 border">ADD SUB BUTTON</span>
          </header>
          <div className="grid flex-initial grid-cols-1 md:grid-cols-8 overflow-clip">
              <section className="col-span-2 p-2">
                  <h2
            className="mb-2 font-medium select-none text-md"
          >
                      Subscriptions
                  </h2>
                  <div className="flex flex-row flex-wrap gap-2">
                      {/* TODO: Subscription List */}
                      <SubscriptionCard sub={mockSubscription} />
                  </div>
              </section>
              <section
          className="gap-2 p-2 overflow-y-scroll cols-span-1"
        >
                  <h2 className="mb-2 font-medium text-md">Reading List</h2>
                  <div className="flex flex-col gap-2">{/* {articles} */}</div>
              </section>
              {/* Article Content */}
          </div>
      </div>
  )
}
