import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastContainer } from 'react-toastify'
import { Be_Vietnam_Pro, Noto_Serif_Display } from 'next/font/google'
import { dir } from 'i18next'
import { GradientBackground } from '../../components/Global/GradientBackground'
import { LottieAnimation } from '../../components/Global/LottieAnimation'

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
			<body
				className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable}`}
			>
				<ToastContainer />
				<GoogleAnalytics gaId="UA-150969790-2" />
				<LottieAnimation />
				<GradientBackground />
				{children}
			</body>
		</html>
	)
}
