import { motion } from "framer-motion"
import { container, item } from "../../constants/animation"

export default function SkeletonSubscriptions() {

	function Card() {
		return <span
        className="flex items-center gap-2 p-px px-2 font-bold transition-all duration-150 border-2 rounded-sm animate-pulse line-clamp border-slate-700/30 bg-slate-700/30">
        <div className="flex-grow m-auto">
          <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
        </div>
        <div className="w-24 h-4 my-1 rounded-full bg-slate-700/80"/>
      </span>
	}

  return <motion.ol variants={container} initial="hidden" animate="show" className="flex flex-row flex-wrap gap-2">
    <motion.li variants={item}>
    <Card/>
    </motion.li>
    <motion.li variants={item}>
    <Card/>
    </motion.li>
    <motion.li variants={item}>
    <Card/>
    </motion.li>
    </motion.ol>

}