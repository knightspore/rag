import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { describe, expect, it } from "vitest";
import { MOCK_SUBSCRIPTIONS } from "../../mocks";
import UserContextProvider, { useUserContext } from "./UserContextProvider";


describe("UserContextProvider", () => {
	it("Provides subscriptions to the user", () => {

		function TestComponent() {
			const { subscriptions, setSubscriptions } = useUserContext()
			useEffect(() => {
				setSubscriptions(MOCK_SUBSCRIPTIONS)
			}, [setSubscriptions])
			return (
				<UserContextProvider>
					{subscriptions.map((s) => {
						return <p key={s.title}>{s.title}</p>
					})}
				</UserContextProvider>
			)
		}

		render(<UserContextProvider>
			<TestComponent />
		</UserContextProvider>)

		expect(screen.getByText("GroundUp News")).toBeDefined
		expect(screen.getByText("Protocol")).toBeDefined
		expect(screen.getByText("Hacker News")).toBeDefined

	})
})