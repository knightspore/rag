import { IoEyeOutline, IoEyeSharp, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Articles, useLikeMutation, useMarkAsReadMutation, useMarkAsUnreadMutation, useUnlikeMutation } from "../../generated/graphql";
import Icon from "../../Icon";
import { useAppContext } from "../../AppContextProvider";
import { motion } from "framer-motion"

export default function ArticleCard({
  article,
  isLiked,
}: {
  article: Partial<Articles>
  isLiked: boolean
}) {

  const { user  } = useAppContext()

  const [read, markRead] = useMarkAsReadMutation()
  const [unread, markUnread] = useMarkAsUnreadMutation()
  const [like, likeMutation] = useLikeMutation()
  const [unlike, unlikeMutation] = useUnlikeMutation()

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
    if (isLiked !== true) {
    user && article.title && article.subscription && likeMutation({ userId: user?.id, article: article.title, subscription: article.subscription })
    if (like) {
      return like
    }
    } else if (isLiked) {
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
        {isLiked ? <IoHeartSharp /> : <IoHeartOutline/>}
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