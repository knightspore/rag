import React, { createContext, useContext } from "react"
import { CombinedError } from "urql"
import { gql, useQuery } from "urql"
import { useUserContext } from "./UserContextProvider"

type AppContextValue = {
	data: unknown | undefined,
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

	const AppQuery = gql`
    query {
        subscriptionsCollection(filter: { user: { eq: "${user.id}" }}) {
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
`

	const [{ data, fetching, error }] = useQuery({
		query: AppQuery
	})


  const subs = data?.subscriptionsCollection.edges.map(({node}) => node)
  const articles: string[] = []
  subs && subs.forEach((sub) => {
  sub.articles.forEach(item => {
    articles.push(item)
    })
  })

	return <AppContext.Provider value={{ data, fetching, error, articles }}>
		{children}
	</AppContext.Provider>

}
