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
import { useRouter } from 'next/router'

export default function Home({
	content_website,
	services,
	realisations,
	articles,
}) {
	const router = useRouter()
	const { locale } = router
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

export async function getStaticProps({ locale }) {
	const content_website = await getContentWebsite(locale)
	const services = await getServices(locale)
	const realisations = await getRealisations(locale)
	const articles = await getArticles(locale)

	if (!content_website || !services || !realisations || !articles) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
			services: services.data,
			realisations: realisations.data,
			articles: articles.data,
		},
		revalidate: 10,
	}
}
