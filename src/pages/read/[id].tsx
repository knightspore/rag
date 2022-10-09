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
		if (article === null) {
			articles?.forEach(({ node }) => {
				if (node.id === id) {
					setArticle(node)
				}
			})
		}
	}, [article, articles, id])

	useEffect(() => {		
		async function getContent() {
				const data = article?.url && await readArticle(article.url)
				setContent(data.content)
		}
    if (article) {
      getContent()
			markRead({
					id: article?.id,
			})
    }
	}, [article, markRead])

	const domain = article?.url && new URL(article?.url)

	return (
		<div className="bg-slate-800">
			<article className="py-12 mx-auto space-y-4 prose prose-invert line-clamp">
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
			<div>
				<ReactMarkdown>
					{content}
				</ReactMarkdown>
			</div>
			} 
			<button onClick={() => router.back()}>
				<IoReturnUpBackSharp size={16} /> Back
			</button>
			</article>

		</div>
	)
}
