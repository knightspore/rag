import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { fetchSubscription } from "../../lib/fetch";
import { SubscriptionEvent } from "../../types/backend-server";
import { Subscription } from "../../types/backend-vo";
import { UserContext } from "./UserProvider";

type Props = {
  children: React.ReactNode;
};

export const SubscriptionContext = createContext<null | Subscription[]>(null);

export default function SubscriptionContextProvider({ children }: Props) {
  const subscriptions: string[] | null =
    useContext(UserContext)?.subscriptions || null;

  const e: SubscriptionEvent[] | null =
    subscriptions &&
    subscriptions.map((s) => {
      return { id: s };
    });

  const { isLoading, error, data } = useQuery(
    ["subscriptions"],
    () => e && fetchSubscription(e),
    { notifyOnChangeProps: ["data"] }
  );

  if (isLoading || error) {
    return (
      <SubscriptionContext.Provider value={null}>
        {children}
      </SubscriptionContext.Provider>
    );
  }

  return (
    <SubscriptionContext.Provider value={data}>
      {children}
    </SubscriptionContext.Provider>
  );
}
