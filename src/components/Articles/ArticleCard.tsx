import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Articles } from "../../generated/graphql";
import Icon from "../../Icon";
import { motion } from "framer-motion"

export default function ArticleCard({
  article,
  isLiked,
  like,
  markRead,
}: {
  article: Partial<Articles>
  isLiked: boolean,
  like: (liked: boolean,  subscription?: string, title?: string) => void,
  markRead: (id: string, is_read?: boolean | null) => void,
}) {
  return (
    <div className={`mb-2 p-2 card ${article.is_read && "opacity-30"}`}
      >
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        onClick={() => markRead(article.id, article.is_read)}
      >
        <h3 className="mb-1">
          <div className="inline-block mr-1 translate-y-[2px]">
            <Icon src={"https://www.google.com/s2/favicons?domain=" + article.url} />
          </div>
          {article.title}
        </h3>
      </a>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-400">
        <motion.div onClick={() => like(isLiked, article.subscription, article.title)} className="cursor-pointer" whileTap={{ scale: 0.8 }}>
        {isLiked ? <IoHeartSharp /> : <IoHeartOutline/>}
        </motion.div>
        <motion.div onClick={() => markRead(article.id, article.is_read)} whileTap={{ scale: 0.8 }}>
        {article.is_read ? <IoEyeSharp /> : <IoEyeOutline />}
        </motion.div>
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