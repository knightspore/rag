import { motion } from "framer-motion"
import { feedContainer, feedItem } from "../../lib/animation"

export default function SkeletonSubscriptions() {

	function Card() {
		return <span
        className="flex items-center p-px px-2 font-bold border-2 rounded-sm gap-2 transition-all duration-150 animate-pulse line-clamp border-slate-700/30 bg-slate-700/30">
        <div className="flex-grow m-auto">
          <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
        </div>
        <div className="w-24 h-4 my-1 rounded-full bg-slate-700/80"/>
      </span>
	}

  return <motion.ol variants={feedContainer} initial="hidden" animate="show" className="relative flex overflow-x-auto no-scrollbar gap-2 md:flex-wrap">
    <motion.li variants={feedItem}>
    <Card/>
    </motion.li>
    <motion.li variants={feedItem}>
    <Card/>
    </motion.li>
    <motion.li variants={feedItem}>
    <Card/>
    </motion.li>
    </motion.ol>

}
