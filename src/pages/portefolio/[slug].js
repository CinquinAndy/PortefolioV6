import React from 'react'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import CTA from '@/components/Global/CTA'
import Head from 'next/head'
import Hero from '@/components/Global/Hero'
import { remark } from 'remark'
import html from 'remark-html'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Global/Layout'
import Cta from '@/components/Global/CTA'

/**
 * @param props
 * @constructor
 */
function Talent({ content_website, realisations }) {
	let router = useRouter()

	console.log(realisations)
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
			<Cta />
			<Footer content_website={content_website} />
		</>
	)
}

export default Talent

export async function getStaticPaths() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations?populate=deep,2&sort=rank`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	).then(res => res.json())

	/**
	 * format the data for getStaticPaths
	 * @type {{params: {id: *}}[]}
	 */
	const paths = res?.data?.map(record => ({
		params: {
			slug: record.attributes.slug,
		},
	}))
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const res_content_website = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/content-website?populate=deep`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// 	bearer token
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)

	const res_realisations = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations?populate=deep,2&sort=rank&filters[slug][$eq]=${params.slug}`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// 	bearer token
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)

	if (!res_content_website || !res_realisations) {
		return {
			notFound: true,
		}
	}

	const data_content_website = await res_content_website.json()
	const data_realisations = await res_realisations.json()

	// Convert Markdown to HTML
	const processedContentFooter = await remark()
		.use(html)
		.process(data_content_website.data.attributes.content_footer.content)

	// replace the content_footer by the processed one

	const newDataContentWebsite = {
		...data_content_website,
		data: {
			...data_content_website.data,
			attributes: {
				...data_content_website.data.attributes,
				content_footer: {
					...data_content_website.data.attributes.content_footer,
					content: processedContentFooter.toString(),
				},
			},
		},
	}

	// Convert Markdown to HTML
	const processedContentRealisations = await remark()
		.use(html)
		.process(data_realisations.data[0].attributes.content)

	const newDataRealisations = {
		...data_realisations,
		data: {
			// ...data_realisations.data,
			attributes: {
				...data_realisations.data[0].attributes,
				content: processedContentRealisations.toString(),
			},
		},
	}

	return {
		props: {
			content_website: newDataContentWebsite.data,
			realisations: newDataRealisations.data,
		},
		revalidate: 10,
	}
}
