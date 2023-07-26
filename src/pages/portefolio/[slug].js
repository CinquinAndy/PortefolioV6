import React from 'react'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Global/Layout'
import Cta from '@/components/Global/CTA'
import {
	getContentWebsite,
	getRealisationBySlug,
	getRealisationPaths,
	processRealisationData,
} from '@/services/getContentWebsite'

/**
 * @param props
 * @constructor
 */
function Talent({ content_website, realisations }) {
	let router = useRouter()

	return (
		<>
			<Head>
				<title>{realisations?.attributes?.seo_title}</title>
				<meta
					name="description"
					content={realisations?.attributes?.seo_description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_URL}/portefolio/${realisations?.attributes?.slug}`}
				/>
			</Head>

			<Nav
				content_website={content_website}
				isHome={false}
				h1={realisations?.attributes?.title}
			/>
			<div>
				<div className={'relative'}>
					<div
						className={'relative mx-auto my-24 max-w-7xl px-4 md:my-48 md:px-0'}
					>
						<div className="mx-auto max-w-2xl">
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout
										value={realisations?.attributes?.content.toString()}
									/>
								</div>
								<h3 className={'flex items-center text-base text-slate-300'}>
									<span className="h-4 w-0.5 rounded-full bg-slate-400" />
									<span className="ml-3">{'Andy'}</span>
								</h3>
							</article>
						</div>
					</div>
				</div>
			</div>
			<Cta content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}

export default Talent

export async function getStaticPaths() {
	const paths = await getRealisationPaths()

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const content_website = await getContentWebsite()
	const realisations = await getRealisationBySlug(params.slug)

	if (!content_website || !realisations) {
		return {
			notFound: true,
		}
	}

	const processedRealisations = await processRealisationData(realisations)

	return {
		props: {
			content_website: content_website.data,
			realisations: processedRealisations.data,
		},
		revalidate: 10,
	}
}
