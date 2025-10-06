import type React from 'react'
import { SidebarLayout } from '@/components/course/SidebarLayout-learning'
import { getParentCourseForSidebar } from '@/services/getCourses'
import type { Course, Lesson } from '@/types/course'
import type { Locale } from '@/types/strapi'
import '@/app/course-typography.css'

export default async function ChapterSlugLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string; parentCourseSlug: string; chapterSlug: string }>
}) {
	const { locale, parentCourseSlug } = (await params) as {
		locale: Locale
		parentCourseSlug: string
		chapterSlug: string
	}

	// Fetch parent course with all chapters for sidebar
	const parentCourseData = await getParentCourseForSidebar(parentCourseSlug, locale)

	// Debug logging
	if (!('notFound' in parentCourseData) && parentCourseData.data && parentCourseData.data.length > 0) {
		const parentCourse = parentCourseData.data[0]
		const chapters = parentCourse.attributes.chapters?.data ?? []
		console.log('Layout - Parent course data:', {
			parentCourseTitle: parentCourse.attributes.title,
			chaptersCount: chapters.length,
			chaptersWithLessons: chapters.map(ch => ({
				title: ch.attributes.title,
				lessonsCount: ch.attributes.lessons?.data?.length ?? 0,
				hasLessons: !!ch.attributes.lessons,
				lessonsDataType: Array.isArray(ch.attributes.lessons?.data) ? 'array' : typeof ch.attributes.lessons?.data,
			})),
		})
	}

	// Prepare modules (chapters) for sidebar
	const modules =
		'notFound' in parentCourseData || !parentCourseData.data || parentCourseData.data.length === 0
			? []
			: (() => {
					const parentCourse = parentCourseData.data[0]
					const chapters = parentCourse.attributes.chapters?.data ?? []
					return chapters.map(chapter => ({
						course: chapter as Course,
						lessons: (chapter.attributes.lessons?.data ?? []) as Lesson[],
						parentCourseSlug,
					}))
				})()

	return (
		<SidebarLayout modules={modules} locale={locale}>
			{children}
		</SidebarLayout>
	)
}
