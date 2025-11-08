import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbBackButton,
	BreadcrumbSeparator,
	Breadcrumbs,
} from '@/components/course/Breadcrumbs-learning'
import { SidebarLayoutContent } from '@/components/course/SidebarLayout-learning'
import { getChapterBySlug, getParentCourses } from '@/services/getCourses'
import { localesConstant } from '@/services/localesConstant'
import type { Locale } from '@/types/strapi'
import { getCourseTranslations } from '@/utils/courseTranslations'
import { getCanonicalUrl, getLanguageAlternates, getMetadataBase } from '@/utils/seo'

// revalidate every 1 minute for faster updates from CMS
export const revalidate = 60

interface PageParams {
	locale: Locale
	parentCourseSlug: string
	chapterSlug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { chapterSlug, parentCourseSlug, locale } = await params
	const t = getCourseTranslations(locale)
	const chapterData = await getChapterBySlug(chapterSlug, locale)

	if ('notFound' in chapterData || !chapterData.data || chapterData.data.length === 0) {
		return {
			title: t.chapterPage.notFound,
			metadataBase: getMetadataBase(locale),
		}
	}

	const chapter = chapterData.data[0]
	const seo = chapter.attributes.seo

	// Fetch localizations for alternate links
	const chapterLocalizations = chapter.attributes.localizations?.data
	const alternateChapterSlug = chapterLocalizations?.[0]?.attributes || chapterSlug

	// Note: We keep the same parent course slug for simplicity
	// In a real scenario, you might want to fetch the parent course's localized slug too
	const frPath = `/course/${parentCourseSlug}/${locale === 'fr' ? chapterSlug : alternateChapterSlug}`
	const enPath = `/course/${parentCourseSlug}/${locale === 'en' ? chapterSlug : alternateChapterSlug}`

	return {
		title: seo?.title ?? `${chapter.attributes.title} - ${t.course}`,
		metadataBase: getMetadataBase(locale),
		description: seo?.description ?? chapter.attributes.description,
		alternates: {
			canonical: seo?.canonical ?? getCanonicalUrl(locale, `/course/${parentCourseSlug}/${chapterSlug}`),
			languages: getLanguageAlternates('', frPath, enPath),
		},
	}
}

export async function generateStaticParams(): Promise<PageParams[]> {
	const paths: PageParams[] = []

	for (const locale of localesConstant) {
		// Must use full version here because we need chapter slugs
		// getParentCoursesLight() only loads chapter IDs, not full data
		const coursesResponse = await getParentCourses(locale)

		if (!('notFound' in coursesResponse) && coursesResponse.data) {
			// For each parent course, get all chapters
			for (const course of coursesResponse.data) {
				const chapters = course.attributes.chapters?.data ?? []
				for (const chapter of chapters) {
					paths.push({
						locale,
						parentCourseSlug: course.attributes.slug,
						chapterSlug: chapter.attributes.slug,
					})
				}
			}
		}
	}

	return paths
}

