import { motion } from "framer-motion"
import {Maybe} from "graphql/jsutils/Maybe";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import {useLikeMutation, useUnlikeMutation} from "../lib/graphql-generated";
import {useAppContext} from "./AppContext/AppContextProvider";
import { useQueryContext } from "./QueryContext/QueryContextProvider";

export default function LikeButton({ subscription, title }:{ subscription: Maybe<string>, title: Maybe<string> }) {

  const { user } = useAppContext()
  const { likes } = useQueryContext()
  const [,likeMutation] = useLikeMutation()
  const [,unlikeMutation] = useUnlikeMutation()
  const liked = likes?.includes(title)

  async function handleLike (liked: boolean,  subscription?: string, title?: string) {
    if (liked !== true) {
    await likeMutation({ userId: user?.id, article: title, subscription: subscription })
    } else if (liked) {
      await unlikeMutation({userId: user?.id, articleTitle: title})
    }
  }

  return (
    <motion.button onClick={() => subscription && title && handleLike(liked || false, subscription, title)} className="cursor-pointer" whileTap={{ scale: 0.8 }}>
      {liked ? <IoHeartSharp size={18} />: <IoHeartOutline size={18}/>}
    </motion.button>
  )
}
