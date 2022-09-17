import Error from "next/error";
import { useQuery } from "react-query";
import { fetchReadingList } from "../lib/fetch";
import { UserEvent } from "../types/backend-server";
import { Article } from "../types/backend-vo";
import ArticleCard from "./ArticleCard";

export default function RecentArticlesFeed({
  setFocus,
  filters,
}: {
  setFocus: Function;
  filters: [string] | [];
}) {
  const e: UserEvent[] = [{ id: "parabyl" }];
  const { isLoading, error, data } = useQuery(
    ["readingList"],
    () => fetchReadingList(e),
    {
      notifyOnChangeProps: ["data"],
    }
  );

  if (isLoading || !data) {
    return <div className="p-4 text-center">✨ Loading Feeds...</div>;
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  return data.map((article: Article) => {
    return (
      !filters.includes(article.parent) && (
        <ArticleCard key={article.id} {...{ article, setFocus }} />
      )
    );
  });
}
