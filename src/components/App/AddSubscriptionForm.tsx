import { Dialog } from "@headlessui/react";
import { FormEvent, useState } from "react";
import { addArticles } from "../../lib/db/articles";
import { addSubscription } from "../../lib/db/subscriptions";
import Alert, { Level } from "./Alert";
import { useAppContext } from "../Provider/AppContextProvider";

export default function AddSubscriptionForm() {

  const { user } = useAppContext()
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean|string>(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  async function parseFeed(url: string, userId: string) {
      const res = await fetch("/api/feed/get", {
          method: "POST",
          body: JSON.stringify({
              url: url,
              userId: userId
          })
      })
      const data = await res.json()
      return data
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false)
    setIsLoading(true);
    try {
      if (!user) {
        setError("No user present")
        return
      }
      const { subscription, articles } = await parseFeed(url, user.id)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars 
      const sErr = await addSubscription(subscription)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars 
      const aErr = await addArticles(articles)
      if (sErr || aErr) {
        throw new Error(sErr ? sErr.message : aErr && aErr.message)
      }
      window.location.reload()
    } catch (e) {
      setIsLoading(false)
      setError((e as Error).message)
    } finally {
      setIsLoading(false);
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
        <Dialog.Panel className="z-30 p-4 rounded-sm grid gap-4 min-w-lg bg-slate-900 text-slate-200">
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
            <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
            >
            {isLoading ? "Adding..." : "Add Subscription"}
            </button>
            </div>
          </form>
          {error && <Alert text="Error adding feed" level={Level.error} />}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
