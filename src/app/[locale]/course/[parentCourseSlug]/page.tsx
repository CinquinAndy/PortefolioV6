import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StarRating } from '@/components/course/StarRating'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getContentWebsite } from '@/services/getContentWebsite'
import { getParentCourseBySlug } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import { getCourseTranslations, pluralize } from '@/utils/courseTranslations'

interface PageParams {
	locale: Locale
	parentCourseSlug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { parentCourseSlug, locale } = await params
	const t = getCourseTranslations(locale)
	const courseData = await getParentCourseBySlug(parentCourseSlug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		return {
			title: t.parentCoursePage.notFound,
		}
	}

	const course = courseData.data[0]

	return {
		title: `${course.attributes.title} - ${t.course}`,
		description: course.attributes.description,
	}
}

export default async function ParentCoursePage({ params }: { params: Promise<PageParams> }) {
	const { locale, parentCourseSlug } = await params
	const t = getCourseTranslations(locale)

	// Fetch content_website for Nav and Footer
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	// Fetch parent course data
	const courseData = await getParentCourseBySlug(parentCourseSlug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		notFound()
	}

	const course = courseData.data[0]
	const chapters = course.attributes.chapters?.data ?? []

	return (
		<>
			<Nav locale={locale} content_website={content_website} isHome={false} />

			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-3xl">
				{/* Course Header */}
				<div className="mb-12">
					<h1 className="text-4xl font-bold text-white sm:text-5xl">{course.attributes.title}</h1>
					<p className="mt-4 text-lg text-slate-300">{course.attributes.description}</p>
				</div>

				{/* Course Stats */}
				<div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
					<div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<div className="text-sm text-slate-400">{t.difficulty}</div>
						<div className="mt-2">
							{course.attributes.difficulty ? (
								<StarRating rating={course.attributes.difficulty} />
							) : (
								<div className="text-lg font-semibold text-white">{course.attributes.level}</div>
							)}
						</div>
					</div>
					<div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<div className="text-sm text-slate-400">{t.chapters}</div>
						<div className="mt-1 text-lg font-semibold text-white">{chapters.length}</div>
					</div>
					<div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<div className="text-sm text-slate-400">{t.lessons}</div>
						<div className="mt-1 text-lg font-semibold text-white">
							{chapters.reduce((acc, chapter) => acc + (chapter.attributes.lessons?.data?.length ?? 0), 0)}
						</div>
					</div>
				</div>

				{/* Chapters List */}
				<div>
					<h2 className="mb-6 text-2xl font-bold text-white">{t.parentCoursePage.chaptersTitle}</h2>
					<div className="space-y-4">
						{chapters.map((chapter, index) => {
							const firstLesson = chapter.attributes.lessons?.data?.[0]
							const lessonCount = chapter.attributes.lessons?.data?.length ?? 0

							return (
								<a
									key={chapter.id}
									href={
										firstLesson
											? `/${locale}/course/${parentCourseSlug}/${chapter.attributes.slug}/${firstLesson.attributes.slug}`
											: `/${locale}/course/${parentCourseSlug}/${chapter.attributes.slug}`
									}
									className="block rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-3">
												<span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-400">
													{index + 1}
												</span>
												<h3 className="text-lg font-semibold text-white">{chapter.attributes.title}</h3>
											</div>
											{chapter.attributes.description && (
												<p className="mt-3 text-sm text-slate-300">{chapter.attributes.description}</p>
											)}
											<div className="mt-3 text-sm text-slate-400">
												{lessonCount} {pluralize(lessonCount, t.lesson, t.lessons)}
											</div>
										</div>
										<svg
											className="h-5 w-5 text-slate-400"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</a>
							)
						})}
					</div>
				</div>

				{/* Back Button */}
				<div className="mt-12">
					<a
						href={`/${locale}/course`}
						className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M15 19l-7-7 7-7" />
						</svg>
						{t.parentCoursePage.backToCourses}
					</a>
				</div>
			</div>
		</div>

			<Cta content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
