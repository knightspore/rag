import React, { createContext, useContext } from "react"
import type { CombinedError } from "urql"
import { gql, useQuery } from "urql"
import { useUserContext } from "./UserContextProvider"

type AppContextValue = {
	data: any | undefined,
	fetching: boolean,
	error: CombinedError | undefined
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

	return <AppContext.Provider value={{ data, fetching, error }}>
		{children}
	</AppContext.Provider>

}