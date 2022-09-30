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
    <div className={`mb-2 p-2 card ${article.is_read && "opacity-30"}`}
      onClick={handleClick}>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className="flex items-center mb-1">
          <div className="mr-2">
            <Icon src={"https://www.google.com/s2/favicons?domain=" + article.url} />
          </div>
          <span className="line-clamp-1">
            {article.title}
          </span>
        </h3>
      </a>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-500">
          <span>{article.subscription}</span>
        &bull;
        {article.pub_date && <time>
          {new Date(article.pub_date).toLocaleTimeString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "2-digit",
            hour: "numeric",
            minute: "2-digit",
          })}
        </time>}
      </div>
    </div>
  );
}