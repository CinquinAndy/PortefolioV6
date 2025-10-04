import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbHome, BreadcrumbSeparator, Breadcrumbs } from '@/components/course/Breadcrumbs'
import { ContentLink } from '@/components/course/ContentLink'
import { BookIcon } from '@/components/course/icons/BookIcon'
import { ClockIcon } from '@/components/course/icons/ClockIcon'
import { LessonsIcon } from '@/components/course/icons/LessonsIcon'
import { PlayIcon } from '@/components/course/icons/PlayIcon'
import { PageSection } from '@/components/course/PageSection'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getContentWebsite } from '@/services/getContentWebsite'
import { getParentCourses } from '@/services/getCourses'
import type { Course } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

interface PageParams {
	locale: string
}

export const metadata: Metadata = {
	title: 'Cours - Andy Cinquin',
	description: 'Découvrez mes cours et formations en développement web et programmation.',
}

function formatDuration(seconds: number): string {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)

	return h > 0 ? (m > 0 ? `${h} hr ${m} min` : `${h} hr`) : `${m} min`
}

interface CoursePageProps {
	params: Promise<PageParams>
}

export default async function CoursePage({ params }: CoursePageProps) {
	const { locale } = await params

	// Récupérer les cours parents depuis Strapi
	const courses_response = await getParentCourses(locale as Locale)
	const courses = getResponseData(courses_response)
	const safeCourses = Array.isArray(courses) ? courses : []

	// Calculer les statistiques globales (chapitres + leçons)
	let totalChapters = 0
	let totalLessons = 0
	let totalDuration = 0

	for (const course of safeCourses) {
		const chapters = course.attributes.chapters?.data ?? []
		totalChapters += chapters.length

		for (const chapter of chapters) {
			const lessons = chapter.attributes.lessons?.data ?? []
			totalLessons += lessons.length
		}

		totalDuration += course.attributes.duration_total ?? 0
	}

	// Récupérer le contenu du site pour la navigation
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	// Trouver le premier cours, son premier chapitre et sa première leçon pour le bouton CTA
	const firstCourse = safeCourses[0]
	const firstChapter = firstCourse?.attributes.chapters?.data?.[0]
	const firstLesson = firstChapter?.attributes.lessons?.data?.[0]

	return (
		<>
			<Nav locale={locale} content_website={content_website} />

			<div className="relative min-h-screen">
				{/* Background gradient animé */}
				<div className="gradient-bg">
					<svg xmlns="http://www.w3.org/2000/svg" className="svg" aria-hidden="true">
						<defs>
							<filter id="goo">
								<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
								<feColorMatrix
									in="blur"
									mode="matrix"
									values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
									result="goo"
								/>
								<feBlend in="SourceGraphic" in2="goo" />
							</filter>
						</defs>
					</svg>
					<div className="gradients-container">
						<div className="g1"></div>
						<div className="g2"></div>
						<div className="g3"></div>
						<div className="g4"></div>
						<div className="g5"></div>
					</div>
				</div>

				{/* Contenu principal */}
				<div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
					{/* Breadcrumbs */}
					<Breadcrumbs>
						<BreadcrumbHome locale={locale} />
						<BreadcrumbSeparator />
						<Breadcrumb>Aperçu</Breadcrumb>
					</Breadcrumbs>

					{/* Hero Section */}
					<div className="relative mt-8 overflow-hidden rounded-2xl bg-slate-50/5 backdrop-blur-sm">
						<div className="absolute inset-0 -z-10 h-80 overflow-hidden rounded-t-2xl sm:h-88 md:h-112 lg:h-128">
							<div className="absolute inset-0 rounded-t-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20" />
							<div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-slate-50/10" />
						</div>

						<div className="mx-auto max-w-6xl">
							<div className="relative px-4 pt-48 pb-12 lg:py-24">
								<h1 className="text-4xl font-bold text-slate-50 md:text-5xl lg:text-6xl">Mes Cours</h1>
								<p className="mt-7 max-w-lg text-base/7 text-pretty text-slate-300">
									Un parcours complet pour vous aider à maîtriser le développement web moderne et les meilleures
									pratiques.
								</p>

								{/* Stats */}
								<div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm/7 font-semibold text-slate-50 sm:gap-3">
									<div className="flex items-center gap-1.5">
										<BookIcon className="stroke-slate-50/40" />
										{totalChapters} chapitres
									</div>
									<span className="hidden text-slate-50/25 sm:inline">&middot;</span>
									<div className="flex items-center gap-1.5">
										<LessonsIcon className="stroke-slate-50/40" />
										{totalLessons} leçons
									</div>
									{totalDuration > 0 && (
										<>
											<span className="hidden text-slate-50/25 sm:inline">&middot;</span>
											<div className="flex items-center gap-1.5">
												<ClockIcon className="stroke-slate-50/40" />
												{formatDuration(totalDuration)}
											</div>
										</>
									)}
								</div>

								{/* CTA Button */}
								{firstChapter && firstLesson && (
									<div className="mt-10">
										<Link
											href={`/${locale}/course/${firstChapter.attributes.slug}/${firstLesson.attributes.slug}`}
											className="button-cyan inline-flex items-center gap-x-2 rounded-full px-6 py-3 text-sm/7 font-semibold shadow-lg transition-all hover:shadow-xl"
										>
											<span className="button-cyan-title flex items-center gap-x-2">
												<PlayIcon className="fill-white" />
												Commencer le cours
											</span>
										</Link>
									</div>
								)}
							</div>

							{/* Courses List */}
							<div className="grid grid-cols-1 gap-y-16 px-4 pb-10 sm:px-4">
								{safeCourses.map((course: Course) => {
									const chapters = course.attributes.chapters?.data ?? []

									return (
										<PageSection key={course.id} id={course.attributes.slug} title={course.attributes.title}>
											<div className="max-w-2xl">
												<h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-slate-50">
													{course.attributes.description}
												</h2>

												{/* Chapters List */}
												<div className="mt-6 space-y-8">
													{chapters.map(
														(
															chapter: {
																id: number
																attributes: {
																	slug: string
																	title: string
																	description: string
																	lessons?: { data?: unknown[] }
																}
															},
															chapterIndex: number
														) => {
															const lessons = (chapter.attributes.lessons?.data ?? []) as {
																id: number
																attributes: { slug: string; title: string; description: string; video_duration: number }
															}[]

															return (
																<div key={chapter.id}>
																	<h3 className="text-lg font-semibold text-cyan-400">
																		{chapterIndex + 1}. {chapter.attributes.title}
																	</h3>
																	<p className="mt-2 text-sm text-slate-400">{chapter.attributes.description}</p>

																	<ol className="mt-4 space-y-3">
																		{lessons.map(
																			(lesson: {
																				id: number
																				attributes: {
																					slug: string
																					title: string
																					description: string
																					video_duration: number
																				}
																			}) => (
																				<li key={lesson.id}>
																					<ContentLink
																						title={lesson.attributes.title}
																						description={lesson.attributes.description}
																						href={`${chapter.attributes.slug}/${lesson.attributes.slug}`}
																						duration={lesson.attributes.video_duration}
																						locale={locale}
																					/>
																				</li>
																			)
																		)}
																	</ol>
																</div>
															)
														}
													)}
												</div>
											</div>
										</PageSection>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer content_website={content_website} />
		</>
	)
}
