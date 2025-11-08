import { ImageResponse } from 'next/og'
import { getNotoSerifDisplayFont, getOgBackgroundStyle, OG_IMAGE_SIZE } from '@/lib/og-utils'

interface OgImageTemplateProps {
	title: string
	subtitle?: string
}

/**
 * Reusable OG Image template component
 * Generates an ImageResponse with the site's branding
 */
export async function generateOgImage({ title, subtitle }: OgImageTemplateProps) {
	// Get background style
	const backgroundStyle = getOgBackgroundStyle()

	// Load font
	const fontData = await getNotoSerifDisplayFont()

	return new ImageResponse(
		<div
			style={{
				...backgroundStyle,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '80px',
			}}
		>
			<div>{title}</div>
			{subtitle && (
				<div
					style={{
						marginTop: '30px',
					}}
				>
					{subtitle.substring(0, 120)}
					{subtitle.length > 120 ? '...' : ''}
				</div>
			)}
		</div>,
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
