import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getChapterBySlug } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'

export const alt = 'Chapter - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface ChapterParams {
	parentCourseSlug: string
	chapterSlug: string
	locale: string
}

export default async function Image({ params }: { params: Promise<ChapterParams> }) {
	const { chapterSlug, locale } = await params

	// Fetch chapter data
	const chapterData = await getChapterBySlug(chapterSlug, locale as Locale)

	// Get title and description from chapter or use default
	const chapter = 'notFound' in chapterData || !chapterData.data ? null : chapterData.data[0]
	const title = chapter?.attributes?.title ?? 'Chapter'
	const subtitle = chapter?.attributes?.description

	return generateOgImage({ title, subtitle })
}
