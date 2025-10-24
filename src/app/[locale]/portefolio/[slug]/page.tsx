import { LinkIcon } from '@heroicons/react/20/solid'
import type { Metadata } from 'next'
import Link from 'next/link'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { GalerySection } from '@/components/Global/GalerySection'
import { Layout } from '@/components/Global/Layout'
import Nav from '@/components/Global/Nav'
import { TechnologyDisplay } from '@/components/Global/TechnologyDisplay'
import {
	getContentWebsite,
	getRealisationBySlug,
	getRealisations,
	processRealisationData,
} from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import { replaceTitle } from '@/services/utils'
import type { Locale, Realisation, Techno } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import { getCanonicalUrl, getLanguageAlternates, getMetadataBase } from '@/utils/seo'

interface RealisationSlugParams {
	slug: string
	locale: string
}

// revalidate every 1 minute for faster updates from CMS
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<RealisationSlugParams> }): Promise<Metadata> {
	const { slug, locale } = await params
	// fetch data
	const realisationResponse = await getRealisationBySlug(slug, locale as Locale)
	const realisations = getResponseData(realisationResponse)
	const realisation = realisations?.[0]

	// conditional slug, make en and fr slugs available
	let _slug = ''
	let slugAlternate = ''
	if (locale === 'fr') {
		_slug = realisation?.attributes?.slug ?? ''
		slugAlternate = realisation?.attributes?.localizations?.data[0]?.attributes?.slug ?? ''
	} else {
		slugAlternate = realisation?.attributes?.slug ?? ''
		_slug = realisation?.attributes?.localizations?.data[0]?.attributes?.slug ?? ''
	}

	const canonicalUrl = getCanonicalUrl(locale, `/portefolio/${_slug}`)

	const frPath = locale === 'fr' ? `/portefolio/${_slug}` : `/portefolio/${slugAlternate}`
	const enPath = locale === 'fr' ? `/portefolio/${slugAlternate}` : `/portefolio/${_slug}`

	return {
		title: realisation?.attributes?.seo_title ?? 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: getMetadataBase(locale),
		description:
			realisation?.attributes?.seo_description ??
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: getLanguageAlternates('', frPath, enPath),
			canonical: canonicalUrl,
		},
	}
}

export async function generateStaticParams(): Promise<{ params: RealisationSlugParams }[]> {
	let paths: { params: RealisationSlugParams }[] = []

	for (const locale of localesConstant) {
		const realisationsResponse = await getRealisations(locale)
		const realisations = getResponseData(realisationsResponse)

		if (realisations) {
			// Map over each realisation to create a path object for it
			const localePaths = realisations.map((realisation: Realisation) => ({
				params: { slug: realisation.attributes.slug, locale },
			}))
			paths = paths.concat(localePaths)
		}
	}

	return paths
}

interface RealisationPageProps {
	params: Promise<RealisationSlugParams>
}

export default async function Page({ params }: RealisationPageProps) {
	const { slug, locale } = await params
	// fetch data
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	const realisationResponse = await getRealisationBySlug(slug, locale as Locale)
	const processedRealisation = await processRealisationData(realisationResponse)

	return (
		<>
			<Nav
				locale={locale}
				content_website={content_website}
				h1={processedRealisation?.data?.attributes?.title}
				isHome={false}
			/>
			<div>
				<div className={'relative'}>
					<div className={'my-24 grid grid-cols-1 gap-[100px] px-6 md:my-48 md:grid-cols-2 2xl:px-0'}>
						<GalerySection
							content_website={content_website}
							processedRealisation={processedRealisation?.data as Realisation}
						/>

						<div className="mx-auto max-w-3xl md:pl-20">
							<h2
								className={
									'!font-display text-lg font-black md:text-3xl [&>*]:!font-display *:text-lg *:font-black md:*:text-3xl'
								}
								dangerouslySetInnerHTML={{
									__html: replaceTitle(content_website?.attributes?.content_realisations?.title_content ?? ''),
								}}
							/>
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout value={processedRealisation?.data?.attributes?.content.toString()} />
								</div>
							</article>
						</div>

						<div className={'flex w-full flex-col gap-6 xl:gap-8 md:pr-20 2xl:mx-auto 2xl:max-w-2xl'}>
							<h2
								className={
									'!font-display text-lg font-black md:text-3xl [&>*]:!font-display *:text-lg *:font-black md:*:text-3xl'
								}
								dangerouslySetInnerHTML={{
									__html: replaceTitle(content_website?.attributes?.content_realisations?.title_technology ?? ''),
								}}
							/>
							<div className="grid w-full grid-cols-3 gap-2 xl:gap-6 md:grid-cols-4 md:gap-4 2xl:gap-8">
								{/*map on realisations?.attributes?.technologies?.data*/}
								{processedRealisation?.data?.attributes?.techno?.map((technology: Techno) => {
									return <TechnologyDisplay key={technology.id} technology={technology} />
								})}
								<div className={'col-span-3 mt-8 flex flex-col gap-4 md:col-span-4 md:gap-8'}>
									<h2
										className={
											'!font-display text-lg font-black md:text-3xl [&>*]:!font-display *:text-lg *:font-black md:*:text-3xl'
										}
										dangerouslySetInnerHTML={{
											__html: replaceTitle(content_website?.attributes?.content_realisations?.title_links ?? ''),
										}}
									/>
									<div className={'flex w-full gap-8'}>
										{processedRealisation?.data?.attributes?.links?.map(link => {
											return (
												<div className={'flex'} key={link?.id || link?.url}>
													<Link
														className={
															'custom-button-icons relative flex items-center gap-4 rounded border border-indigo-600 bg-transparent px-6 py-2 text-xs xl:px-8 xl:py-2 xl:text-sm'
														}
														href={link?.url}
														key={link?.id}
														rel={'noopener noreferrer'}
													>
														{link?.label}
														<LinkIcon className={'absolute -right-2 -top-2 h-4 w-4 rotate-6'} />
													</Link>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Cta content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
