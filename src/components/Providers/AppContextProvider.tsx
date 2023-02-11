/** @format */

import {User} from '@supabase/supabase-js';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useLikesQuery} from '../../lib/graphql-generated';
import {getCurrentUser} from '../../lib/supabase';
import SignIn from '../Auth/SignIn';

export type AppContextValue = {
    user: User | null;
    setUser: (value: null) => void;
    likes: Array<string>;
    refreshLikes: () => void;
};

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function useAppContext() {
    const value = useContext(AppContext);
    if (value === null) {
        throw new Error('No AppContext Value');
    } else {
        return value as AppContextValue;
    }
}

export default function AppContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AppContextValue['user']>(null);

    useEffect(() => {
        async function login() {
            setLoading(true);
            const u = await getCurrentUser();
            setUser(u);
            setLoading(false);
        }
        if (!user) {
            login();
        }
    }, [user]);

    const [likes, refreshLikes] = useLikesQuery({
        variables: {
            id: user?.id,
        },
    });

    function filteredLikes(): Array<string> {
        const valid: Array<string> = [];
        likes.data?.likes?.edges.forEach(({node}) => {
            const title = node?.article_title;
            if (title !== null && title !== undefined) {
                valid.push(title);
            }
        });

        return valid;
    }

    const value: AppContextValue = {
        user,
        setUser,
        likes: filteredLikes(),
        refreshLikes: refreshLikes,
    };

    return loading ? (
        <div className="w-screen h-screen bg-slate-800" />
    ) : (
        <AppContext.Provider value={value}>
            {user ? children : <SignIn />}
        </AppContext.Provider>
    );
}
