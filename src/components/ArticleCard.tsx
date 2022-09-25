import { ArticlePreview } from "../types/types";
import Icon from "./Icon";

export default function ArticleCard({
  article,
}: {
  article: ArticlePreview
}) {

  return (
    <div className={`py-1 text-slate-200 border-b-2 border-slate-800 ${article.is_read && "opacity-50"
        }`}>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className="flex items-center mb-1 md:text-lg">
          <div className="pr-2 my-auto">
            <Icon src={"https://www.google.com/s2/favicons?domain=" + article.url} />
          </div>
          <span className="line-clamp-1">
            {article.title}
          </span>
        </h3>
      </a>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-300">
        <a href={article.url} target="_blank" rel="noreferrer noopener">
          <span>{article.subscription}</span>
        </a>
        {article.pub_date && <time className="text-slate-500">
          {new Date(article.pub_date).toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </time>}
      </div>
      <div className="py-1"></div>
    </div>
  );
}

export function SkeletonArticleCard() {
return (
    <div className="text-slate-200 border-b-2 border-slate-800 animate-pulse">
        <h3 className="flex items-center mb-1 text-lg">
          <div className="pr-2 my-auto">
            <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
          </div>
          <div className="h-5 rounded-full bg-slate-300/20 my-1 w-64"/>
        </h3>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-300">
        <div className="h-4 rounded-full bg-slate-300/20 my-1 w-16"/>
        <time className="text-slate-500">
          <div className="h-4 rounded-full bg-slate-500/30 my-1 w-12"/>
        </time>
      </div>
      <div className="py-1"></div>
    </div>
  )
}
