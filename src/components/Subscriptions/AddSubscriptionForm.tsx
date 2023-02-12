import { FormEvent, useState } from "react";
import Alert, { Level } from "../App/Alert";
import { useAppContext } from "../Providers/AppContextProvider";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion"
import { subscriptionForm } from "../../lib/animation";
import { parseFeed } from "../../lib/api";
import {Articles} from "../../lib/graphql-generated";

export default function AddSubscriptionForm() {

  const { user } = useAppContext()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false)
  const [url, setUrl] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false)
    setIsLoading(true);
    try {
      if (!user) {
        setError("No user present")
        return
      }
      const { subscriptions, articles } = await parseFeed(url, user.id)
      const distinctArticles = Array.from(new Set(articles.map((x: Partial<Articles>) => x.title))).map(title => {
        const article = articles.find((a: Partial<Articles>) => a.title === title)
        return {
          title: title,
          ...article

        }
      })
      const { error: sErr } = await supabase
        .from('subscriptions')
        .upsert([
          ...subscriptions
      ])
      const { error: aErr } = await supabase
        .from('articles')
        .upsert([
          ...distinctArticles
      ])
      if (sErr || aErr) {
        throw new Error(sErr ? 
          "Subscription Error: " + sErr.message : 
          aErr && "Articles Error: " + aErr.message)
      }
      location.reload()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <motion.form variants={subscriptionForm} initial="hidden" animate="show" onSubmit={handleSubmit}>
          <input
            type="url"
            name="url"
            id="url"
            className="col-span-3"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/rss.xml"
          />
          <button
            type="submit"
            disabled={url === "" || isLoading}
            className="col-span-2"
          >
          <p className="mt-2">
            {isLoading ? "Adding..." : "Add Subscription"}
          </p>
          </button>
        </motion.form>
        {error && <Alert text="Error adding feed" level={Level.error} />}
    </>
  );
}
