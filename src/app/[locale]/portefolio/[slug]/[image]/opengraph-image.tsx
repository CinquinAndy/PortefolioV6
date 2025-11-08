import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getRealisationBySlug } from '@/services/getContentWebsite'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

export const alt = 'Portfolio Project Image - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface ImagePageParams {
	slug: string
	locale: string
	image: string
}

export default async function Image({ params }: { params: Promise<ImagePageParams> }) {
	const { slug, locale } = await params

	// Fetch realisation data
	const realisationResponse = await getRealisationBySlug(slug, locale as Locale)
	const realisations = getResponseData(realisationResponse)
	const realisation = Array.isArray(realisations) ? realisations[0] : null

	// Get title from realisation or use default
	const title = realisation?.attributes?.title ?? 'Portfolio Project'

	return generateOgImage({ title })
}
