import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbBackButton,
	BreadcrumbSeparator,
	Breadcrumbs,
} from '@/components/course/Breadcrumbs-learning'
import { NextPageLink } from '@/components/course/NextPageLink-learning'
import { SidebarLayoutContent } from '@/components/course/SidebarLayout-learning'
import TableOfContents from '@/components/course/TableOfContents-learning'
import {
	getChapterBySlug,
	getCourseBySlug,
	getLessonBySlug,
	getNextLesson,
	getParentCourses,
	processLessonData,
} from '@/services/getCourses'
import { localesConstant } from '@/services/localesConstant'
import type { Locale } from '@/types/strapi'
import { getCourseTranslations } from '@/utils/courseTranslations'

// revalidate every 1 minute for faster updates from CMS
export const revalidate = 60

interface PageParams {
	locale: Locale
	parentCourseSlug: string
	chapterSlug: string
	lessonSlug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { lessonSlug, parentCourseSlug, chapterSlug, locale } = await params
	const t = getCourseTranslations(locale)
	const lessonData = await getLessonBySlug(lessonSlug, locale)

	if ('notFound' in lessonData || !lessonData.data) {
		return {
			title: t.lessonPage.notFound,
		}
	}

	const lesson = Array.isArray(lessonData.data) ? lessonData.data[0] : lessonData.data
	const seo = lesson?.attributes?.seo

	// Fetch localizations for alternate links
	const _alternateLocale = locale === 'fr' ? 'en' : 'fr'
	const lessonLocalizations = lesson?.attributes?.localizations?.data
	const alternateLessonSlug = lessonLocalizations?.[0]?.attributes
		? typeof lessonLocalizations[0].attributes === 'string'
			? lessonLocalizations[0].attributes
			: ''
		: lessonSlug

	return {
		title: seo?.title ?? `${lesson?.attributes?.title ?? t.lesson} - ${t.course}`,
		description: seo?.description ?? lesson?.attributes?.description,
		alternates: {
			canonical: seo?.canonical ?? `/${locale}/course/${parentCourseSlug}/${chapterSlug}/${lessonSlug}`,
			languages: {
				fr: `/fr/course/${locale === 'fr' ? parentCourseSlug : ''}/${locale === 'fr' ? chapterSlug : ''}/${locale === 'fr' ? lessonSlug : alternateLessonSlug}`,
				en: `/en/course/${locale === 'en' ? parentCourseSlug : ''}/${locale === 'en' ? chapterSlug : ''}/${locale === 'en' ? lessonSlug : alternateLessonSlug}`,
			},
		},
	}
}

export async function generateStaticParams(): Promise<PageParams[]> {
	const paths: PageParams[] = []

	for (const locale of localesConstant) {
		const coursesResponse = await getParentCourses(locale)

		if (!('notFound' in coursesResponse) && coursesResponse.data) {
			// For each parent course, get all chapters and their lessons
			for (const course of coursesResponse.data) {
				const parentCourseSlug = course.attributes.slug
				const chapters = course.attributes.chapters?.data ?? []

				for (const chapter of chapters) {
					const chapterSlug = chapter.attributes.slug
					const lessons = chapter.attributes.lessons?.data ?? []

					for (const lesson of lessons) {
						paths.push({
							locale,
							parentCourseSlug,
							chapterSlug,
							lessonSlug: lesson.attributes.slug,
						})
					}
				}
			}
		}
	}

	return paths
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
	const { locale, parentCourseSlug, chapterSlug, lessonSlug } = await params
	const t = getCourseTranslations(locale)

	// Fetch lesson data
	const lessonData = await getLessonBySlug(lessonSlug, locale)
	if ('notFound' in lessonData || !lessonData.data) {
		notFound()
	}

	// Process markdown content
	const processedLesson = await processLessonData(lessonData)
	const lesson = processedLesson.data

	// Fetch chapter data
	const chapterData = await getChapterBySlug(chapterSlug, locale)
	if ('notFound' in chapterData || !chapterData.data || chapterData.data.length === 0) {
		notFound()
	}
	const chapter = chapterData.data[0]

	// Fetch parent course data
	const parentCourseData = await getCourseBySlug(parentCourseSlug, locale)
	if ('notFound' in parentCourseData || !parentCourseData.data || parentCourseData.data.length === 0) {
		notFound()
	}
	const parentCourse = parentCourseData.data[0]

	// Get next lesson
	const nextLessonData = await getNextLesson(lessonSlug, chapterSlug, locale)

	return (
		<SidebarLayoutContent
			breadcrumbs={
				<Breadcrumbs>
					<BreadcrumbBackButton locale={locale} />
					<Breadcrumb href={`/${locale}/course/${parentCourseSlug}`}>{parentCourse.attributes.title}</Breadcrumb>
					<BreadcrumbSeparator />
					<Breadcrumb href={`/${locale}/course/${parentCourseSlug}/${chapterSlug}`}>
						{chapter.attributes.title}
					</Breadcrumb>
					<BreadcrumbSeparator />
					<Breadcrumb>{lesson.attributes.title}</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<div className="mx-auto max-w-7xl min-h-screen">
				<div className="mx-auto flex max-w-2xl gap-x-10 py-10 sm:py-14 lg:max-w-5xl">
					<div className="w-full flex-1">
						<div id="content" className="prose">
							{lesson.attributes.content && <div dangerouslySetInnerHTML={{ __html: lesson.attributes.content }} />}

							{/* Attachments */}
							{lesson.attributes.attachments?.data && lesson.attributes.attachments.data.length > 0 && (
								<div className="mt-12 rounded-lg border border-white/10 bg-indigo-950/20 p-6">
									<h2 className="font-sans">{t.lessonPage.attachments}</h2>
									<ul className="mt-4 space-y-2">
										{lesson.attributes.attachments.data.map(
											(attachment: { id: number; attributes: { url: string; name: string; size: number } }) => (
												<li key={attachment.id}>
													<Link
														href={attachment.attributes.url}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
													>
														{attachment.attributes.name}
														<span className="text-xs text-slate-400">
															({(attachment.attributes.size / 1024).toFixed(1)} KB)
														</span>
													</Link>
												</li>
											)
										)}
									</ul>
								</div>
							)}
						</div>
						<div className="mt-16 pt-8" style={{ borderTop: '2px solid rgba(99, 102, 241, 0.2)' }}>
							{nextLessonData ? (
								<NextPageLink
									title={nextLessonData.lesson.attributes.title}
									description={nextLessonData.lesson.attributes.description}
									href={`/${locale}/course/${parentCourseSlug}/${nextLessonData.chapterSlug}/${nextLessonData.lesson.attributes.slug}`}
								/>
							) : (
								<NextPageLink
									title={t.lessonPage.nextLesson.backToCourses}
									description={t.lessonPage.nextLesson.discoverOtherChapters}
									href={`/${locale}/course`}
								/>
							)}
						</div>
					</div>
					<div className="hidden w-66 lg:block">
						<TableOfContents contentId="content" />
					</div>
				</div>
			</div>
		</SidebarLayoutContent>
	)
}
