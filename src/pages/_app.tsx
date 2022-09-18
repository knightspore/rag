import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../../styles/globals.css'
import UrqlContextProvider from '../components/provider/UrqlContextProvider'
import UserContextProvider from '../components/provider/UserContextProvider'


function MyApp({ Component, pageProps }: AppProps) {
	return <div className="flex flex-col w-screen h-screen p-8 text-slate-200 bg-gradient-to-b from-slate-900 to-gray-900">
		<Head>
			<title>RAG</title>
		</Head>
		<UserContextProvider>
			<UrqlContextProvider>
				<Component {...pageProps} />
			</UrqlContextProvider>
		</UserContextProvider>
	</div >
}

export default MyApp
