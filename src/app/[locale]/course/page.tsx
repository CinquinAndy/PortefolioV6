import type { Metadata } from 'next'
import { getContentWebsite } from '@/services/getContentWebsite'
import { getAllLessonsCount, getParentCoursesLight } from '@/services/getCourses'
import { localesConstant } from '@/services/localesConstant'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import CoursePage from './page-client'

export const revalidate = 43200 // 12 hours

interface PageParams {
	locale: Locale
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale)
	const _content_website = getResponseData(content_website_response)

	return {
		title: 'Mes Cours - Développement Web',
		description:
			'Découvrez mes cours complets pour maîtriser le développement web moderne. JavaScript, React, et bien plus.',
	}
}

export function generateStaticParams(): { params: PageParams }[] {
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

interface CoursePageProps {
	params: Promise<PageParams>
}

export default async function Page({ params }: CoursePageProps) {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	// ULTRA OPTIMIZED API calls - Only loads what's needed:
	// - Courses (light): title, slug, description, difficulty, thumbnail, tags, chapters IDs only
	// - Lessons count: Only fetches total count from pagination metadata (1 lesson loaded)
	const [coursesResponse, totalLessons] = await Promise.all([
		getParentCoursesLight(locale),
		getAllLessonsCount(locale),
	])

	const parentCourses = 'notFound' in coursesResponse ? [] : (coursesResponse.data ?? [])

	// Calculate chapters count from parent courses (only chapter IDs are loaded, super light)
	const totalChapters = parentCourses.reduce((acc, course) => {
		return acc + (course.attributes.chapters?.data?.length ?? 0)
	}, 0)

	// Debug logging
	console.log(`Fetched ${parentCourses.length} parent courses (light) from API`)
	console.log(`Total chapters: ${totalChapters}`)
	console.log(`Total lessons: ${totalLessons}`)

	if (!content_website) {
		return <div>Error loading content</div>
	}

	return (
		<CoursePage
			params={params}
			coursesData={parentCourses}
			totalChapters={totalChapters}
			totalLessons={totalLessons}
			content_website={content_website}
		/>
	)
}
