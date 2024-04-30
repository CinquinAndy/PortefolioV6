import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastContainer } from 'react-toastify'
import { Be_Vietnam_Pro, Noto_Serif_Display } from 'next/font/google'
import { dir } from 'i18next'
import { LottieAnimation } from '../../components/Global/Animations/LottieAnimation'
import Script from 'next/script'
import Head from 'next/head'

const noto_serif_display = Noto_Serif_Display({
	subsets: ['latin'],
	variable: '--font-noto-serif-display',
})
const be_vietnam_pro = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-be-vietnam-pro',
	style: ['italic', 'normal'],
	subsets: ['latin'],
})

export default function RootLayout({ children, params }) {
	return (
		<html lang={params.locale} dir={dir(params.locale)}>
			<Head>
				{/* Google Analytics */}
				<link
					rel="preconnect"
					href="https://www.google-analytics.com"
					crossOrigin="anonymous"
				/>
				<link rel="dns-prefetch" href="https://www.google-analytics.com" />
				<link
					rel="preconnect"
					href="https://region1.google-analytics.com"
					crossOrigin="anonymous"
				/>
				<link rel="dns-prefetch" href="https://region1.google-analytics.com" />

				{/* wadefade.fr */}
				<link
					rel="preconnect"
					href="https://umami.wadefade.fr"
					crossOrigin="anonymous"
				/>
				<link rel="dns-prefetch" href="https://umami.wadefade.fr" />

				{/* Cloudinary */}
				<link
					rel="preconnect"
					href="https://res.cloudinary.com"
					crossOrigin="anonymous"
				/>
				<link rel="dns-prefetch" href="https://res.cloudinary.com" />
			</Head>

			<Script
				async
				src="https://umami.wadefade.fr/script.js"
				strategy={'afterInteractive'}
				data-website-id="632b6be0-399d-453d-9f3a-b6774d10c081"
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
