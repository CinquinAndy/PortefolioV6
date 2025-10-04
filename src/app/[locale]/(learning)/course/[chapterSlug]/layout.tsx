import { SidebarLayout } from '@/components/course/SidebarLayout'
import { getParentCourses } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'
import type React from 'react'

export default async function ChapterSlugLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: Locale; chapterSlug: string }>
}) {
	const { locale } = await params

	// Fetch all parent courses with chapters for sidebar
	const coursesData = await getParentCourses(locale)

	// Prepare modules (chapters) for sidebar
	const modules =
		'notFound' in coursesData || !coursesData.data
			? []
			: coursesData.data.flatMap((parentCourse) => {
					const chapters = parentCourse.attributes.chapters?.data ?? []
					return chapters.map((chapter) => ({
						course: chapter,
						lessons: chapter.attributes.lessons?.data ?? [],
					}))
				})

	return (
		<SidebarLayout modules={modules} locale={locale}>
			{children}
		</SidebarLayout>
	)
}
