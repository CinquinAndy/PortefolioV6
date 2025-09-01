import { Analytics } from '@vercel/analytics/react'
import 'react-toastify/dist/ReactToastify.css'
import type { ReactNode } from 'react'

import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/styles/main.css'
import 'highlight.js/styles/atom-one-dark-reasonable.min.css'

interface I18nConfig {
	locales: string[]
}

export function generateStaticParams(): { locale: string }[] {
	const i18nConfig: I18nConfig = {
		locales: ['fr', 'en'],
	}
	return i18nConfig.locales.map(locale => ({ locale }))
}

interface RootLayoutProps {
	children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<Analytics />
			<SpeedInsights />
			{children}
		</>
	)
}
