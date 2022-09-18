import { describe, expect, it } from "vitest";
import { createMocks } from "node-mocks-http"
import handleGetFeed from "./get";

describe("/api/feed/get", () => {
	it("It parses a feed correctly", async () => {
		const url = "https://news.ycombinator.com/rss"
		const { req, res } = createMocks({
			method: "POST",
			body: {
				url
			}
		})
		await handleGetFeed(req, res)
		expect(res._getStatusCode()).toBe(200)
		expect(JSON.parse(res._getData()).title).toEqual("GroundUp News")
	})
})