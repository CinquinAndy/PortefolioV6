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
import Galery from '@/components/Global/Galery'
import Link from 'next/link'

/**
 * @param props
 * @constructor
 */
function Talent({ content_website, realisations }) {
	let router = useRouter()
	const [open, setOpen] = React.useState(false)

	const handleClick = () => {
		setOpen(!open)
	}

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
					<div className={'grid grid-cols-2 px-4 md:my-48 2xl:px-0'}>
						<div className="mx-auto max-w-2xl">
							<h2 className={'text-3xl'}>
								{realisations?.attributes?.content?.title_content}
							</h2>
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
						<div>
							<Galery handleClick={handleClick} open={open} />
							<h2 className={'text-3xl'}>
								{realisations?.attributes?.content?.title_technology}
							</h2>
							<button
								onClick={() => {
									handleClick()
								}}
								className={
									'rounded bg-indigo-600 px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm'
								}
							>
								Click
							</button>
							{/*	todo technology */}
						</div>
						<div>
							<h2 className={'text-3xl'}>
								{realisations?.attributes?.content?.title_galery}
							</h2>
							{/*	todo galery */}
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
