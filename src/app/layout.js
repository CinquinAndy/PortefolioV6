import { Analytics } from '@vercel/analytics/react'
import 'react-toastify/dist/ReactToastify.css'

import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/styles/main.css'
import 'highlight.js/styles/atom-one-dark-reasonable.min.css'

export function generateStaticParams() {
	const i18nConfig = {
		locales: ['fr', 'en'],
	}
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({ children }) {
	return (
		<>
			<Analytics />
			<SpeedInsights />
			{children}
		</>
	)
}
