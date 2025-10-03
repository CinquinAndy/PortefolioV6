import { Breadcrumb, BreadcrumbHome, Breadcrumbs, BreadcrumbSeparator } from '@/components/course/Breadcrumbs'
import { NextPageLink } from '@/components/course/NextPageLink'
import { SidebarLayoutContent } from '@/components/course/SidebarLayout'
import TableOfContents from '@/components/course/TableOfContents'
import { getCourseBySlug, getLessonBySlug, getNextLesson } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageParams {
	locale: Locale
	courseSlug: string
	lessonSlug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale, lessonSlug } = await params
	const lessonData = await getLessonBySlug(lessonSlug, locale)

	if ('notFound' in lessonData || !lessonData.data) {
		return {
			title: 'Leçon non trouvée',
		}
	}

	const lesson = lessonData.data

	return {
		title: `${lesson.attributes.title} - Leçon`,
		description: lesson.attributes.description,
	}
}

export default async function LessonPage({ params }: { params: Promise<PageParams> }) {
	const { locale, courseSlug, lessonSlug } = await params

	// Fetch lesson data
	const lessonData = await getLessonBySlug(lessonSlug, locale)
	if ('notFound' in lessonData || !lessonData.data) {
		notFound()
	}
	const lesson = lessonData.data

	// Fetch course data to get course title
	const courseData = await getCourseBySlug(courseSlug, locale)
	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		notFound()
	}
	const course = courseData.data[0]

	// Get next lesson
	const nextLesson = await getNextLesson(lessonSlug, locale)

	return (
		<SidebarLayoutContent
			breadcrumbs={
				<Breadcrumbs>
					<BreadcrumbHome locale={locale} />
					<BreadcrumbSeparator className="max-md:hidden" />
					<Breadcrumb href={`/${locale}/course/${courseSlug}`} className="max-md:hidden">
						{course.attributes.title}
					</Breadcrumb>
					<BreadcrumbSeparator />
					<Breadcrumb>{lesson.attributes.title}</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<div className="mx-auto max-w-7xl">
				{/* Video Section */}
				{lesson.attributes.video?.data && (
					<div className="-mx-2 sm:-mx-4">
						<div className="relative aspect-video overflow-hidden rounded-lg bg-slate-900/50">
							<video
								id="video"
								controls
								poster={lesson.attributes.video_thumbnail?.data?.attributes?.url}
								className="h-full w-full object-cover"
							>
								<source src={lesson.attributes.video.data.attributes.url} type="video/mp4" />
								{lesson.attributes.video_captions?.data?.map((caption) => (
									<track
										key={caption.id}
										kind={caption.attributes.kind}
										src={caption.attributes.url}
										srcLang={caption.attributes.locale}
										label={caption.attributes.locale === 'fr' ? 'Français' : 'English'}
									/>
								))}
								Votre navigateur ne supporte pas la lecture de vidéos.
							</video>
						</div>
					</div>
				)}

				{/* Content Section */}
				<div className="mx-auto flex max-w-2xl gap-x-10 py-10 sm:py-14 lg:max-w-5xl">
					<div className="w-full flex-1">
						{/* Lesson Content */}
						<div id="content" className="prose prose-invert prose-slate max-w-none">
							<h1 className="text-3xl font-bold text-slate-50">{lesson.attributes.title}</h1>
							<p className="text-lg text-slate-300">{lesson.attributes.description}</p>

							{/* Render markdown content */}
							{lesson.attributes.content && (
								<div
									className="mt-8"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: Content comes from trusted Strapi CMS
									dangerouslySetInnerHTML={{ __html: lesson.attributes.content }}
								/>
							)}

							{/* Attachments */}
							{lesson.attributes.attachments?.data && lesson.attributes.attachments.data.length > 0 && (
								<div className="mt-8">
									<h2 className="text-2xl font-bold text-slate-50">Pièces jointes</h2>
									<ul className="mt-4 space-y-2">
										{lesson.attributes.attachments.data.map((attachment) => (
											<li key={attachment.id}>
												<a
													href={attachment.attributes.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-cyan-400 hover:text-cyan-300 transition-colors"
												>
													{attachment.attributes.name}
												</a>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						{/* Next Lesson Link */}
						<div className="mt-16 border-t border-slate-50/10 pt-8">
							{nextLesson ? (
								<NextPageLink
									title={nextLesson.attributes.title}
									description={nextLesson.attributes.description}
									href={`/${locale}/course/${courseSlug}/${nextLesson.attributes.slug}`}
								/>
							) : (
								<NextPageLink
									title="Retour aux cours"
									description="Découvrez d'autres cours pour continuer votre apprentissage"
									href={`/${locale}/course`}
								/>
							)}
						</div>
					</div>

					{/* Table of Contents - Only on large screens */}
					<div className="hidden w-66 lg:block">
						<TableOfContents contentId="content" />
					</div>
				</div>
			</div>
		</SidebarLayoutContent>
	)
}
