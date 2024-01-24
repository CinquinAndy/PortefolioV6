import { getLocale } from 'next-intl/server'
import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/distorsions.css'
import '@/styles/main.css'
import '@/styles/nav.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import 'react-toastify/dist/ReactToastify.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

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

//function to generate the routes for all the locales
export async function generateStaticParams() {
	return ['en', 'fr'].map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }) {
	console.log('locale', locale)
	// fetch data
	const content_website = await getContentWebsite(locale)

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

export default async function RootLayout({ children, params: { locale } }) {
	return (
		<html className={`${be_vietnam_pro.variable} ${noto_serif.variable}`}>
			<NextIntlClientProvider locale={locale}>
				<GoogleAnalytics gaId="UA-150969790-2" />
				<ToastContainer />
				{/*<NextScript/>*/}
				<body
					className={`relative bg-gradient-to-b from-indigo-1100 to-sky-1100 text-slate-50`}
				>
					{children}
				</body>
			</NextIntlClientProvider>
		</html>
	)
}
