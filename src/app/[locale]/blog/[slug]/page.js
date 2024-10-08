import {
	getArticleBySlug,
	getArticles,
	getContentWebsite,
	processArticleData,
} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { Layout } from '@/components/Global/Layout'
import { replaceTitle } from '@/services/utils'
import { LinkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { localesConstant } from '@/services/localesConstant'
import Script from 'next/script'
import ArrowUp from '@/components/Global/ArrowUp'
import { NavigationArticle } from '@/components/Global/navigationArticle'

export async function generateStaticParams() {
	let paths = []

	for (const locale of localesConstant) {
		const articles = await getArticles(locale) // Use your service to fetch articles

		// Map over each article to create a path object for it
		const localePaths = articles.data.map(article => ({
			params: { slug: article.attributes.slug, locale }, // Ensure your API response structure is correctly referenced here
		}))

		paths = paths.concat(localePaths)
	}

	return paths
}

async function getSlugs(params) {
	let article = await getArticleBySlug(params.slug, params.locale)
	article = article?.data[0]

	// conditional slug, make en and fr slugs available
	let slug = ''
	let slugAlternate = ''
	if (params.locale === 'fr') {
		slug = article?.attributes?.slug
		slugAlternate =
			article?.attributes?.localizations?.data[0]?.attributes?.slug
	} else {
		slugAlternate = article?.attributes?.slug
		slug = article?.attributes?.localizations?.data[0]?.attributes?.slug
	}

	return { article, slug, slugAlternate }
}

export async function generateMetadata({ params }) {
	let { article, slug, slugAlternate } = await getSlugs(params)

	return {
		title:
			article?.attributes?.seo_title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			article?.attributes?.seo_description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical: article?.attributes?.seo_canonical || '/',
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/blog/${slugAlternate}`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/blog/${slug}`,
			},
		},
	}
}

export default async function Page({ params }) {
	// fetch data
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let { article, slug, slugAlternate } = await getSlugs(params)

	let processedArticle = await processArticleData(article)
	processedArticle = processedArticle?.data

	const colors = [
		'indigo',
		'sky',
		'lime',
		'rose',
		'amber',
		'emerald',
		'cyan',
		'violet',
		'fuchsia',
		'orange',
		'teal',
	]

	const getColorIndex = name => {
		let hash = 0
		for (let i = 0; i < name.length; i++) {
			hash = name.charCodeAt(i) + ((hash << 5) - hash)
			hash = hash & hash
		}
		return Math.abs(hash)
	}

	return (
		<>
			<Script
				id={'json-ld'}
				type={'application/ld+json'}
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Article',
						headline: processedArticle?.attributes?.title,
						datePublished: processedArticle?.attributes?.createdAt,
						dateModified: processedArticle?.attributes?.updatedAt,
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': `${process.env.NEXT_PUBLIC_URL}/blog/${processedArticle?.attributes?.slug}`,
						},
						author: {
							'@type': 'Person',
							name: 'Andy Cinquin',
						},
						publisher: {
							'@type': 'Organization',
							name: 'Andy Cinquin',
							logo: {
								'@type': 'ImageObject',
								url: `${process.env.NEXT_PUBLIC_URL}/favicon.ico`,
							},
						},
					}),
				}}
			/>

			<ArrowUp />

			<Nav
				content_website={content_website}
				isHome={false}
				h1={processedArticle?.attributes?.title}
				enRedirect={process.env.NEXT_PUBLIC_URL + '/blog/' + slugAlternate}
				frRedirect={process.env.NEXT_PUBLIC_URL_ALT + '/blog/' + slug}
			/>

			<div>
				<div className={'relative'}>
					<div
						className={
							'my-24 grid grid-cols-1 gap-[100px] px-6 md:my-48 md:mb-12 md:px-16 2xl:px-0'
						}
					>
						<div>
							<NavigationArticle />
						</div>

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
											'text-md [&>*]:text-md !font-display font-black md:text-3xl [&>*]:!font-display [&>*]:font-black md:[&>*]:text-3xl'
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
									{processedArticle?.attributes?.links?.map((link, index) => {
										return (
											<div key={index} className={'flex'}>
												<Link
													key={link?.id}
													href={link?.url}
													rel={'noopener noreferrer'}
													className={
														'custom-button-icons relative flex items-center gap-4 rounded border border-indigo-600 bg-transparent px-6 py-2 text-xs xl:px-8 xl:py-2 xl:text-sm'
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
						<div className={'flex w-full justify-center'}>
							<section className="mx-auto max-w-7xl">
								<h2
									className={
										'!font-display text-lg font-black md:text-3xl [&>*]:!font-display [&>*]:text-lg [&>*]:font-black md:[&>*]:text-3xl'
									}
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
										<h2>{processedArticle?.attributes?.title}</h2>
										<div className={'italic opacity-90'}>
											{params.locale === 'fr' ? 'Publié le ' : 'Posted on '}
											{
												// get date from article and format it, to get "Publié le 9 novembre 2021" or "Posted on November 9, 2021
												// processedArticle?.attributes?.createdAt
												params.locale === 'fr'
													? new Date(
															processedArticle?.attributes?.createdAt
														).toLocaleDateString('fr-FR', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														})
													: new Date(
															processedArticle?.attributes?.createdAt
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
														})
											}
											&nbsp;-&nbsp;
											{params.locale === 'fr'
												? ' par Andy Cinquin'
												: ' by Andy Cinquin'}
										</div>
										<h4 className={'my-2 mb-16 flex flex-wrap gap-2'}>
											{processedArticle?.attributes?.tags?.map((tag, index) => {
												if (tag?.name) {
													const colorIndex =
														getColorIndex(tag.name) % colors.length
													const color = colors[colorIndex]
													return (
														<span
															key={index}
															className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-2 py-1 text-[0.6rem] font-medium text-gray-900 ring-1 ring-inset ring-gray-200 md:px-2 md:text-xs"
														>
															<svg
																className={`h-1.5 w-1.5 fill-${color}-500`}
																viewBox="0 0 6 6"
																aria-hidden="true"
															>
																<circle cx="3" cy="3" r="3" />
															</svg>
															{/* make the name capitilize */}
															{tag?.name.charAt(0).toUpperCase() +
																tag?.name.slice(1)}
														</span>
													)
												}
											})}
										</h4>
										<Layout
											value={processedArticle?.attributes?.content.toString()}
										/>
										<br />
										<hr />
										<br />
										<div className={'flex flex-col gap-4'}>
											{params.locale === 'fr' ? (
												<>
													<div>
														{`En vous remerciant de votre visite, n'hésitez pas à me
														contacter pour toute demande de renseignements, devis ou
														proposition de collaboration. Je me ferai un plaisir de
														vous répondre dans les plus brefs délais.`}
													</div>
													<div>
														{`Vous avez aimé cet article ? N'hésitez pas à le partager !`}
													</div>
												</>
											) : (
												<>
													<div>
														{`Thank you for your visit, feel free to contact me for
												any information, quote or collaboration proposal. I will
												be happy to answer you as soon as possible.`}
													</div>
													<div>
														{`Did you like this article? Feel free to share it!`}
													</div>
												</>
											)}
										</div>
									</div>
								</article>
							</section>
						</div>
					</div>
				</div>
			</div>
			<Cta content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
