import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getArticleBySlug } from '@/services/getContentWebsite'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

export const alt = 'Blog Article - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface ArticleParams {
	slug: string
	locale: string
}

export default async function Image({ params }: { params: Promise<ArticleParams> }) {
	const { slug, locale } = await params

	// Fetch article data
	const articleResponse = await getArticleBySlug(slug, locale as Locale)
	const articles = getResponseData(articleResponse)
	const article = Array.isArray(articles) ? articles[0] : null

	// Get title and description from article or use default
	const title = article?.attributes?.title ?? 'Blog Article'
	const subtitle = article?.attributes?.seo_description

	return generateOgImage({ title, subtitle })
}
