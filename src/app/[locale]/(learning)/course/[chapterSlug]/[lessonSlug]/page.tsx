import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb, BreadcrumbHome, BreadcrumbSeparator, Breadcrumbs } from '@/components/course/Breadcrumbs-learning'
import { NextPageLink } from '@/components/course/NextPageLink-learning'
import { SidebarLayoutContent } from '@/components/course/SidebarLayout-learning'
import TableOfContents from '@/components/course/TableOfContents-learning'
import { getCourseBySlug, getLessonBySlug, getNextLesson, processLessonData } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'

interface PageParams {
	locale: Locale
	chapterSlug: string
	lessonSlug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { lessonSlug } = await params
	const lessonData = await getLessonBySlug(lessonSlug, 'fr')

	if ('notFound' in lessonData || !lessonData.data) {
		return {
			title: 'Leçon non trouvée',
		}
	}

	const lesson = Array.isArray(lessonData.data) ? lessonData.data[0] : lessonData.data

	return {
		title: `${lesson?.attributes?.title ?? 'Leçon'} - Cours`,
		description: lesson?.attributes?.description,
	}
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
	const { locale, chapterSlug, lessonSlug } = await params

	// Fetch lesson data
	const lessonData = await getLessonBySlug(lessonSlug, locale)
	if ('notFound' in lessonData || !lessonData.data) {
		notFound()
	}

	// Process markdown content
	const processedLesson = await processLessonData(lessonData)
	const lesson = processedLesson.data

	// Fetch chapter data
	const chapterData = await getCourseBySlug(chapterSlug, locale)
	if ('notFound' in chapterData || !chapterData.data || chapterData.data.length === 0) {
		notFound()
	}
	const chapter = chapterData.data[0]

	// Get next lesson
	const nextLessonData = await getNextLesson(lessonSlug, chapterSlug, locale)

	return (
		<SidebarLayoutContent
			breadcrumbs={
				<Breadcrumbs>
					<BreadcrumbHome locale={locale} />
					<BreadcrumbSeparator className="max-md:hidden" />
					<Breadcrumb href={`/${locale}/course`} className="max-md:hidden">
						{chapter.attributes.parent_course?.data?.attributes?.title ?? 'Cours'}
					</Breadcrumb>
					<BreadcrumbSeparator />
					<Breadcrumb>{lesson.attributes.title}</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto flex max-w-2xl gap-x-10 py-10 sm:py-14 lg:max-w-5xl">
					<div className="w-full flex-1">
						<div id="content" className="prose">
							{lesson.attributes.content && (
								<div
									// biome-ignore lint/security/noDangerouslySetInnerHTML: Trusted Strapi content
									dangerouslySetInnerHTML={{ __html: lesson.attributes.content }}
								/>
							)}

							{/* Attachments */}
							{lesson.attributes.attachments?.data && lesson.attributes.attachments.data.length > 0 && (
								<div className="mt-12 rounded-lg border border-gray-200 p-6 dark:border-white/10">
									<h2>Pièces jointes</h2>
									<ul className="mt-4 space-y-2">
										{lesson.attributes.attachments.data.map(
											(attachment: { id: number; attributes: { url: string; name: string; size: number } }) => (
												<li key={attachment.id}>
													<a
														href={attachment.attributes.url}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-2"
													>
														{attachment.attributes.name}
														<span className="text-xs text-gray-500">
															({(attachment.attributes.size / 1024).toFixed(1)} KB)
														</span>
													</a>
												</li>
											)
										)}
									</ul>
								</div>
							)}
						</div>
						<div className="mt-16 border-t border-gray-200 pt-8 dark:border-white/10">
							{nextLessonData ? (
								<NextPageLink
									title={nextLessonData.lesson.attributes.title}
									description={nextLessonData.lesson.attributes.description}
									href={`/${locale}/course/${nextLessonData.chapterSlug}/${nextLessonData.lesson.attributes.slug}`}
								/>
							) : (
								<NextPageLink
									title="Retour aux cours"
									description="Découvrez d'autres chapitres"
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
