import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import UserContextProvider from '../components/provider/UserContextProvider'
import AuthContextProvider from '../components/provider/AuthContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className="flex flex-col w-screen h-screen p-8 text-slate-200 bg-gradient-to-b from-slate-900 to-gray-900">
    <AuthContextProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </AuthContextProvider>
  </div >
}

export default MyApp
