import { Readability } from "@mozilla/readability";
import { NextApiRequest, NextApiResponse } from "next";
import {JSDOM} from 'jsdom'
import fetch from "cross-fetch";


export default async function handleReadArticle(
	req: NextApiRequest,
	res: NextApiResponse,	
) {

		const { url } = req.body

		if (!url) {
			res.status(400).json('{ "error": "No URL Provided" }')
		} else {
			const html = await fetch(url)
				.then(data => { return data.text() })
				
			const { document } = (new JSDOM(html)).window
			const article = new Readability(document).parse()
			return res.status(200).json({content: article})
		}

}