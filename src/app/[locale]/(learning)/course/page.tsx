import type { Metadata } from 'next'
import { getContentWebsite } from '@/services/getContentWebsite'
import { getParentCourses } from '@/services/getCourses'
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

	// Fetch parent courses (courses without parent_course)
	const coursesResponse = await getParentCourses(locale)
	
	// Debug logging
	if ('notFound' in coursesResponse) {
		console.error('Courses API returned notFound')
	} else {
		console.log(`Fetched ${coursesResponse.data?.length ?? 0} courses from API`)
		if (coursesResponse.data && coursesResponse.data.length > 0) {
			const firstCourse = coursesResponse.data[0]
			console.log('First course structure:', {
				title: firstCourse.attributes.title,
				hasChapters: !!firstCourse.attributes.chapters,
				chaptersDataType: Array.isArray(firstCourse.attributes.chapters?.data) ? 'array' : typeof firstCourse.attributes.chapters?.data,
				chaptersCount: firstCourse.attributes.chapters?.data?.length ?? 0,
			})
		}
	}
	
	const courses = 'notFound' in coursesResponse ? [] : (coursesResponse.data ?? [])
	
	if (!content_website) {
		return <div>Error loading content</div>
	}

	return <CoursePage params={params} coursesData={courses} content_website={content_website} />
}
