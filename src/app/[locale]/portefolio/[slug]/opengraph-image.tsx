import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getRealisationBySlug } from '@/services/getContentWebsite'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

export const alt = 'Portfolio Project - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface RealisationParams {
	slug: string
	locale: string
}

export default async function Image({ params }: { params: Promise<RealisationParams> }) {
	const { slug, locale } = await params

	// Fetch realisation data
	const realisationResponse = await getRealisationBySlug(slug, locale as Locale)
	const realisations = getResponseData(realisationResponse)
	const realisation = Array.isArray(realisations) ? realisations[0] : null

	// Get title and description from realisation or use default
	const title = realisation?.attributes?.title ?? 'Portfolio Project'
	const subtitle = realisation?.attributes?.seo_description

	return generateOgImage({ title, subtitle })
}
