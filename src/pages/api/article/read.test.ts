import { createMocks } from "node-mocks-http";
import { describe, expect, it } from "vitest";
import handleReadArticle from "./read";

describe("/api/article/read", () => {
	it("Returns text content for corresponding URL", async () => {
		const url = "https://ciaran.co.za/read/smart-contracts-101-for-web-developers"

		const { req, res} = createMocks({
			method: "POST",
			body: {
				url
			}
		})

		await handleReadArticle(req, res)
		expect(res._getStatusCode()).toBe(200)
		const { content } = JSON.parse(res._getData())
		expect(content.title).toEqual("Ethereum Eco-System for Web Developers: Smart Contracts, Tokens & Tools")
		expect(content.byline).toEqual("Ciaran Slemon")

	})
})