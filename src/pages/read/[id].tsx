import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IoReturnUpBackSharp } from "react-icons/io5"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useAppContext } from "../../components/AppContext/AppContextProvider"
import ContentHeader from "../../components/Read/ContentHeader"
import SkeletonContent from "../../components/Read/SkeletonContent"
import SkeletonHeader from "../../components/Read/SkeletonHeader"
import { readArticle } from "../../lib/api"
import { Articles, useMarkAsReadMutation } from "../../lib/graphql-generated"

export default function ReadArticlePage() {

	const router = useRouter()
	const { id } = router.query
	const { articles } = useAppContext()
	const [article, setArticle] = useState<Articles|null>(null)
	const [content, setContent] = useState<string>("")
	const [, markRead] = useMarkAsReadMutation()

	useEffect(() => {
		if (article === null ) {
			articles?.map(({ node }) => {
				if (node.id === id) {
					setArticle(node)
				}
			})
		}
	}, [])

	useEffect(() => {		
		async function getContent() {
			if (article !== null) {
				const data = await readArticle(article.url)
				setContent(data.content)
			}
		}
			getContent()
	}, [article])


	useEffect(() => {
		if (article) {
			markRead({
					id: article?.id,
			})
		}
	},[article, markRead])

	const domain = article?.url && new URL(article?.url)

	return (
		<div className="p-4 overflow-x-hidden bg-slate-800">
			<article className="pb-12 mx-auto overflow-x-hidden space-y-4 prose prose-invert line-clamp">
			<button onClick={() => router.back()}>
				<IoReturnUpBackSharp size={16} /> Back
			</button>
			{ domain ? <ContentHeader 
        id={article.id}
        title={article?.title} 
        subscription={article?.subscription} 
        description={article?.description} 
        is_read={article?.is_read || false}
        url={article.url} 
        hostname={domain?.hostname} 
        /> : <SkeletonHeader />}
			{content === ""	? <SkeletonContent/> : 
			<ReactMarkdown className="break-all">
				{content}
			</ReactMarkdown>
			} 
			<button onClick={() => router.back()}>
				<IoReturnUpBackSharp size={16} /> Back
			</button>
			</article>

		</div>
	)
}
