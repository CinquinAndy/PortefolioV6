import { ToastContainer } from 'react-toastify'

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
	style: ['italic', 'normal'],
	subsets: ['latin'],
})

export const metadata = {
	link: [
		// Google Analytics
		{
			href: 'https://www.google-analytics.com',
			crossOrigin: 'anonymous',
			rel: 'preconnect',
		},
		{ href: 'https://www.google-analytics.com', rel: 'dns-prefetch' },
		{
			href: 'https://region1.google-analytics.com',
			crossOrigin: 'anonymous',
			rel: 'preconnect',
		},
		{ href: 'https://region1.google-analytics.com', rel: 'dns-prefetch' },

		// wadefade.fr
		{
			href: 'https://umami.wadefade.fr',
			crossOrigin: 'anonymous',
			rel: 'preconnect',
		},
		{ href: 'https://umami.wadefade.fr', rel: 'dns-prefetch' },

		// Cloudinary
		{
			href: 'https://res.cloudinary.com',
			crossOrigin: 'anonymous',
			rel: 'preconnect',
		},
		{ href: 'https://res.cloudinary.com', rel: 'dns-prefetch' },
	],
}

export default async function RootLayout({ children, params }) {
	const { locale } = await params
	return (
		<html dir={dir(locale)} lang={locale}>
			<Script
				async
				data-website-id="632b6be0-399d-453d-9f3a-b6774d10c081"
				src="https://umami.wadefade.fr/script.js"
				strategy={'afterInteractive'}
			/>

			<body
				className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable}`}
			>
				{/*<Cursor />*/}
				<LottieAnimation />
				<ToastContainer closeOnClick />
				<GoogleAnalytics gaId="UA-150969790-2" />
				{children}
			</body>
		</html>
	)
}
