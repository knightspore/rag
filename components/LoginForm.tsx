/** @format */

import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {Metadata} from 'next';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {Database} from '../lib/supabase';

export const metadata: Metadata = {
    title: 'Log In',
};

export default async function LoginForm() {
    async function login(formData: FormData) {
        'use server';
        const email = String(formData.get('email'));
        const supabase = createServerActionClient<Database>({cookies});
        const {error} = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: 'http://localhost:3000',
            },
        });
        if (error) {
            console.log(error);
        }
        revalidatePath('/');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
            <h1 className="text-3xl font-bold text-slate-200">
                🗞️ Welcome to RAG
            </h1>
            {/* @ts-expect-error Server Component */}
            <form action={login}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@who.com"
                />
                <button
                    type="submit"
                    className="mx-auto text-lg"
                >
                    Get Sign-In Link
                </button>
            </form>
        </div>
    );
}
