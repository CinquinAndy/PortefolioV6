import React from 'react'
import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Realisations from '@/components/Global/Realisations'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import {
	getContentWebsite,
	getRealisations,
} from '@/services/getContentWebsite'

function Blog({ content_website, articles }) {
	return (
		<>
			<Head>
				<title>
					{content_website?.attributes?.content_realisations?.seo?.title}
				</title>
				<meta
					name="description"
					content={
						content_website?.attributes?.content_realisations?.seo?.description
					}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={
						content_website?.attributes?.content_realisations?.seo?.canonical
					}
				/>
			</Head>

			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_realisations?.seo?.h1}
			/>
			<div>
				<Realisations
					content_website={content_website}
					realisations={realisations}
					slice={false}
					isHome={true}
				/>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}

export async function getStaticProps() {
	const content_website = await getContentWebsite()
	const realisations = await getRealisations()

	if (!content_website || !realisations) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
			realisations: realisations.data,
		},
		revalidate: 10,
	}
}

export default Blog
