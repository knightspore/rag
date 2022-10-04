import { Disclosure } from "@headlessui/react";
import { FormEvent, useState } from "react";
import Alert, { Level } from "../Alert";
import { useAppContext } from "../AppContext/AppContextProvider";
import { IoListSharp } from "react-icons/io5";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion"
import { subscriptionForm } from "../../lib/animation";
import { parseFeed } from "../../lib/api";

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
      const { error: sErr } = await supabase
        .from('subscriptions')
        .upsert([
          ...subscriptions
      ])
      const { error: aErr } = await supabase
        .from('articles')
        .upsert([
          ...articles
      ])
      if (sErr || aErr) {
        throw new Error(sErr ? sErr.message : aErr && aErr.message)
      }
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Disclosure>
      <Disclosure.Button
        className="flex items-center border-none gap-2"
      >
        <h2>Subscriptions</h2> <IoListSharp size={16} />
      </Disclosure.Button>
      <Disclosure.Panel>
        <motion.form variants={subscriptionForm} initial="hidden" animate="show" onSubmit={handleSubmit} className="space-y-2">
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
            disabled={url === "" || isLoading}
          >
            {isLoading ? "Adding..." : "Add Subscription"}
          </button>
        </motion.form>
        {error && <Alert text="Error adding feed" level={Level.error} />}
      </Disclosure.Panel>
    </Disclosure>
  );
}
