import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbHome, Breadcrumbs, BreadcrumbSeparator } from '@/components/course/Breadcrumbs'
import { ContentLink } from '@/components/course/ContentLink'
import { PageSection } from '@/components/course/PageSection'
import { BookIcon } from '@/components/course/icons/BookIcon'
import { ClockIcon } from '@/components/course/icons/ClockIcon'
import { LessonsIcon } from '@/components/course/icons/LessonsIcon'
import { PlayIcon } from '@/components/course/icons/PlayIcon'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getCourses } from '@/services/getCourses'
import { getContentWebsite } from '@/services/getContentWebsite'
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

	// Récupérer les cours depuis Strapi
	const courses_response = await getCourses(locale as Locale)
	const courses = getResponseData(courses_response)
	const safeCourses = Array.isArray(courses) ? courses : []

	// Calculer les statistiques globales
	const totalLessons = safeCourses.reduce((sum, course) => sum + (course.attributes.lessons?.data?.length ?? 0), 0)
	const totalDuration = safeCourses.reduce((sum, course) => sum + (course.attributes.duration_total ?? 0), 0)

	// Récupérer le contenu du site pour la navigation
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	// Trouver le premier cours et sa première leçon pour le bouton CTA
	const firstCourse = safeCourses[0]
	const firstLesson = firstCourse?.attributes.lessons?.data?.[0]

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
								<h1 className="text-4xl font-bold text-slate-50 md:text-5xl lg:text-6xl">
									Mes Cours
								</h1>
								<p className="mt-7 max-w-lg text-base/7 text-pretty text-slate-300">
									Un parcours complet pour vous aider à maîtriser le développement web moderne et
									les meilleures pratiques.
								</p>

								{/* Stats */}
								<div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm/7 font-semibold text-slate-50 sm:gap-3">
									<div className="flex items-center gap-1.5">
										<BookIcon className="stroke-slate-50/40" />
										{safeCourses.length} modules
									</div>
									<span className="hidden text-slate-50/25 sm:inline">&middot;</span>
									<div className="flex items-center gap-1.5">
										<LessonsIcon className="stroke-slate-50/40" />
										{totalLessons} leçons
									</div>
									<span className="hidden text-slate-50/25 sm:inline">&middot;</span>
									<div className="flex items-center gap-1.5">
										<ClockIcon className="stroke-slate-50/40" />
										{formatDuration(totalDuration)}
									</div>
								</div>

								{/* CTA Button */}
								{firstLesson && (
									<div className="mt-10">
										<Link
											href={`/${locale}/course/${firstLesson.attributes.slug}`}
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

							{/* Modules List */}
							<div className="grid grid-cols-1 gap-y-16 px-4 pb-10 sm:px-4">
								{safeCourses.map((course: Course, index: number) => {
									const lessons = course.attributes.lessons?.data ?? []

									return (
										<PageSection
											key={course.id}
											id={course.attributes.slug}
											title={`Partie ${index + 1}`}
										>
											<div className="max-w-2xl">
												<h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-slate-50">
													{course.attributes.title}
												</h2>
												<p className="mt-4 text-base/7 text-slate-300 sm:text-sm/7">
													{course.attributes.description}
												</p>

												<ol className="mt-6 space-y-4">
													{lessons.map(lesson => (
														<li key={lesson.id}>
															<ContentLink
																title={lesson.attributes.title}
																description={lesson.attributes.description}
																href={lesson.attributes.slug}
																duration={lesson.attributes.video_duration}
																locale={locale}
															/>
														</li>
													))}
												</ol>
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
