import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastContainer } from 'react-toastify'
import { Be_Vietnam_Pro, Noto_Serif_Display } from 'next/font/google'
import { dir } from 'i18next'
import { LottieAnimation } from '../../components/Global/Animations/LottieAnimation'
import { LowGradientBackground } from '@/components/Global/Animations/LowGradientBackground'
import Script from 'next/script'

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
			<Script
				async
				src="https://umami.wadefade.fr/script.js"
				strategy={'afterInteractive'}
				data-website-id="632b6be0-399d-453d-9f3a-b6774d10c081"
			/>
			<body
				className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable}`}
			>
				<ToastContainer closeOnClick />
				<GoogleAnalytics gaId="UA-150969790-2" />
				<LowGradientBackground />
				<LottieAnimation />
				{children}
			</body>
		</html>
	)
}
