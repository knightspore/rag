/** @format */

import Feed from '../../components/feed/Feed';

export default function UnreadFeed() {
    // @ts-expect-error Server Component
    return <Feed unread />;
}
