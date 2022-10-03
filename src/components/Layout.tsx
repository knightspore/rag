import Head from "next/head";
import { IoExitSharp } from "react-icons/io5";
import { useAppContext } from "./AppContext/AppContextProvider";
import { supabase } from "../lib/supabase";

type Props = {
	children: React.ReactNode,
}

export default function Layout({ children }: Props) {

    const { setUser } = useAppContext()

    function signOut() {
        supabase.auth.signOut().finally(() => {
            setUser(null)
            window.location.reload()
        })
    }

	return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <div className="flex flex-col justify-between w-screen h-screen p-4 space-y-2">
                <div className="grid flex-initial grid-cols-1 gap-4 md:grid-cols-8 overflow-clip">
                    {children}
                </div>
                <div>
                <button onClick={signOut}>Log Out <IoExitSharp size={16} /></button>
                </div>
            </div>
        </>
	)
}