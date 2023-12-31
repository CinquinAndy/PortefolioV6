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
import { useRouter } from 'next/router'

function Portefolio({ content_website, realisations }) {
	const router = useRouter()
	const { locale } = router
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
				<link
					rel="alternate"
					href={
						content_website?.attributes?.content_realisations?.seo?.canonical
					}
					hrefLang={locale}
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

export async function getStaticProps({ locale }) {
	const content_website = await getContentWebsite(locale)
	const realisations = await getRealisations(locale)

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

export default Portefolio
