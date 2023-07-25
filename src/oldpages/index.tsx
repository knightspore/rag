import Head from 'next/head';
import {Tab} from '@headlessui/react';
import FeedControls from '../components/Articles/FeedControls';
import SubscriptionFeed from '../components/Subscriptions/SubscriptionFeed';
import ArticleFeed from '../components/Articles/ArticleFeed';
import LikedArticleFeed from '../components/Articles/LikedArticleFeed';
import UnreadArticleFeed from '../components/Articles/UnreadArticleFeed';
import {useAppContext} from '../components/Providers/AppContextProvider';
import AddSubscriptionForm from '../components/Subscriptions/AddSubscriptionForm';
import {  useState } from 'react';
import { FeedControl } from '../lib/types';

export default function HomePage() {

  const app = useAppContext()
  const [after, setAfter] = useState<string|null>(null)
  const [cursorHist, setCursorHist] = useState<string[]>([])

  const handleNextPage = (cursor: string | null) => {
      after === null 
        ? setCursorHist([""]) 
        : setCursorHist([...cursorHist, after])
      setAfter(cursor)
  }
  const handlePrevPage = () => {
      const hist = cursorHist
      const cursor = hist.pop()
      setCursorHist(hist)
      cursor === "" ? setAfter(null) : setAfter(cursor ?? null)
  }

  const feedControls: FeedControl = {
    after, setAfter, cursorHist, setCursorHist, handleNextPage, handlePrevPage
  }

    return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <Tab.Group
                as="div"
                className="flex flex-col h-screen overflow-hidden"
            >
                {app.onboarding && (
                    <div className="p-4 bg-slate-900">
                        <AddSubscriptionForm />
                    </div>
                )}
                <SubscriptionFeed />
                <FeedControls />
                <ArticleFeed controls={feedControls}/>
                <LikedArticleFeed controls={feedControls}/>
                <UnreadArticleFeed controls={feedControls}/>
            </Tab.Group>
        </>
    );
}
