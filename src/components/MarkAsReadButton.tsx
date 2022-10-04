import { motion } from "framer-motion"
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import {useMarkAsReadMutation, useMarkAsUnreadMutation } from "../lib/graphql-generated";

export default function MarkAsReadButton({ id, is_read }:{ id: string, is_read: boolean }) {

  const [,markRead] = useMarkAsReadMutation()
  const [,markUnread] = useMarkAsUnreadMutation()


  async function handleMarkAsRead (id: string, is_read?: boolean | null) {
    if (!is_read) {
      await markRead({ id })
    } else if (is_read) {
      await markUnread({ id })
    }
  }

  return (
    <motion.button onClick={() => handleMarkAsRead(id, is_read)} whileTap={{ scale: 0.8 }}>
      {is_read ? <IoEyeSharp size={18} /> : <IoEyeOutline size={18}/>}
    </motion.button>
  )
}
