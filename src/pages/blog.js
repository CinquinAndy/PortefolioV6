import React from 'react'
import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
import Articles from '@/components/Global/Articles'

function Blog({ content_website, articles }) {
	return (
		<>
			<Head>
				<title>{content_website?.attributes?.content_blog?.seo?.title}</title>
				<meta
					name="description"
					content={content_website?.attributes?.content_blog?.seo?.description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_blog?.seo?.canonical}
				/>
			</Head>

			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_blog?.seo?.h1}
			/>
			<div>
				<Articles
					content_website={content_website}
					articles={articles}
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
	const articles = await getArticles(locale)

	if (!content_website || !articles) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
			articles: articles.data,
		},
		revalidate: 10,
	}
}

export default Blog
