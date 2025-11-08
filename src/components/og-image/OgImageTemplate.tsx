import { ImageResponse } from 'next/og'
import { getNotoSerifDisplayFont, getSubtitleStyle, getTitleStyle, OG_IMAGE_SIZE, OgImageWrapper } from '@/lib/og-utils'

interface OgImageTemplateProps {
	title: string
	subtitle?: string
}

/**
 * Reusable OG Image template component
 * Generates an ImageResponse with the site's branding
 * Uses dynamic typography that adapts to text length
 */
export async function generateOgImage({ title, subtitle }: OgImageTemplateProps) {
	// Get dynamic styles based on text length
	const dynamicTitleStyle = getTitleStyle(title)
	const dynamicSubtitleStyle = subtitle ? getSubtitleStyle(subtitle) : undefined

	// Load font
	const fontData = await getNotoSerifDisplayFont()

	return new ImageResponse(
		<OgImageWrapper>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<div style={dynamicTitleStyle}>{title}</div>
				{subtitle && (
					<div
						style={{
							...dynamicSubtitleStyle,
							marginTop: '30px',
						}}
					>
						{subtitle}
					</div>
				)}
			</div>
		</OgImageWrapper>,
		{
			...OG_IMAGE_SIZE,
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

// Export size and content type for metadata
export const ogImageMetadata = {
	size: OG_IMAGE_SIZE,
	contentType: 'image/png' as const,
}
