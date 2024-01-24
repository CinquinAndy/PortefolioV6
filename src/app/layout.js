import { GoogleAnalytics } from '@next/third-parties/google'
import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/distorsions.css'
import '@/styles/main.css'
import '@/styles/nav.css'
import 'react-toastify/dist/ReactToastify.css'

import { Be_Vietnam_Pro, Noto_Serif } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
// import { NextScript } from 'next/document'
import { getContentWebsite } from '@/services/getContentWebsite'

const be_vietnam_pro = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: '--font-be-vietnam-pro',
	style: ['normal', 'italic'],
})

const noto_serif = Noto_Serif({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: '--font-noto-serif',
	style: ['normal', 'italic'],
})

export async function generateMetadata({ locale }) {
	// fetch data
	const content_website = await getContentWebsite(locale)
	console.log('locale', locale)

	return {
		title:
			content_website?.metadata_title ||
			'Andy Cinquin - Entrepreneur & Développeur Freelance',
		description:
			content_website?.metadata_description ||
			'Portefolio professionnel de Andy Cinquin, développeur informatique Freelance, Nantes et alentours. Développement sur-mesure, web, applicatifs',
		metadataBase: new URL(`https://andy-cinquin.fr`),
		alternates: {
			canonical: '/',
			languages: {
				'fr-FR': '/',
				'en-US': 'https://andy-cinquin.com',
			},
		},
		icons: {
			icon: `${process.env.NEXT_PUBLIC_URL}/favicon.webp`,
		},
	}
}

export default async function RootLayout({ children }) {
	return (
		<>
			<html className={`${be_vietnam_pro.variable} ${noto_serif.variable}`}>
				<GoogleAnalytics gaId="UA-150969790-2" />
				<ToastContainer />
				{/*<NextScript/>*/}
				<body
					className={`relative bg-gradient-to-b from-indigo-1100 to-sky-1100 text-slate-50`}
				>
					{children}
				</body>
			</html>
		</>
	)
}
