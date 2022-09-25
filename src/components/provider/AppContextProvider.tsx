import React, { createContext, useContext, useEffect, useState } from "react"
import { CombinedError } from "urql"
import { gql, useQuery } from "urql"
import { useUserContext } from "./UserContextProvider"
import { definitions } from "../../types/supabase"

type AppContextValue = {
	data: any | undefined,
	fetching: boolean,
	error: CombinedError | undefined,
  articles: string[] | []
} | null

const AppContext = createContext<AppContextValue>(null)

export function useAppContext() {
	const value = useContext(AppContext)
	if (value == null) {
		throw new Error("No AppContext Value")
	} else {
		return value
	}
}

export default function AppContextProvider({ children }: { children: React.ReactNode }) {

	const user = useUserContext()
	const [articles, setArticles] = useState<string[]|[]>([])

	const [{ data, fetching, error }] = useQuery({
		query: gql`
			query getSubscriptions($id: String!) {
					subscriptionsCollection(filter: { user: { eq: $id }}) {
							edges {
									node {
											id
											title
											icon
											articles 
									}
							}
					}
			}
	`,
	variables: {
		id: user.id
	}
	})

	useEffect(() => {
		data && data.subscriptionsCollection.edges.map(({node}:{node: definitions["subscriptions"]}) => {
			node.articles?.forEach((item) => {
				if (typeof(item) == "string" && item?.length >0 ) {
					setArticles((value) => [...value, item])
				}
			})
		})
	}, [data])

	return <AppContext.Provider value={{ data, fetching, error, articles }}>
		{children}
	</AppContext.Provider>

}