export default async function ChapterPage({ params }: { params: Promise<PageParams> }) {
	const { locale, parentCourseSlug, chapterSlug } = await params
	const t = getCourseTranslations(locale)

	// Fetch chapter data and parent course in parallel (OPTIMIZED)
	// Chapter loads: title, description, slug, level, seo, localizations
	// Lessons: title, description, slug, video_duration, is_free (NO content, NO attachments)
	// Parent course: title, slug only (for breadcrumb)
	const [chapterData, parentCourseData] = await Promise.all([
		getChapterBySlug(chapterSlug, locale),
		getChapterBySlug(parentCourseSlug, locale),
	])

	if ('notFound' in chapterData || !chapterData.data || chapterData.data.length === 0) {
		notFound()
	}

	const chapter = chapterData.data[0]
	const parentCourse =
		!('notFound' in parentCourseData) && parentCourseData.data && parentCourseData.data.length > 0
			? parentCourseData.data[0]
			: null

	// Debug logging
	console.log('Chapter data:', {
		title: chapter.attributes.title,
		hasLessons: !!chapter.attributes.lessons,
		lessonsType: typeof chapter.attributes.lessons,
		lessonsDataType: Array.isArray(chapter.attributes.lessons?.data)
			? 'array'
			: typeof chapter.attributes.lessons?.data,
		lessonsCount: chapter.attributes.lessons?.data?.length ?? 0,
		firstLesson: chapter.attributes.lessons?.data?.[0]?.attributes?.title,
	})

	const lessons = chapter.attributes.lessons?.data ?? []

	// Debug logging for parent course
	console.log('Chapter breadcrumb data:', {
		parentCourseSlug,
		chapterSlug,
		parentCourseTitle: parentCourse?.attributes?.title || 'no parent course found',
	})

	return (
		<SidebarLayoutContent
			breadcrumbs={
				<Breadcrumbs>
					<BreadcrumbBackButton locale={locale} />
					<Breadcrumb href={`/${locale}/course/${parentCourseSlug}`}>
						{parentCourse?.attributes?.title || t.course}
					</Breadcrumb>
					<BreadcrumbSeparator />
					<Breadcrumb>{chapter.attributes.title}</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<div className="mx-auto max-w-7xl min-h-screen">
				<div className="mx-auto max-w-2xl lg:max-w-5xl py-10 sm:py-14">
					{/* Chapter Header */}
					<div className="mb-12">
						<h1 className="text-4xl font-bold text-white sm:text-5xl">{chapter.attributes.title}</h1>
						{chapter.attributes.description && (
							<p className="mt-4 text-lg text-slate-300">{chapter.attributes.description}</p>
						)}
					</div>

					{/* Chapter Stats */}
					<div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-2">
						<div className="rounded-lg border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
							<div className="text-sm font-medium text-slate-200">{t.lessons}</div>
							<div className="mt-1 text-2xl font-semibold text-white">{lessons.length}</div>
						</div>
						<div className="rounded-lg border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
							<div className="text-sm font-medium text-slate-200">{t.chapterPage.level}</div>
							<div className="mt-1 text-lg font-semibold text-white">
								{chapter.attributes.level || t.level.beginner}
							</div>
						</div>
					</div>

					{/* Lessons Tree */}
					<div>
						<h2 className="mb-6 text-2xl font-bold text-white">{t.chapterPage.lessonsTitle}</h2>
						{lessons.length === 0 ? (
							<div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
								<p className="text-slate-400">{t.chapterPage.noLessonsAvailable}</p>
							</div>
						) : (
							<div className="space-y-3">
								{lessons.map((lesson, index) => (
									<Link
										key={lesson.id}
										href={`/${locale}/course/${parentCourseSlug}/${chapterSlug}/${lesson.attributes.slug}`}
										className="group block rounded-lg border border-white/20 bg-white/10 p-5 backdrop-blur-sm transition-all hover:border-indigo-400/50 hover:bg-white/15"
									>
										<div className="flex items-start gap-4">
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/30 text-base font-bold text-indigo-200 transition-colors group-hover:bg-indigo-500/40">
												{index + 1}
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="text-lg font-semibold text-white transition-colors group-hover:text-indigo-300">
													{lesson.attributes.title}
												</h3>
												{lesson.attributes.description && (
													<p className="mt-2 text-sm leading-relaxed text-slate-200 line-clamp-2">
														{lesson.attributes.description}
													</p>
												)}
												<div className="mt-3 flex items-center gap-3 text-xs font-medium text-slate-300">
													{lesson.attributes.video_duration && (
														<span className="flex items-center gap-1">
															<svg
																aria-hidden="true"
																className="h-4 w-4"
																fill="none"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
															</svg>
															{Math.floor(lesson.attributes.video_duration / 60)} {t.chapterPage.min}
														</span>
													)}
													{lesson.attributes.is_free && (
														<span className="flex items-center gap-1 text-green-300">
															<svg
																aria-hidden="true"
																className="h-4 w-4"
																fill="none"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
															</svg>
															{t.chapterPage.free}
														</span>
													)}
												</div>
											</div>
											<svg
												aria-hidden="true"
												className="h-6 w-6 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1"
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
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Back Button */}
					<div className="mt-12">
						<Link
							href={`/${locale}/course/${parentCourseSlug}`}
							className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-4 py-2.5 font-medium text-indigo-200 transition-all hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-indigo-100"
						>
							<svg
								aria-hidden="true"
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
							{t.chapterPage.backToParentCourse}
						</Link>
					</div>
				</div>
			</div>
		</SidebarLayoutContent>
	)
}
