import React from 'react'
import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Services from '@/components/Global/Services'
import Realisations from '@/components/Global/Realisations'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { remark } from 'remark'
import html from 'remark-html'

function Portefolio({ content_website, realisations }) {
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

			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website.attributes.content_home}
			/>
			<div>
				<Realisations
					content_website={content_website}
					realisations={realisations}
					slice={false}
					isHome={true}
				/>
				<Cta />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}

export async function getStaticProps() {
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
		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations?populate=deep,2&sort=rank`,
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

	return {
		props: {
			content_website: newDataContentWebsite.data,
			realisations: data_realisations.data,
		},
		revalidate: 10,
	}
}

export default Portefolio
