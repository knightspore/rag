import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchUser } from "../../lib/fetch";
import { UserEvent } from "../../types/backend-server";
import { User } from "../../types/backend-vo";

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<null | User>(null);

export default function UserContextProvider({ children }: Props) {

  const e: UserEvent = { id: "parabyl" };

  const { isLoading, error, data } = useQuery(
    ["getUser"],
    () => e && fetchUser(e),
    { notifyOnChangeProps: ["data"] }
  );

  if (isLoading || error) {
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
