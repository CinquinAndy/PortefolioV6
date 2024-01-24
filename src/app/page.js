import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'
import Services from '@/components/Global/Services'
import Cta from '@/components/Global/Cta'
import Realisations from '@/components/Global/Realisations'
import {
	getArticles,
	getContentWebsite,
	getRealisations,
	getServices,
} from '@/services/getContentWebsite'
import Articles from '@/components/Global/Articles'

export async function generateMetadata({ locale }) {
	// fetch data
	const content_website = await getContentWebsite(locale)
	console.log('locale', locale)

	return {
		title:
			content_website?.attributes?.content_home?.seo?.title ||
			'Andy Cinquin - Entrepreneur & Développeur Freelance',
		description:
			content_website?.attributes?.content_home?.seo?.description ||
			'Portefolio professionnel de Andy Cinquin, développeur informatique Freelance, Nantes et alentours. Développement sur-mesure, web, applicatifs',
		metadataBase: new URL(
			content_website?.attributes?.content_home?.seo?.canonical
		),
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

export default async function Page({ locale }) {
	console.log('locale', locale)

	const content_website = await getContentWebsite(locale)
	const services = await getServices(locale)
	const realisations = await getRealisations(locale)
	const articles = await getArticles(locale)
	return (
		<>
			<Head>
				<title>{content_website?.attributes?.content_home?.seo?.title}</title>
				<meta
					name="description"
					content={content_website?.attributes?.content_home?.seo?.description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_home?.seo?.canonical}
				/>
				<link
					rel="alternate"
					href={content_website?.attributes?.content_home?.seo?.canonical}
					hrefLang={locale}
				/>
			</Head>

			<Nav content_website={content_website} />
			<div>
				<Services content_website={content_website} services={services} />
				<Realisations
					content_website={content_website}
					realisations={realisations}
					slice={3}
					isHome={true}
				/>
				<Articles
					content_website={content_website}
					articles={articles}
					slice={3}
					isHome={true}
				></Articles>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
