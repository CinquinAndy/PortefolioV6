import {
	getArticleBySlug,
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

export async function generateMetadata({ params }) {
	// fetch data
	let article = await getArticleBySlug(params.slug, params.locale)

	let processedArticle = await processArticleData(article)
	processedArticle = processedArticle?.data

	return {
		title:
			processedArticle?.attributes?.seo_title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			processedArticle?.attributes?.seo_description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical: processedArticle?.attributes?.seo_canonical || '/',
			languages: {
				'en-US': `${params.locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedArticle?.attributes?.slug}`,
				'fr-FR': `${params.locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedArticle?.attributes?.slug}`,
			},
		},
	}
}

export default async function Page({ params }) {
	// fetch data
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let article = await getArticleBySlug(params.slug, params.locale)

	let processedArticle = await processArticleData(article)
	processedArticle = processedArticle?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={processedArticle?.attributes?.title}
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
									<Layout
										value={processedArticle?.attributes?.content.toString()}
									/>
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