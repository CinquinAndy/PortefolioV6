import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/distorsions.css'
import '@/styles/main.css'
import '@/styles/nav.css'
import 'react-toastify/dist/ReactToastify.css'

import Head from 'next/head'
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
			<Component {...pageProps} />
			<ToastContainer />
		</>
	)
}
