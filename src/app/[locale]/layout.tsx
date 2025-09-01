import { ToastContainer } from 'react-toastify'
import type { ReactNode } from 'react'

import { Be_Vietnam_Pro, Noto_Serif_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { dir } from 'i18next'

import { LottieAnimation } from '@/components/Global/Animations/LottieAnimation'

const noto_serif_display = Noto_Serif_Display({
	variable: '--font-noto-serif-display',
	subsets: ['latin'],
})
const be_vietnam_pro = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-be-vietnam-pro',
	subsets: ['latin'],
	style: ['italic', 'normal'],
})

export const metadata = {
	link: [
		// Google Analytics
		{
			rel: 'preconnect',
			href: 'https://www.google-analytics.com',
			crossOrigin: 'anonymous',
		},
		{ rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
		{
			rel: 'preconnect',
			href: 'https://region1.google-analytics.com',
			crossOrigin: 'anonymous',
		},
		{ rel: 'dns-prefetch', href: 'https://region1.google-analytics.com' },

		// wadefade.fr
		{
			rel: 'preconnect',
			href: 'https://umami.wadefade.fr',
			crossOrigin: 'anonymous',
		},
		{ rel: 'dns-prefetch', href: 'https://umami.wadefade.fr' },

		// Cloudinary
		{
			rel: 'preconnect',
			href: 'https://res.cloudinary.com',
			crossOrigin: 'anonymous',
		},
		{ rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
	],
}

interface LocaleLayoutProps {
	children: ReactNode
	params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ params, children }: LocaleLayoutProps) {
	const { locale } = await params
	return (
		<html dir={dir(locale)} lang={locale}>
			<head>
				<Script
					async
					data-website-id="632b6be0-399d-453d-9f3a-b6774d10c081"
					src="https://umami.wadefade.fr/script.js"
					strategy={'afterInteractive'}
				/>
			</head>
			<body className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable}`}>
				{/*<Cursor />*/}
				<LottieAnimation />
				<ToastContainer closeOnClick />
				<GoogleAnalytics gaId="UA-150969790-2" />
				{children}
			</body>
		</html>
	)
}
