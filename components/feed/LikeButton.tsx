/** @format */

'use client';

import {motion} from 'framer-motion';
import {IoHeartOutline, IoHeartSharp} from 'react-icons/io5';
import {likeArticle, unlikeArticle} from '../../lib/api';

type Props = {
    user_id?: string;
    subscription: string;
    title: string;
    liked: boolean;
};

export default function LikeButton({
    user_id,
    subscription,
    title,
    liked,
}: Props) {
    return (
        <motion.button
            onClick={() =>
                liked
                    ? unlikeArticle(title)
                    : likeArticle(title, subscription, user_id)
            }
            className="cursor-pointer"
            whileTap={{scale: 0.8}}
        >
            {liked ? <IoHeartSharp size={18} /> : <IoHeartOutline size={18} />}
        </motion.button>
    );
}
