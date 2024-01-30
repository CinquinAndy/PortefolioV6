import {
	getContentWebsite,
	getRealisationBySlug,
	processRealisationData,
} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { Layout } from '@/components/Global/Layout'
import { replaceTitle } from '@/services/utils'
import { LinkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { GalerySection } from '@/components/Global/GalerySection'
import Image from 'next/image'

export async function generateMetadata({ params }) {
	// fetch data
	let realisation = await getRealisationBySlug(params.slug, params.locale)

	let processedRealisation = await processRealisationData(realisation)
	processedRealisation = processedRealisation?.data

	return {
		title:
			processedRealisation?.attributes?.seo_title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			processedRealisation?.attributes?.seo_description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical: processedRealisation?.attributes?.seo_canonical || '/',
			languages: {
				'en-US': `${params.locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedRealisation?.attributes?.slug}`,
				'fr-FR': `${params.locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedRealisation?.attributes?.slug}`,
			},
		},
	}
}

export default async function Page({ params }) {
	// fetch data
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let realisation = await getRealisationBySlug(params.slug, params.locale)

	let processedRealisation = await processRealisationData(realisation)
	processedRealisation = processedRealisation?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={processedRealisation?.attributes?.title}
			/>
			<div>
				<div className={'relative'}>
					<div
						className={
							'my-24 grid grid-cols-1 gap-[100px] px-6 md:my-48 md:grid-cols-2 2xl:px-0'
						}
					>
						<GalerySection
							content_website={content_website}
							processedRealisation={processedRealisation}
						/>

						<div className="mx-auto max-w-3xl md:pl-20">
							<h2
								className={
									'text-lg font-black md:text-3xl [&>*]:text-lg [&>*]:font-black md:[&>*]:text-3xl'
								}
								dangerouslySetInnerHTML={{
									__html: replaceTitle(
										content_website?.attributes?.content_realisations
											?.title_content
									),
								}}
							/>
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout
										value={processedRealisation?.attributes?.content.toString()}
									/>
								</div>
							</article>
						</div>

						<div
							className={
								'flex w-full flex-col gap-6 md:pr-20 xl:gap-8 2xl:mx-auto 2xl:max-w-2xl'
							}
						>
							<h2
								className={
									'text-lg font-black md:text-3xl [&>*]:text-lg [&>*]:font-black md:[&>*]:text-3xl'
								}
								dangerouslySetInnerHTML={{
									__html: replaceTitle(
										content_website?.attributes?.content_realisations
											?.title_technology
									),
								}}
							/>
							<div className="grid w-full grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 xl:gap-6 2xl:gap-8">
								{/*map on realisations?.attributes?.technologies?.data*/}
								{processedRealisation?.attributes?.technologies?.data.map(
									technology => {
										return (
											<div
												key={technology?.id}
												className="custom-button-icons-3d relative flex items-center justify-center"
											>
												<Image
													src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/3d.svg`}
													alt="icon-3d"
													width={80}
													height={80}
												/>
												<Image
													src={
														technology?.attributes?.image?.data?.attributes?.url
													}
													className={
														'absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 skew-y-30 transform'
													}
													alt={
														technology?.attributes?.image?.data?.attributes
															?.alternativeText || 'Technology used'
													}
													width={24}
													height={24}
												/>
											</div>
										)
									}
								)}
								<div
									className={
										'col-span-3 mt-8 flex flex-col gap-4 md:col-span-4 md:gap-8'
									}
								>
									<h2
										className={
											'text-lg font-black md:text-3xl [&>*]:text-lg [&>*]:font-black md:[&>*]:text-3xl'
										}
										dangerouslySetInnerHTML={{
											__html: replaceTitle(
												content_website?.attributes?.content_realisations
													?.title_links
											),
										}}
									/>
									<div className={'flex w-full gap-8'}>
										{processedRealisation?.attributes?.links?.map(
											(link, index) => {
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
											}
										)}
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
