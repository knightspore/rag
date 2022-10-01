import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Articles, useLikeMutation, useMarkAsReadMutation, useMarkAsUnreadMutation, useUnlikeMutation } from "../../generated/graphql";
import Icon from "../App/Icon";
import { useAppContext } from "../Provider/AppContextProvider";
import { motion } from "framer-motion"

export default function ArticleCard({
  article,
  likes,
}: {
  article: Partial<Articles>
  likes: string[] | null
}) {

  const { user } = useAppContext()

  const [read, markRead] = useMarkAsReadMutation()
  const [unread, markUnread] = useMarkAsUnreadMutation()
  const [like, likeMutation] = useLikeMutation()
  const [unlike, unlikeMutation] = useUnlikeMutation()

  const saved = likes && article.title && likes.includes(article.title)

  const handleMarkAsRead = () => {
    if (!article.is_read) {
      markRead({ id: article.id})
      if (read) {
        return read
      }
    } else if (article.is_read) {
      markUnread({ id: article.id})
      if (unread) {
        return unread
      }
    }
  }

  const handleLike = () => {
    if (!saved) {
    user && article.title && likeMutation({ userId: user?.id, articleTitle: article.title })
    if (like) {
      return like
    }
    } else if (saved) {
      article.title && unlikeMutation({articleTitle: article.title})
      if (unlike) {
        return unlike
      }
    }
  }

  return (
    <div className={`mb-2 p-2 card ${article.is_read && "opacity-30"}`}
      >
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        onClick={handleMarkAsRead}
      >
        <h3 className="mb-1">
          <div className="inline-block mr-1 translate-y-[2px]">
            <Icon src={"https://www.google.com/s2/favicons?domain=" + article.url} />
          </div>
          {article.title}
        </h3>
      </a>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-400">
        <motion.div onClick={handleLike} className="cursor-pointer" whileTap={{ scale: 0.8 }}>
        {saved ? <IoHeartSharp /> : <IoHeartOutline/>}
        </motion.div>
        <motion.div onClick={handleMarkAsRead} whileTap={{ scale: 0.8 }}>
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