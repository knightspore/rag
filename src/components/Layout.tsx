import Head from "next/head";
import { IoExitSharp } from "react-icons/io5";

type Props = {
	signOut: () => void,
	children: React.ReactNode,
}

export default function Layout({ signOut, children }: Props) {
	return (
        <>
            <Head>
                <title>Reading List - RAG</title>
            </Head>
            <div className="flex flex-col justify-between w-screen h-screen p-4 space-y-2">
                <div className="grid flex-initial grid-cols-1 gap-4 md:grid-cols-8 overflow-clip">
									{children}
                </div>
                <button onClick={signOut}>Log Out <IoExitSharp size={16} /></button>
            </div>
        </>
	)
}