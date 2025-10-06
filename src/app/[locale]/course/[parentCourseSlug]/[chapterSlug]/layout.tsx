import type React from 'react'
import { SidebarLayout } from '@/components/course/SidebarLayout-learning'
import { getParentCourseBySlug } from '@/services/getCourses'
import type { Course, Lesson } from '@/types/course'
import type { Locale } from '@/types/strapi'

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
	const parentCourseData = await getParentCourseBySlug(parentCourseSlug, locale)

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
