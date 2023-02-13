import { Articles } from "../../lib/graphql-generated";
import Icon from "../App/Icon";
import Link from "next/link";
import LikeButton from "./LikeButton";
import MarkAsReadButton from "./MarkAsReadButton";
import { IoShareSharp } from "react-icons/io5";
import {RWebShare} from "react-web-share";

export default function ArticleCard({
  article,
}: {
  article: Partial<Articles>
}) {
  return (
    <div className={`mb-2 p-2 card ${article.is_read && "opacity-30"}`}>
      <Link prefetch={false} href={`/read/${article.id}`}>
        <div className="text-slate-400">
          <div className="inline-block mr-1 translate-y-[2px]">
            <Icon src={"https://www.google.com/s2/favicons?domain=" + article.url} />
          </div>
          {article.subscription}
        </div>
      </Link>
      <h2 className="mb-1 text-xl font-medium cursor-pointer">
        {article.title}
      </h2>
      <div className="flex items-center gap-2 text-slate-400">
        <LikeButton title={article.title} subscription={article.subscription} />
        <MarkAsReadButton id={article?.id} is_read={article?.is_read || false}  />
        <RWebShare data={{
            text: `${article.title} (${article.subscription})`,
            url: article.url,
            title: `${article.title} | Shared from RAG RSS Reader`,

        }}>
          <button><IoShareSharp /></button>
        </RWebShare>
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
