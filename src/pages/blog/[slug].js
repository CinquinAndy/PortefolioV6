import React from 'react'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Global/Layout'
import Cta from '@/components/Global/Cta'
import {
	getArticleBySlug,
	getArticlePaths,
	getContentWebsite,
	processArticleData,
} from '@/services/getContentWebsite'
import { replaceTitle } from '@/services/utils'
import { LinkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

/**
 * @param props
 * @constructor
 */
function Blog({ content_website, articles }) {
	let router = useRouter()
	const { locale } = router

	const [open, setOpen] = React.useState(false)

	const handleClick = () => {
		setOpen(!open)
	}
	return (
		<>
			<Head>
				<title>{articles?.attributes?.seo_title}</title>
				<meta
					name="description"
					content={articles?.attributes?.seo_description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={`${
						locale === 'fr'
							? process.env.NEXT_PUBLIC_URL_ALT
							: process.env.NEXT_PUBLIC_URL
					}/portefolio/${articles?.attributes?.slug}`}
				/>
			</Head>

			<Nav
				content_website={content_website}
				isHome={false}
				h1={articles?.attributes?.title}
			/>
			<div>
				<div className={'relative'}>
					<div
						className={
							'my-24 grid grid-cols-1 gap-[100px] px-6 md:my-48 md:px-16 2xl:px-0'
						}
					>
						<div
							className={
								'shadow-innercustom relative mx-auto max-w-5xl cursor-pointer p-8 md:col-span-2 md:p-20 xl:max-w-7xl'
							}
						>
							<div
								className={
									'flex w-full items-center justify-evenly gap-4 md:gap-8'
								}
							>
								<div className={'flex items-center gap-2'}>
									<h2
										className={
											'text-md font-black md:text-3xl [&>*]:font-black'
										}
										dangerouslySetInnerHTML={{
											__html: replaceTitle(
												content_website?.attributes?.content_realisations
													?.title_links
											),
										}}
									/>
								</div>
								<div className={'flex flex-col gap-4'}>
									{articles?.attributes?.links?.map((link, index) => {
										return (
											<div key={index} className={'flex'}>
												<Link
													key={link?.id}
													href={link?.url}
													rel={'noopener noreferrer'}
													className={
														'relative flex items-center gap-4 rounded border border-indigo-600 bg-transparent px-6 py-2 text-xs xl:px-8 xl:py-2 xl:text-sm'
													}
												>
													{link?.label}
													<LinkIcon
														className={
															'absolute -right-2 -top-2 h-4 w-4 rotate-6'
														}
													/>
												</Link>
											</div>
										)
									})}
								</div>
							</div>
						</div>

						<div className="mx-auto max-w-7xl">
							<h2
								className={'text-lg font-black md:text-3xl [&>*]:font-black'}
								dangerouslySetInnerHTML={{
									__html: replaceTitle(
										content_website?.attributes?.content_blog?.title_content
									),
								}}
							/>
							<article>
								<div
									className={'prose prose-invert my-8 [&>*]:!decoration-auto'}
								>
									<Layout value={articles?.attributes?.content.toString()} />
								</div>
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

export default Blog

export async function getStaticPaths({ locale }) {
	const paths = await getArticlePaths(locale)

	return {
		paths,
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params, locale }) {
	const content_website = await getContentWebsite(locale)
	const articles = await getArticleBySlug(params.slug, locale)

	if (!content_website || !articles) {
		return {
			notFound: true,
		}
	}

	const processedArticles = await processArticleData(articles)

	return {
		props: {
			content_website: content_website.data,
			articles: processedArticles.data,
		},
		revalidate: 10,
	}
}
