import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb, BreadcrumbHome, Breadcrumbs, BreadcrumbSeparator } from '@/components/course/Breadcrumbs'
import { getLesson } from '@/data/courses/lessons'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getContentWebsite } from '@/services/getContentWebsite'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

interface PageParams {
	locale: string
	slug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { slug } = await params
	const lesson = await getLesson(slug)

	return {
		title: `${lesson?.title} - Cours - Andy Cinquin`,
		description: lesson?.description,
	}
}

interface LessonPageProps {
	params: Promise<PageParams>
}

export default async function LessonPage({ params }: LessonPageProps) {
	const { locale, slug } = await params
	const lesson = await getLesson(slug)

	if (!lesson) {
		notFound()
	}

	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

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
						<BreadcrumbSeparator className="max-md:hidden" />
						<Breadcrumb href={`/${locale}/course#${lesson.module.id}`} className="max-md:hidden">
							{lesson.module.title}
						</Breadcrumb>
						<BreadcrumbSeparator />
						<Breadcrumb>{lesson.title}</Breadcrumb>
					</Breadcrumbs>

					{/* Contenu de la leçon */}
					<div className="mt-8">
						<div className="-mx-2 sm:-mx-4">
							{lesson.video && (
								<div className="relative overflow-hidden rounded-2xl bg-slate-50/5 backdrop-blur-sm">
									<video
										controls
										poster={lesson.video.thumbnail}
										className="h-auto w-full"
										src={lesson.video.url}
										aria-label={lesson.title}
									>
										<track kind="captions" />
										Votre navigateur ne supporte pas la balise vidéo.
									</video>
								</div>
							)}
						</div>

						<div className="mx-auto mt-10 max-w-2xl">
							<div className="rounded-2xl bg-slate-50/5 p-8 backdrop-blur-sm">
								<h1 className="text-3xl font-bold text-slate-50">{lesson.title}</h1>
								<p className="mt-4 text-lg text-slate-300">{lesson.description}</p>

								{/* Contenu de la leçon - à personnaliser selon vos besoins */}
								<div className="prose prose-invert mt-8 max-w-none">
									<p className="text-slate-300">
										Le contenu de cette leçon sera bientôt disponible. Cette section peut inclure
										des explications détaillées, des exercices pratiques, et des ressources
										supplémentaires pour approfondir vos connaissances.
									</p>
								</div>

								{/* Navigation vers la prochaine leçon */}
								<div className="mt-16 border-t border-slate-50/10 pt-8">
									{lesson.next ? (
										<Link
											href={`/${locale}/course/${lesson.next.id}`}
											className="group block rounded-xl bg-slate-50/5 p-6 transition-all hover:bg-slate-50/10"
										>
											<div className="text-sm font-semibold text-cyan-400">Leçon suivante</div>
											<div className="mt-2 text-lg font-semibold text-slate-50 group-hover:text-cyan-300">
												{lesson.next.title}
											</div>
											<p className="mt-2 text-slate-300">{lesson.next.description}</p>
										</Link>
									) : (
										<Link
											href={`/${locale}/course`}
											className="group block rounded-xl bg-slate-50/5 p-6 transition-all hover:bg-slate-50/10"
										>
											<div className="text-sm font-semibold text-cyan-400">Terminé !</div>
											<div className="mt-2 text-lg font-semibold text-slate-50 group-hover:text-cyan-300">
												Retour à l'aperçu du cours
											</div>
											<p className="mt-2 text-slate-300">
												Félicitations ! Vous avez terminé ce module. Retournez à la page
												principale pour explorer d'autres modules.
											</p>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer content_website={content_website} />
		</>
	)
}
