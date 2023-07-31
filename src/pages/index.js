import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'
import Services from '@/components/Global/Services'
import Cta from '@/components/Global/Cta'
import Realisations from '@/components/Global/Realisations'
import {
	getContentWebsite,
	getRealisations,
	getServices,
} from '@/services/getContentWebsite'

export default function Home({ content_website, services, realisations }) {
	return (
		<>
			<Head>
				<title>{content_website?.attributes?.content_home?.seo_title}</title>
				<meta
					name="description"
					content={content_website?.attributes?.content_home?.seo_description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_home?.seo_canonical}
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
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}

export async function getStaticProps({ locale }) {
	const content_website = await getContentWebsite()
	const services = await getServices()
	const realisations = await getRealisations()

	if (!content_website || !services || !realisations) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
			services: services.data,
			realisations: realisations.data,
		},
		revalidate: 10,
	}
}
