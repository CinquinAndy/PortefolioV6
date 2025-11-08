import type { CSSProperties, ReactElement } from 'react'

/**
 * OG Image dimensions as per specification
 */
export const OG_IMAGE_SIZE = {
	width: 1200,
	height: 630,
}

/**
 * Load Noto Serif Display font for OG images
 * This fetches the font from Google Fonts API
 */
export async function getNotoSerifDisplayFont() {
	try {
		// Fetch font from Google Fonts
		const response = await fetch('https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@600&display=swap')
		const css = await response.text()

		// Extract the font URL from the CSS
		const fontUrl = css.match(/src: url\((.+?)\)/)?.[1]

		if (!fontUrl) {
			console.error('Could not extract font URL from Google Fonts CSS')
			return null
		}

		// Fetch the actual font file
		const fontResponse = await fetch(fontUrl)
		const fontData = await fontResponse.arrayBuffer()

		return fontData
	} catch (error) {
		console.error('Failed to load Noto Serif Display font:', error)
		return null
	}
}

/**
 * Background image URL for OG images
 * Using PNG format as Satori doesn't support WebP
 */
export const OG_BACKGROUND_IMAGE_URL =
	'https://r2-andycinquin.andy-cinquin.fr/cinquinandy_dark_blue_smoky_background_fantasy_elements_deep_an_3b3174ec_948f_42a3_a02c_c6d9f17f5706_1_da54b5db8a.png'

/**
 * Get the background style for OG images
 * Returns a fallback gradient in case the image fails to load
 */
export function getOgBackgroundStyle(): CSSProperties {
	return {
		background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #020617 100%)',
		width: '100%',
		height: '100%',
	}
}

/**
 * Container style with Tailwind-like utilities
 */
export const containerStyle: CSSProperties = {
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '80px',
	position: 'relative',
}

/**
 * Calculate dynamic font size based on text length
 * This ensures the text always fits nicely in the OG image
 */
export function getDynamicFontSize(text: string): {
	fontSize: string
	letterSpacing: string
	lineHeight: number
} {
	const length = text.length

	// Very short text (< 30 chars): Extra large
	if (length < 30) {
		return {
			fontSize: '96px',
			letterSpacing: '0.1em',
			lineHeight: 1.1,
		}
	}

	// Short text (30-50 chars): Large
	if (length < 50) {
		return {
			fontSize: '80px',
			letterSpacing: '0.08em',
			lineHeight: 1.15,
		}
	}

	// Medium text (50-70 chars): Medium
	if (length < 70) {
		return {
			fontSize: '64px',
			letterSpacing: '0.06em',
			lineHeight: 1.2,
		}
	}

	// Long text (70-100 chars): Small
	if (length < 100) {
		return {
			fontSize: '48px',
			letterSpacing: '0.04em',
			lineHeight: 1.25,
		}
	}

	// Very long text (>= 100 chars): Extra small
	return {
		fontSize: '40px',
		letterSpacing: '0.02em',
		lineHeight: 1.3,
	}
}

/**
 * Generate dynamic title style based on text length
 * Use this function instead of the static titleStyle for responsive typography
 */
export function getTitleStyle(text: string): CSSProperties {
	const { fontSize, letterSpacing, lineHeight } = getDynamicFontSize(text)

	return {
		fontFamily: 'Noto Serif Display',
		fontSize,
		fontWeight: 600,
		letterSpacing,
		textTransform: 'uppercase',
		color: 'white',
		textAlign: 'center',
		lineHeight,
		marginBottom: '20px',
		maxWidth: '1000px',
		textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
	}
}

/**
 * @deprecated Use getTitleStyle(text) instead for dynamic sizing
 * Title text style matching the Nav component's h1 style
 * Based on: text-2xl font-semibold tracking-widest uppercase xl:text-8xl
 * Font: Noto Serif Display (loaded via getNotoSerifDisplayFont)
 */
export const titleStyle: CSSProperties = {
	fontFamily: 'Noto Serif Display',
	fontSize: '96px',
	fontWeight: 600,
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	color: 'white',
	textAlign: 'center',
	lineHeight: 1.1,
	marginBottom: '20px',
	maxWidth: '1000px',
	textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
}

/**
 * Calculate dynamic subtitle font size based on text length
 */
