import React from "react"
import { Provider } from "urql"
import { client } from "../../lib/urql"


export default function UrqlContextProvider({ children }: { children: React.ReactNode }) {
	return <Provider value={client}>
		{children}
	</Provider>
}
