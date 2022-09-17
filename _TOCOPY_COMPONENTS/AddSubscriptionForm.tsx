import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createSubscription } from "../lib/fetch";
import { SubscriptionEvent } from "../types/backend-server";

export default function AddSubscriptionForm() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const event: SubscriptionEvent[] = [
      {
        id: e.target.url.value,
        title: e.target.title.value,
        url: e.target.url.value,
        userId: "parabyl",
      },
    ];

    const res = await createSubscription(event);
    console.log(res);
    if (res === 200) {
      setOpen(false);
      setIsLoading(false);
    } else setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-2 py-1 text-xs font-bold uppercase transition-all rounded-sm hover:bg-slate-800/50 duration-250 bg-slate-800 text-slate-50"
      >
        Add Subscription
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-500/80"
      >
        <Dialog.Panel className="grid gap-2 p-4 rounded-md shadow-lg bg-slate-900 text-slate-200">
          <Dialog.Title>
            <h2>Add Subscription</h2>
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="grid gap-2">
            <input
              className="px-2 py-1 rounded-sm text-slate-800"
              type="text"
              name="title"
              id="title"
              placeholder="Feed Title"
            />
            <input
              className="px-2 py-1 rounded-sm text-slate-800"
              type="text"
              name="url"
              id="url"
              placeholder="https://feed.com/rss.xml"
            />
            <button
              type="submit"
              className="px-2 py-1 text-sm font-bold uppercase transition-all rounded-sm hover:bg-slate-800/50 duration-250 bg-slate-800 text-slate-50 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Subscription"}
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
