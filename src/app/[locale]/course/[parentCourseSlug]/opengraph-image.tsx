import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'
import { getParentCourseForSidebar } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'

export const alt = 'Course - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface CourseParams {
	parentCourseSlug: string
	locale: string
}

export default async function Image({ params }: { params: Promise<CourseParams> }) {
	const { parentCourseSlug, locale } = await params

	// Fetch course data
	const courseData = await getParentCourseForSidebar(parentCourseSlug, locale as Locale)

	// Get title and description from course or use default
	const course = 'notFound' in courseData || !courseData.data ? null : courseData.data[0]
	const title = course?.attributes?.title ?? 'Course'
	const subtitle = course?.attributes?.description

	return generateOgImage({ title, subtitle })
}
