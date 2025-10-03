import { SidebarLayout } from '@/components/course/SidebarLayout'
import { getCourses } from '@/services/getCourses'
import type { Course } from '@/types/course'
import type { Locale } from '@/types/strapi'
import type React from 'react'

export default async function CourseSlugLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: Locale; courseSlug: string }>
}) {
	const { locale } = await params
	const coursesData = await getCourses(locale)

	// Prepare modules for sidebar navigation
	const modules =
		'notFound' in coursesData || !coursesData.data
			? []
			: coursesData.data.map((course: Course) => ({
					course,
					lessons: course.attributes.lessons?.data ?? [],
				}))

	return (
		<SidebarLayout modules={modules} locale={locale}>
			{children}
		</SidebarLayout>
	)
}
