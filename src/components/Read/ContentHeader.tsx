import { Maybe } from "graphql/jsutils/Maybe";
import LikeButton from "../../components/LikeButton"
import MarkAsReadButton from "../MarkAsReadButton";
export default function ContentHeader({ id, title, subscription,  is_read, description = "", url, hostname}: { id: string, title: string, subscription: string, is_read: boolean, description: Maybe<string> | undefined, url: string, hostname: string}) {

	return (
		<>
				<h1 className="text-slate-200">{title}</h1>
				<p>{description}</p>
        <div className="flex gap-2">
          <LikeButton title={title} subscription={subscription} />
          <MarkAsReadButton id={id} is_read={is_read} />
        </div>
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
