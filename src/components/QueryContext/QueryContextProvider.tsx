import React, { createContext, useContext } from "react"
import { OperationContext } from "urql"
import { useLikesQuery } from "../../lib/graphql-generated"
import { useAppContext } from "../AppContext/AppContextProvider"

export type QueryContextValue = {
	likes: (string | null | undefined)[] | undefined,
  refreshLikes: (args?: Partial<OperationContext>) => void 
}

const QueryContext = createContext<QueryContextValue>({} as QueryContextValue)

export function useQueryContext() {
	const value = useContext(QueryContext)
	if (value === null) {
		throw new Error("No QueryContext Value")
	} else {
		return value as QueryContextValue
	}
}

export default function QueryContextProvider({ children }: { children: React.ReactNode}) {

	const { user } = useAppContext()

	const [likes, likesQuery] = useLikesQuery({
		variables: {
			id: user?.id
		}
	})

	const value: QueryContextValue = {
		likes: likes.data?.likes?.edges.map(({ node }) => {
			return node?.article_title
		}), 
    refreshLikes: (args) => likesQuery({ ...args, requestPolicy: "network-only" }),
	}

	return (
		<QueryContext.Provider value={value}>
			{children}
		</QueryContext.Provider>
	)
}