/** @format */

'use client';
import {motion} from 'framer-motion';

export default function SubscriptionFeedAnimation({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.ol
            variants={{
                hidden: {opacity: 0},
                show: {
                    opacity: 1,
                    transition: {staggerChildren: 0.08},
                },
            }}
            initial="hidden"
            animate="show"
            className="relative flex overflow-x-auto no-scrollbar gap-2"
        >
            {children}
        </motion.ol>
    );
}
