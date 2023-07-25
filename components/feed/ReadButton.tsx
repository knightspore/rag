/** @format */

'use client';

import {motion} from 'framer-motion';
import {IoEyeOutline, IoEyeSharp} from 'react-icons/io5';
import {markArticleRead} from '../../lib/api';

type Props = {
    article_id: string;
    is_read: boolean;
};

export default function ReadButton({article_id, is_read}: Props) {
    return (
        <motion.button
            onClick={() => markArticleRead(article_id, !is_read)}
            whileTap={{scale: 0.8}}
        >
            {is_read ? <IoEyeSharp size={18} /> : <IoEyeOutline size={18} />}
        </motion.button>
    );
}
