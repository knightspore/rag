import { Maybe } from "graphql/jsutils/Maybe";

export default function ContentHeader({ title, description = "", url, hostname}: { title: string, description: Maybe<string> | undefined, url: string, hostname: string}) {
	return (
		<>
				<h1 className="text-slate-200">{title}</h1>
				<p>{description}</p>
				<a
						href={url}
						target="_blank"
						rel="noreferrer"
						className="block px-2 py-1 w-max card"
				>
						Read on {hostname}
				</a>
				<hr />
		</>
	)
}