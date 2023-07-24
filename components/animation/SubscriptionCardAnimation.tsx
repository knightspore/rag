/** @format */

'use client';
import {motion} from 'framer-motion';

export default function SubscriptionCardAnimation({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.li
            className="py-2"
            variants={{
                hidden: {opacity: 0, translateX: '-5%'},
                show: {opacity: 1, translateX: '0%'},
                exit: {opacity: 0, translateX: '-5%'},
            }}
        >
            {children}
        </motion.li>
    );
}
