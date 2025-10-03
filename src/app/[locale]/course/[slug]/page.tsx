import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb, BreadcrumbHome, Breadcrumbs, BreadcrumbSeparator } from '@/components/course/Breadcrumbs'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getCourses, getNextLesson } from '@/services/getCourses'
import { getContentWebsite } from '@/services/getContentWebsite'
import type { Lesson } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'

interface PageParams {
	locale: string
	slug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { slug, locale } = await params

	// Récupérer tous les cours pour trouver la leçon
	const courses_response = await getCourses(locale as Locale)
	const courses = getResponseData(courses_response)
	const safeCourses = Array.isArray(courses) ? courses : []

	// Chercher la leçon dans tous les cours
	let foundLesson: Lesson | null = null
	for (const course of safeCourses) {
		const lesson = course.attributes.lessons?.data?.find(l => l.attributes.slug === slug)
		if (lesson) {
			foundLesson = lesson
			break
		}
	}

	if (!foundLesson) {
		return {
			title: 'Leçon non trouvée',
		}
	}

	return {
		title: `${foundLesson.attributes.title} - Cours - Andy Cinquin`,
		description: foundLesson.attributes.description,
	}
}

interface LessonPageProps {
	params: Promise<PageParams>
}

export default async function LessonPage({ params }: LessonPageProps) {
	const { locale, slug } = await params

	// Récupérer tous les cours pour trouver la leçon et le cours parent
	const courses_response = await getCourses(locale as Locale)
	const courses = getResponseData(courses_response)
	const safeCourses = Array.isArray(courses) ? courses : []

	// Chercher la leçon et son cours parent
	let lesson: Lesson | null = null
	let parentCourse: typeof safeCourses[0] | null = null

	for (const course of safeCourses) {
		const foundLesson = course.attributes.lessons?.data?.find(l => l.attributes.slug === slug)
		if (foundLesson) {
			lesson = foundLesson
			parentCourse = course
			break
		}
	}

	if (!lesson || !parentCourse) {
		notFound()
	}

	// Trouver la leçon suivante
	const nextLessonData = await getNextLesson(slug, locale as Locale)

	// Récupérer le contenu du site pour la navigation
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	// Récupérer l'URL de la vidéo et du thumbnail
	const videoUrl = lesson.attributes.video?.data?.attributes?.url
	const videoThumbnail = lesson.attributes.video_thumbnail?.data?.attributes?.url
	const videoCaptions = lesson.attributes.video_captions?.data ?? []

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
						<Breadcrumb href={`/${locale}/course#${parentCourse.attributes.slug}`} className="max-md:hidden">
							{parentCourse.attributes.title}
						</Breadcrumb>
						<BreadcrumbSeparator />
						<Breadcrumb>{lesson.attributes.title}</Breadcrumb>
					</Breadcrumbs>

					{/* Contenu de la leçon */}
					<div className="mt-8">
						{/* Vidéo */}
						{videoUrl && (
							<div className="-mx-2 sm:-mx-4">
								<div className="relative overflow-hidden rounded-2xl bg-slate-50/5 backdrop-blur-sm">
									<video
										controls
										poster={videoThumbnail}
										className="h-auto w-full"
										src={videoUrl}
										aria-label={lesson.attributes.title}
									>
										{/* Sous-titres */}
										{videoCaptions.length > 0 ? (
											videoCaptions.map(caption => (
												<track
													key={caption.id}
													kind={caption.attributes.kind}
													src={caption.attributes.url}
													srcLang={caption.attributes.locale}
													label={caption.attributes.locale === 'fr' ? 'Français' : 'English'}
												/>
											))
										) : (
											<track kind="captions" src="" label="No captions available" />
										)}
										Votre navigateur ne supporte pas la balise vidéo.
									</video>
								</div>
							</div>
						)}

						{/* Contenu de la leçon */}
						<div className="mx-auto mt-10 max-w-2xl">
							<div className="rounded-2xl bg-slate-50/5 p-8 backdrop-blur-sm">
								<h1 className="text-3xl font-bold text-slate-50">{lesson.attributes.title}</h1>
								<p className="mt-4 text-lg text-slate-300">{lesson.attributes.description}</p>

								{/* Contenu markdown de la leçon */}
								{lesson.attributes.content && (
									<div
										className="prose prose-invert mt-8 max-w-none"
										dangerouslySetInnerHTML={{ __html: lesson.attributes.content }}
									/>
								)}

								{/* Pièces jointes */}
								{lesson.attributes.attachments?.data && lesson.attributes.attachments.data.length > 0 && (
									<div className="mt-8">
										<h3 className="text-xl font-semibold text-slate-50">Fichiers à télécharger</h3>
										<ul className="mt-4 space-y-2">
											{lesson.attributes.attachments.data.map(attachment => (
												<li key={attachment.id}>
													<a
														href={attachment.attributes.url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-cyan-400 hover:text-cyan-300"
													>
														📎 {attachment.attributes.name}
													</a>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Navigation vers la prochaine leçon */}
								<div className="mt-16 border-t border-slate-50/10 pt-8">
									{nextLessonData ? (
										<Link
											href={`/${locale}/course/${nextLessonData.attributes.slug}`}
											className="group block rounded-xl bg-slate-50/5 p-6 transition-all hover:bg-slate-50/10"
										>
											<div className="text-sm font-semibold text-cyan-400">Leçon suivante</div>
											<div className="mt-2 text-lg font-semibold text-slate-50 group-hover:text-cyan-300">
												{nextLessonData.attributes.title}
											</div>
											<p className="mt-2 text-slate-300">{nextLessonData.attributes.description}</p>
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
