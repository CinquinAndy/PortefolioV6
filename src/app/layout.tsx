import { Analytics } from '@vercel/analytics/react'
import 'react-toastify/dist/ReactToastify.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { ReactNode } from 'react'

import '@/styles/main.css'
import 'highlight.js/styles/atom-one-dark-reasonable.min.css'

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
