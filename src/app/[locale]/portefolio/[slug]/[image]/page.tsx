import type { Locale, Realisation, StrapiResponse } from '@/types/strapi'
import type { Metadata } from 'next'

import { getMetadataBase, getCanonicalUrl, getLanguageAlternates } from '@/utils/seo'
import { getResponseData } from '@/types/strapi'

import { getRealisationBySlug, getRealisations, processRealisationData } from '@/services/getContentWebsite'
import { LowGradientBackground } from '@/components/Global/Animations/LowGradientBackground'
import { BackButtonComponent } from '@/components/Global/BackButton.component'
import { ImageLoadComponent } from '@/components/Global/ImageLoad.component'
import { localesConstant } from '@/services/localesConstant'

interface ImagePageParams {
	slug: string
	locale: string
	image: string
}

export async function generateMetadata({ params }: { params: Promise<ImagePageParams> }): Promise<Metadata> {
	const { slug, locale } = await params

	// fetch data
	const realisationResponse = await getRealisationBySlug(slug, locale as Locale)
	const realisations = getResponseData(realisationResponse)
	const processedRealisation = realisations
		? await processRealisationData({ meta: undefined, data: realisations } as StrapiResponse<Realisation[]>)
		: null

	return {
		title: processedRealisation?.data?.attributes?.seo_title ?? 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: getMetadataBase(locale),
		description:
			processedRealisation?.data?.attributes?.seo_description ??
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: getLanguageAlternates(`/portefolio/${processedRealisation?.data?.attributes?.slug}`),
			canonical: getCanonicalUrl(locale, `/portefolio/${processedRealisation?.data?.attributes?.slug}`),
		},
	}
}

export async function generateStaticParams(): Promise<{ params: ImagePageParams }[]> {
	const paths: { params: ImagePageParams }[] = []

	for (const locale of localesConstant) {
		// Assuming these are your locales
		const realisationsResponse = await getRealisations(locale)
		const realisations = getResponseData(realisationsResponse)

		if (realisations) {
			for (const realisation of realisations) {
				const images = realisation.attributes.galery?.data // Assuming this is where images are stored

				if (images) {
					for (const [index] of images.entries()) {
						paths.push({
							params: {
								slug: realisation.attributes.slug,
								locale,
								image: String(index),
							}, // Use index as a placeholder for image
						})
					}
				}
			}
		}
	}

	return paths
}

interface ImagePageProps {
	params: Promise<ImagePageParams>
}

export default async function Page({ params }: ImagePageProps) {
	const { slug, locale, image } = await params
	const realisationResponse = await getRealisationBySlug(slug, locale as Locale)
	const realisations = getResponseData(realisationResponse)

	const processedRealisation = realisations
		? await processRealisationData({ meta: undefined, data: realisations } as StrapiResponse<Realisation[]>)
		: null
	const galery = processedRealisation?.data?.attributes?.galery?.data
	const imageData = galery?.[parseInt(image)]

	return (
		<>
			<LowGradientBackground />

			<div className={'fixed left-0 top-0 z-50 flex h-full min-h-screen w-screen items-center justify-center'}>
				<div className={'relative flex h-full w-full items-center justify-center'}>
					<div className={'absolute left-0 top-0 m-8'}>
						<BackButtonComponent />
					</div>
					<ImageLoadComponent
						alt={imageData?.attributes?.alternativeText ?? 'Project Image'}
						className={'rounded-xl p-2 sm:p-4 md:p-8 lg:p-32'}
						height={imageData?.attributes?.height ?? 800}
						src={imageData?.attributes?.url ?? ''}
						width={imageData?.attributes?.width ?? 1200}
					/>
				</div>
			</div>
		</>
	)
}
