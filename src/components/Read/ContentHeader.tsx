import { Maybe } from "graphql/jsutils/Maybe";
import LikeButton from "../../components/LikeButton"
import MarkAsReadButton from "../MarkAsReadButton";
export default function ContentHeader({ id, title = "", subscription = "",  is_read = true, description = "", url, hostname}: { id: string, title: Maybe<string>, subscription: Maybe<string>, is_read: boolean, description: Maybe<string> | undefined, url: string, hostname: Maybe<string>}) {

	return (
		<>
				<h1 className="text-slate-200">{title}</h1>
				{ description && description.startsWith("<") 
					? <p dangerouslySetInnerHTML={{ __html: description }} /> 
					: <p>{description}</p>
				}
				<a
						href={url}
						target="_blank"
						rel="noreferrer"
				>
						Read on {hostname}
				</a>
        <div className="flex gap-2">
          <LikeButton title={title} subscription={subscription} />
          <MarkAsReadButton id={id} is_read={is_read} />
        </div>
				<hr />
		</>
	)
}
