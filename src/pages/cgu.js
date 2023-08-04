import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'
import Cta from '@/components/Global/Cta'
import { getContentWebsite } from '@/services/getContentWebsite'

export default function Home({
	content_website,
	services,
	realisations,
	articles,
}) {
	return (
		<>
			<Head>
				<title>{content_website?.attributes?.content_cgu?.seo_title}</title>
				<meta
					name="description"
					content={content_website?.attributes?.content_cgu?.seo_description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_cgu?.seo_canonical}
				/>
			</Head>

			<Nav content_website={content_website} />
			<div>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}

export async function getStaticProps({ locale }) {
	const content_website = await getContentWebsite(locale)

	if (!content_website) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
		},
		revalidate: 10,
	}
}
