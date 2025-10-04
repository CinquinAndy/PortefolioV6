import type React from 'react'
import { SidebarLayout } from '@/components/course/SidebarLayout-learning'
import { getParentCourses } from '@/services/getCourses'
import type { Course, Lesson } from '@/types/course'
import type { Locale } from '@/types/strapi'

export default async function ChapterSlugLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string; chapterSlug: string }>
}) {
	const { locale } = (await params) as { locale: Locale; chapterSlug: string }

	// Fetch all parent courses with chapters for sidebar
	const coursesData = await getParentCourses(locale)

	// Prepare modules (chapters) for sidebar
	const modules =
		'notFound' in coursesData || !coursesData.data
			? []
			: coursesData.data.flatMap((parentCourse) => {
					const chapters = parentCourse.attributes.chapters?.data ?? []
					return chapters.map((chapter) => ({
						course: chapter as Course,
						lessons: (chapter.attributes.lessons?.data ?? []) as Lesson[],
					}))
				})

	return (
		<SidebarLayout modules={modules} locale={locale}>
			{children}
		</SidebarLayout>
	)
}
