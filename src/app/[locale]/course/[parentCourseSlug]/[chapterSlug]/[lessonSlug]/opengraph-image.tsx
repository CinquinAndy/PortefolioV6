import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getLessonBySlug } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'

export const alt = 'Lesson - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface LessonParams {
	parentCourseSlug: string
	chapterSlug: string
	lessonSlug: string
	locale: string
}

export default async function Image({ params }: { params: Promise<LessonParams> }) {
	const { lessonSlug, locale } = await params

	// Fetch lesson data
	const lessonData = await getLessonBySlug(lessonSlug, locale as Locale)

	// Get title and description from lesson or use default
	const lesson = 'notFound' in lessonData || !lessonData.data ? null : lessonData.data
	const title = lesson?.attributes?.title ?? 'Lesson'
	const subtitle = lesson?.attributes?.description

	return generateOgImage({ title, subtitle })
}
