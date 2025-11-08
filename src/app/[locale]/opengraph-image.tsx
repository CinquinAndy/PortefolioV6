import { ImageResponse } from 'next/og'
import { getNotoSerifDisplayFont, OgImageWrapper, OG_IMAGE_SIZE, getTitleStyle } from '@/lib/og-utils'
import { getContentWebsite } from '@/services/getContentWebsite'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

export const alt = 'Andy Cinquin - Freelance Entrepreneur & Developer'
export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

interface PageParams {
	locale: string
}

export default async function Image({ params }: { params: Promise<PageParams> }) {
	const { locale } = await params

	// Fetch content for the page
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	// Get title from CMS or use default
	const title =
		content_website?.attributes?.content_home?.seo?.title ?? 'Andy Cinquin - Freelance Entrepreneur & Developer'

	// Get dynamic title style based on text length
	const dynamicTitleStyle = getTitleStyle(title)

	// Load font
	const fontData = await getNotoSerifDisplayFont()

	return new ImageResponse(
		<OgImageWrapper>
			<div style={dynamicTitleStyle}>{title}</div>
		</OgImageWrapper>,
		{
			...size,
			fonts: fontData
				? [
						{
							name: 'Noto Serif Display',
							data: fontData,
							style: 'normal',
							weight: 600,
						},
					]
				: [],
		}
	)
}
