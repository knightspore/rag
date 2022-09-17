import Error from "next/error";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchSubscription } from "../lib/fetch";
import { SubscriptionEvent, UserEvent } from "../types/backend-server";
import { Subscription } from "../types/backend-vo";
import { UserContext } from "./context/UserProvider";
import SubscriptionCard from "../src/components/SubscriptionCard";

export default function SubscriptionsList({
  filters,
  subscriptions,
  setFilters,
}: {
  filters: [] | string[];
  subscriptions: string[] | undefined;
  setFilters: Dispatch<SetStateAction<[] | string[]>>;
}) {

  const e: SubscriptionEvent[] | undefined =
    subscriptions &&
    subscriptions.map((s) => {
      return { id: s };
    });

  const { isLoading, error, data } = useQuery(
    ["subscriptions"],
    () => e && fetchSubscription(e),
    { notifyOnChangeProps: ["data"] }
  );

  if (isLoading || !data) {
    const loader = {
      id: "",
      title: "✨ Loading",
      icon: "https://www.google.com/s2/favicons?domain=ciaran.co.za",
    };
    return (
      <SubscriptionCard sub={loader} {...{ filters, setFilters }} />
    ) as any;
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  return data
    .sort((a: Subscription, b: Subscription) => a.title.localeCompare(b.title))
    .map((sub: Subscription) => {
      return (
        sub.icon && (
          <SubscriptionCard key={sub.id} {...{ sub, filters, setFilters }} />
        )
      );
    });
}
