import { Articles, useReadArticleMutation } from "../../generated/graphql";
import Icon from "../App/Icon";

export default function ArticleCard({
  article,
}: {
  article: Partial<Articles>
}) {

  const [res, executeMutation] = useReadArticleMutation()

  const handleClick = () => {
    executeMutation({ id: article.id})
    if (res) {
      return res
    }
  }

  return (
    <div className={`py-2 text-slate-200 border-slate-800 ${article.is_read && "opacity-50"
      }`}
      onClick={handleClick}>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className="flex items-center mb-1 text-lg">
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
        </a> &bull;
        {article.pub_date && <time className="text-slate-500">
          {new Date(article.pub_date).toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "2-digit",
          })}
        </time>}
      </div>
    </div>
  );
}