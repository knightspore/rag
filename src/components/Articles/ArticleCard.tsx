import { Articles } from "../../lib/graphql-generated";
import Icon from "../Icon";
import Link from "next/link";
import LikeButton from "../LikeButton";
import MarkAsReadButton from "../MarkAsReadButton";
import { IoShareSharp } from "react-icons/io5";

export default function ArticleCard({
  article,
}: {
  article: Partial<Articles>
}) {
  return (
    <div className={`mb-2 p-2 card ${article.is_read && "opacity-30"}`}>
      <Link prefetch={false} href={`/read/${article.id}`}>
        <h2 className="mb-1 font-medium cursor-pointer">
          <div className="inline-block mr-1 translate-y-[2px]">
            <Icon src={"https://www.google.com/s2/favicons?domain=" + article.url} />
          </div>
          {article.title}
        </h2>
      </Link>
      <div className="flex items-center gap-2 text-slate-400">
        <LikeButton title={article?.title} subscription={article?.subscription} />
        <MarkAsReadButton id={article?.id} is_read={article?.is_read || false}  />
        <button onClick={() => navigator.share({url: article.url, text: article.title + " - Shared from Rag Reader"})}><IoShareSharp /></button>
        <span>{article.subscription}</span>
        &bull;
        {article.pub_date && <time>
          {new Date(article.pub_date).toLocaleTimeString("en-ZA", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
          })}
        </time>}
      </div>
    </div>
  );
}