export function getDynamicSubtitleSize(text: string): {
	fontSize: string
	lineHeight: number
} {
	const length = text.length

	// Short text (< 50 chars): Normal size
	if (length < 50) {
		return {
			fontSize: '32px',
			lineHeight: 1.4,
		}
	}

	// Medium text (50-100 chars): Slightly smaller
	if (length < 100) {
		return {
			fontSize: '28px',
			lineHeight: 1.45,
		}
	}

	// Long text (100-150 chars): Small
	if (length < 150) {
		return {
			fontSize: '24px',
			lineHeight: 1.5,
		}
	}

	// Very long text (>= 150 chars): Extra small
	return {
		fontSize: '20px',
		lineHeight: 1.55,
	}
}

/**
 * Generate dynamic subtitle style based on text length
 */
export function getSubtitleStyle(text: string): CSSProperties {
	const { fontSize, lineHeight } = getDynamicSubtitleSize(text)

	return {
		fontSize,
		fontWeight: 400,
		color: 'rgba(255, 255, 255, 0.9)',
		textAlign: 'center',
		maxWidth: '900px',
		lineHeight,
		textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
	}
}

/**
 * @deprecated Use getSubtitleStyle(text) instead for dynamic sizing
 * Subtitle text style (like Tailwind's text-2xl)
 */
export const subtitleStyle: CSSProperties = {
	fontSize: '32px',
	fontWeight: 400,
	color: 'rgba(255, 255, 255, 0.9)',
	textAlign: 'center',
	maxWidth: '900px',
	textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
}

/**
 * Wrapper component for OG images with background
 * Uses an img element as background since Satori doesn't support backgroundImage
 */
interface OgImageWrapperProps {
	children: ReactElement
	useImageBackground?: boolean
}

export function OgImageWrapper({ children, useImageBackground = true }: OgImageWrapperProps) {
	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
				display: 'flex',
			}}
		>
			{/* Background layer */}
			{useImageBackground ? (
				// eslint-disable-next-line @next/next/no-img-element
				// biome-ignore lint/performance/noImgElement: Required for OG images (ImageResponse doesn't support Next.js Image)
				<img
					src={OG_BACKGROUND_IMAGE_URL}
					alt=""
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			) : (
				<div style={{ ...getOgBackgroundStyle(), position: 'absolute', top: 0, left: 0 }} />
			)}

			{/* Content layer */}
			<div style={{ ...containerStyle, position: 'relative', zIndex: 1 }}>{children}</div>
		</div>
	)
}

/**
 * ============================================
 * EXAMPLES FOR OTHER PAGES
 * ============================================
 *
 * Blog Post OG Image (src/app/[locale]/blog/[slug]/opengraph-image.tsx):
 *
 * export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
 *   const { slug } = await params
 *   const post = await fetchBlogPost(slug)
 *
 *   return new ImageResponse(
 *     <div style={{ ...getOgBackgroundStyle(), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
 *       <div style={getTitleStyle(post.title)}>{post.title}</div>
 *       {post.excerpt && <div style={getSubtitleStyle(post.excerpt)}>{post.excerpt}</div>}
 *     </div>,
 *     { ...OG_IMAGE_SIZE, fonts: await getNotoSerifDisplayFont() ? [{ name: 'Noto Serif Display', data: await getNotoSerifDisplayFont(), style: 'normal', weight: 600 }] : [] }
 *   )
 * }
 *
 * ============================================
 *
 * Portfolio Project OG Image (src/app/[locale]/portefolio/[slug]/opengraph-image.tsx):
 *
 * export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
 *   const { slug } = await params
 *   const project = await fetchProject(slug)
 *
 *   return new ImageResponse(
 *     <div style={{ ...getOgBackgroundStyle(), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
 *       <div style={getTitleStyle(project.title)}>{project.title}</div>
 *       {project.tagline && <div style={getSubtitleStyle(project.tagline)}>{project.tagline}</div>}
 *     </div>,
 *     { ...OG_IMAGE_SIZE, fonts: await getNotoSerifDisplayFont() ? [{ name: 'Noto Serif Display', data: await getNotoSerifDisplayFont(), style: 'normal', weight: 600 }] : [] }
 *   )
 * }
 */
