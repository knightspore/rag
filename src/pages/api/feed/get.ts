import { read } from 'feed-reader'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handleGetFeed(
  req: NextApiRequest,
  res: NextApiResponse
) {

	const { url } = req.body

	if (!url) {
		res.status(400).json('{ "error": "No URL Provided" }')
	} else {
		const feed = await read(url)
			.then((feed) => { return feed })
			.catch((err) => { 
				res.status(400).json('{ "error": "Error parsing feed" }')
				throw err
			 })
		return res.status(200).json(feed)
	}
}
