/** @format */

import {Metadata} from 'next';
import Feed from '../components/feed/Feed';

export const metadata: Metadata = {
    title: 'Reading List',
};

export default async function IndexPage() {
    return <Feed />;
}
