import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getContentWebsite } from '@/services/getContentWebsite'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

export const alt = 'CGU - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface PageParams {
	locale: string
}

export default async function Image({ params }: { params: Promise<PageParams> }) {
	const { locale } = await params

	// Fetch content for the page
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	// Get title from CMS or use default
	const title = content_website?.attributes?.content_cgu?.seo?.title ?? 'CGU - Andy Cinquin'

	return generateOgImage({ title })
}
