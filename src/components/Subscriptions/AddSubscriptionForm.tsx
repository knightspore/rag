/** @format */

import {FormEvent, useState} from 'react';
import Alert, {Level} from '../App/Alert';
import {useAppContext} from '../Providers/AppContextProvider';
import {supabase} from '../../lib/supabase';
import {motion} from 'framer-motion';
import {subscriptionForm} from '../../lib/animation';
import {findFeed, parseFeed} from '../../lib/api';
import {Articles} from '../../lib/graphql-generated';
import {IoAddSharp} from 'react-icons/io5';

export default function AddSubscriptionForm() {
    const {user, setRefreshPending} = useAppContext();
    const [isAdding, setIsAdding] = useState(false);
    const [isFinding, setIsFinding] = useState(false);
    const [error, setError] = useState<boolean | string>(false);
    const [foundURLs, setFoundURLs] = useState<string[] | null>(null);
    const [url, setUrl] = useState('');

    async function addSubscription(feedUrl: string) {
        setError(false);
        setIsAdding(true);
        try {
            const {subscriptions, articles} = await parseFeed(
                feedUrl,
                user?.id
            );
            const distinctArticles = Array.from(
                new Set(articles.map((x: Partial<Articles>) => x.title))
            ).map((title) => {
                const article = articles.find(
                    (a: Partial<Articles>) => a.title === title
                );
                return {
                    title: title,
                    ...article,
                };
            });
            const {error: sErr} = await supabase
                .from('subscriptions')
                .upsert([...subscriptions]);
            if (sErr) {
                throw new Error(`Subscription Error: ${sErr.message}`);
            }
            const {error: aErr} = await supabase
                .from('articles')
                .upsert([...distinctArticles]);

            if (aErr) {
                throw new Error(`Articles Error: ${aErr.message}`);
            }
            setRefreshPending(true);
            setUrl('');
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsAdding(false);
        }
    }

    async function findURLs(baseUrl: string) {
        setIsFinding(true);
        setFoundURLs(null);
        const feeds = await findFeed(baseUrl, user?.id);
        if (feeds[0].length === 0) {
            setError("Couldn't find any feeds :(");
        } else {
            setFoundURLs(feeds);
        }
        setIsFinding(false);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        findURLs(url);
    };

    return (
        <>
            <motion.form
                variants={subscriptionForm}
                initial="hidden"
                animate="show"
                onSubmit={handleSubmit}
            >
                <input
                    type="url"
                    name="url"
                    id="url"
                    className="relative col-span-3"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                />
                <button
                    type="submit"
                    disabled={url === '' || isAdding}
                    className="relative col-span-2"
                >
                    <p className="p-2">
                        {isFinding ? 'Finding Feeds...' : 'Find Feeds'}
                    </p>
                </button>
                {foundURLs && (
                    <div className="flex flex-col p-2 gap-2">
                        <div className="flex items-center text-sm font-medium gap-2">
                            {foundURLs.map((url) => {
                                return (
                                    <button
                                        type="button"
                                        key={url}
                                        className="p-2 py-1 bg-slate-600 rounded-md"
                                        onClick={() => addSubscription(url)}
                                    >
                                        <IoAddSharp
                                            className={
                                                isAdding ? 'animate-spin' : ''
                                            }
                                            size={12}
                                        />{' '}
                                        <p>{url}</p>
                                    </button>
                                );
                            })}
                        </div>
                        {foundURLs.length >= 2 && (
                            <p className="text-sm text-slate-500">
                                If you are not sure which to add, just choose
                                the first.
                            </p>
                        )}
                    </div>
                )}
            </motion.form>
            {error && (
                <Alert
                    text={`${error}`}
                    level={Level.error}
                />
            )}
        </>
    );
}
