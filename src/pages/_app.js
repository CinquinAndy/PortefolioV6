import '@/styles/globals.css'
import '@/styles/loader.css'
import '@/styles/blog.css'
import '@/styles/burger_menu.css'
import 'react-toastify/dist/ReactToastify.css'

import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<SessionProvider session={session}>
				<Component {...pageProps} />
				<ToastContainer />
			</SessionProvider>
		</>
	)
}
