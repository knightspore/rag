/** @format */

import {motion} from 'framer-motion';
import {feedContainer, feedItem} from '../../lib/animation';

export default function SkeletonSubscriptions() {
    function Card() {
        return (
            <span className="flex items-center p-px px-2 font-bold rounded-md gap-2 transition-all duration-150 animate-pulse card">
                <div className="flex-grow m-auto">
                    <div className="w-4 h-4 m-auto overflow-hidden rounded-full bg-slate-700" />
                </div>
                <div className="w-24 h-5 my-1 rounded-full bg-slate-700/80" />
            </span>
        );
    }

    return (
        <div className="relative py-2 shadow-inner bg-slate-900">
            <div className="fixed absolute top-0 bottom-0 right-0 z-30 w-24 bg-gradient-to-l from-slate-900" />
            <motion.ol
                variants={feedContainer}
                initial="hidden"
                animate="show"
                className="relative flex overflow-x-auto no-scrollbar gap-2"
            >
              <div />
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
        </div>
    );
}
