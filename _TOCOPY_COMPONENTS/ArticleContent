import ReactMarkdown from "react-markdown";

export default function ArticleContent({
  text,
  closeArticle,
}: {
  text: string;
  closeArticle: Function;
}) {
  return (
    <div className="absolute w-full h-full overflow-y-scroll bg-slate-900/95 overflow-none">
      <div
        className="fixed flex items-center justify-center w-6 h-6 rounded-full bg-slate-500 right-8 top-16 "
        onClick={() => closeArticle()}
      >
        ✖
      </div>
      <ReactMarkdown className="p-4 mx-auto overflow-y-scroll bg-transparent prose prose-invert">
        {text}
      </ReactMarkdown>
    </div>
  );
}
