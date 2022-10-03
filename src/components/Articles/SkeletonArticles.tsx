
import { motion } from "framer-motion"
import { feedContainer, feedItem } from "../../lib/animation"

export default function SkeletonArticles() {

  function Card() {
    return <div className="py-2 text-slate-200 border-slate-800 animate-pulse">
      <h3 className="flex items-center mb-1 text-lg">
        <div className="pr-2 my-auto">
          <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
        </div>
        <div className="w-64 h-5 my-1 rounded-full bg-slate-300/20" />
      </h3>
      <div className="flex items-center gap-2 text-sm italic font-medium text-slate-300">
        <div className="w-16 h-4 my-1 rounded-full bg-slate-300/20" /> <span className="opacity-50">&bull;</span>
        <time className="text-slate-500">
          <div className="w-12 h-4 my-1 rounded-full bg-slate-500/30" />
        </time>
      </div>
    </div>
  }

  return (
    <motion.ol variants={feedContainer} initial="hidden" animate="show">
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
      <motion.li variants={feedItem}>
        <Card />
      </motion.li>
    </motion.ol>
  )
}