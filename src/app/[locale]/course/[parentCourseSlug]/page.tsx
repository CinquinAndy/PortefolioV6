import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StarRating } from '@/components/course/StarRating'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { getContentWebsite } from '@/services/getContentWebsite'
import { getParentCourseForSidebar, getParentCoursesLight } from '@/services/getCourses'
import { localesConstant } from '@/services/localesConstant'
import type { Course } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import { getCourseTranslations, pluralize } from '@/utils/courseTranslations'
import { getCanonicalUrl, getLanguageAlternates, getMetadataBase } from '@/utils/seo'

// revalidate every 1 minute for faster updates from CMS
export const revalidate = 60

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
			metadataBase: getMetadataBase(locale),
		}
	}

	const course = courseData.data[0]
	const seo = course.attributes.seo

	// Fetch localizations for alternate links
	const courseLocalizations = course.attributes.localizations?.data
	const alternateCourseSlug = courseLocalizations?.[0]?.attributes?.slug || parentCourseSlug

	const frPath = `/course/${locale === 'fr' ? parentCourseSlug : alternateCourseSlug}`
	const enPath = `/course/${locale === 'en' ? parentCourseSlug : alternateCourseSlug}`

	return {
		title: seo?.title ?? `${course.attributes.title} - ${t.course}`,
		metadataBase: getMetadataBase(locale),
		description: seo?.description ?? course.attributes.description,
		alternates: {
			canonical: seo?.canonical ?? getCanonicalUrl(locale, `/course/${parentCourseSlug}`),
			languages: getLanguageAlternates('', frPath, enPath),
		},
	}
}

export async function generateStaticParams(): Promise<PageParams[]> {
	let paths: PageParams[] = []

	for (const locale of localesConstant) {
		// Use light version for static params generation (we only need slugs)
		const coursesResponse = await getParentCoursesLight(locale)

		if (!('notFound' in coursesResponse) && coursesResponse.data) {
			// For each parent course, we generate a static page
			const localePaths = coursesResponse.data.map((course: Course) => ({
				locale,
				parentCourseSlug: course.attributes.slug,
			}))
			paths = paths.concat(localePaths)
		}
	}

	return paths
}

export default async function ParentCoursePage({ params }: { params: Promise<PageParams> }) {
	const { locale, parentCourseSlug } = await params
	const t = getCourseTranslations(locale)

	// Fetch content_website for Nav and Footer
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	// Fetch parent course data (OPTIMIZED - light version)
	// Only loads: title, description, slug, difficulty, seo, localizations
	// Chapters: title, description, slug, lessons IDs only (for count)
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
									<Link
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
													<p className="mt-4 text-base leading-relaxed text-slate-200">
														{chapter.attributes.description}
													</p>
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
														aria-hidden="true"
													>
														<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
													</svg>
													<span>
														{lessonCount} {pluralize(lessonCount, t.lesson, t.lessons)}
													</span>
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
												aria-hidden="true"
											>
												<path d="M9 5l7 7-7 7" />
											</svg>
										</div>
									</Link>
								)
							})}
						</div>
					</div>

					{/* Back Button */}
					<div className="mt-12">
						<Link
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
								aria-hidden="true"
							>
								<path d="M15 19l-7-7 7-7" />
							</svg>
							{t.parentCoursePage.backToCourses}
						</Link>
					</div>
				</div>
			</div>

			<Cta content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
