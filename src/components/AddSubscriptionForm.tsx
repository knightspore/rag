import { Dialog } from "@headlessui/react";
import { FeedData } from "feed-reader";
import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase";
import { Article, Subscription } from "../types/types";
import Alert, { Level } from "./Alert";
import { useUserContext } from "./provider/UserContextProvider";
import { v4 as uuidv4 } from 'uuid';

export default function AddSubscriptionForm() {

  const user = useUserContext()
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false)
    setIsLoading(true);

    const res = await fetch("/api/feed/get", {
      method: "POST",
      body: JSON.stringify({ url }),
    })

    if (res.status !== 200) {
      setIsLoading(false)
      setError(true)
    }

    const feed: FeedData = await res.json()
    const date = new Date().toDateString()
    const id = uuidv4()


    const articles: Article[] = feed.entries.map((entry: { title: string, link: string, published: string, description: string }) => {
      const a: Article = {
        id: uuidv4(),
        created_at: date,
        title: entry.title,
        url: entry.link,
        pub_date: entry.published,
        description: entry.description,
        is_read: false,
        subscription: id,
      }
      return a
    })

    const subscription: Subscription = {
      id: id,
      updated_at: date,
      title: feed.title,
      description: feed.description,
      url: url,
      icon: `https://www.google.com/s2/favicons?domain=${url}`,
      user: user.id,
      articles: articles.map(a  => a.id)
    }

    async function addSubscription(sub: Subscription) {
      const { data, error } = await supabase
        .from('subscriptions')
        .upsert({
          ...sub
        })
      return [data, error]
    }

    async function addArticles(art: Article[]) {
    const { data, error } = await supabase
      .from('articles')
      .upsert([
        ...art
      ])
    return [data, error]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [s, sErr] = await addSubscription(subscription)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [a, aErr] = await addArticles(articles)

    if (!sErr && !sErr) {
      setOpen(false);
      setIsLoading(false);
    } else {
      setIsLoading(false)
      setError(true)
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
      >
        Add Subscription
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-700/50"
      >
        <Dialog.Panel className="min-w-lg grid gap-2 p-4 rounded-sm bg-slate-900 text-slate-200">
          <Dialog.Title>
            <h2>Add Subscription</h2>
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="grid gap-2 w-96">
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="url"
              name="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/rss.xml"
            />
            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Subscription"}
            </button>
          </form>
          {error && <Alert text="Error adding feed." level={Level.error} />}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
