import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StarRating } from '@/components/course/StarRating'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { getContentWebsite } from '@/services/getContentWebsite'
import { getParentCourseForSidebar } from '@/services/getCourses'
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
	const courseData = await getParentCourseForSidebar(parentCourseSlug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		return {
			title: t.parentCoursePage.notFound,
		}
	}

	const course = courseData.data[0]
	const seo = course.attributes.seo

	// Fetch localizations for alternate links
	const courseLocalizations = course.attributes.localizations?.data
	const alternateCourseSlug = courseLocalizations?.[0]?.attributes ?
		(typeof courseLocalizations[0].attributes === 'string' ? courseLocalizations[0].attributes : '') : parentCourseSlug

	return {
		title: seo?.title ?? `${course.attributes.title} - ${t.course}`,
		description: seo?.description ?? course.attributes.description,
		alternates: {
			canonical: seo?.canonical ?? `/${locale}/course/${parentCourseSlug}`,
			languages: {
				fr: `/fr/course/${locale === 'fr' ? parentCourseSlug : alternateCourseSlug}`,
				en: `/en/course/${locale === 'en' ? parentCourseSlug : alternateCourseSlug}`,
			},
		},
	}
}

export default async function ParentCoursePage({ params }: { params: Promise<PageParams> }) {
	const { locale, parentCourseSlug } = await params
	const t = getCourseTranslations(locale)

	// Fetch content_website for Nav and Footer
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	// Fetch parent course data
	const courseData = await getParentCourseForSidebar(parentCourseSlug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		notFound()
	}

	const course = courseData.data[0]
	const chapters = course.attributes.chapters?.data ?? []

	const breadcrumbItems = [
		{ label: t.home, href: `/${locale}` },
		{ label: t.courses, href: `/${locale}/course` },
		{ label: course.attributes.title },
	]

	return (
		<>
			<Nav locale={locale} content_website={content_website} isHome={false} />

			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-3xl">
					{/* Breadcrumb */}
					<Breadcrumb items={breadcrumbItems} locale={locale} />

					{/* Course Header */}
					<div className="mb-12">
						<h1 className="text-4xl font-bold text-white sm:text-5xl">{course.attributes.title}</h1>
						<p className="mt-4 text-lg text-slate-300">{course.attributes.description}</p>
					</div>

					{/* Course Stats */}
					<div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 ">
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
								const lessonCount = chapter.attributes.lessons?.data?.length ?? 0

								return (
									<a
										key={chapter.id}
										href={`/${locale}/course/${parentCourseSlug}/${chapter.attributes.slug}`}
										className="block rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:border-indigo-400/50 hover:bg-white/15"
									>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-3">
													<span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/30 text-base font-bold text-indigo-200">
														{index + 1}
													</span>
													<h3 className="text-xl font-bold text-white">{chapter.attributes.title}</h3>
												</div>
												{chapter.attributes.description && (
													<p className="mt-4 text-base leading-relaxed text-slate-200">{chapter.attributes.description}</p>
												)}
												<div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-300">
													<svg
														className="h-4 w-4"
														fill="none"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
													</svg>
													<span>{lessonCount} {pluralize(lessonCount, t.lesson, t.lessons)}</span>
												</div>
											</div>
											<svg
												className="h-6 w-6 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1"
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
							className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-4 py-2.5 font-medium text-indigo-200 transition-all hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-indigo-100"
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
