import { ArticlePreview } from "../types/types";
import Icon from "./Icon";

export default function ArticleCard({
  article,
}: {
  article: ArticlePreview
}) {


  return (
    <div
      key={article.url}
      className={`cursor-pointer hover:opacity-50 transition-all duration-150 text-slate-200 ${
        article.is_read && "opacity-50"
      }`}
    >
      <h3 className="mb-1 text-lg">
        <div className="inline-block pr-2 translate-y-1">
          <Icon src={article.url} />
        </div>
        {article.title}
      </h3>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-300">
        <a href={article.url} target="_blank" rel="noreferrer noopener">
          <span>{article.subscription}</span>
        </a>
        <time className="text-slate-500">
          {new Date(article.pub_date).toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </time>
      </div>
      <div className="py-1"></div>
    </div>
  );
}
