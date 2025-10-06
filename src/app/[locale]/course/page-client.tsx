'use client'

import { Suspense, use } from 'react'
import { MasonryGrid } from '@/components/blog/MasonryGrid'
import { CourseCard } from '@/components/course/CourseCard'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import type { Course } from '@/types/course'
import type { ContentWebsite, Locale } from '@/types/strapi'

interface PageProps {
	params: Promise<{ locale: Locale }>
	coursesData: Course[]
	content_website: ContentWebsite
}

function getInitialColumns(): number {
	if (typeof window === 'undefined') return 3
	const width = window.innerWidth
	if (width < 640) return 1
	if (width < 1024) return 2
	if (width < 1536) return 3
	return 4
}

function CourseContentSkeleton() {
	return (
		<section className="relative w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative space-y-8 py-12 md:py-16 lg:py-20">
					{/* Grid skeleton */}
					<div className="mx-auto max-w-360">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }, (_, i) => (
								<div key={`skeleton-${i}`} className="bg-gray-300 rounded-lg h-64 animate-pulse" />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function CoursePage({ params, coursesData, content_website }: PageProps) {
	const { locale } = use(params)

	// Calculate total stats with safe navigation
	const totalChapters = coursesData.reduce((acc, course) => {
		const chaptersCount = course.attributes.chapters?.data?.length ?? 0
		return acc + chaptersCount
	}, 0)

	const totalLessons = coursesData.reduce((acc, course) => {
		const chapters = course.attributes.chapters?.data ?? []

		// Debug: Log first chapter structure to see lessons
		if (chapters.length > 0 && course.attributes.title.includes('Frameworks')) {
			console.log('First chapter lessons structure:', {
				chapterTitle: chapters[0].attributes?.title,
				hasLessons: !!chapters[0].attributes?.lessons,
				lessonsData: chapters[0].attributes?.lessons?.data,
				lessonsCount: chapters[0].attributes?.lessons?.data?.length ?? 0,
			})
		}

		const lessonsInCourse = chapters.reduce((chapterAcc, chapter) => {
			const lessonsCount = chapter.attributes?.lessons?.data?.length ?? 0
			return chapterAcc + lessonsCount
		}, 0)
		return acc + lessonsInCourse
	}, 0)

	return (
		<>
			<Nav locale={locale} content_website={content_website} isHome={false} />

			<div>
				{/* Hero Section */}
				<section className="relative w-full pt-32 pb-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">Mes Cours de Développement</h1>
							<p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
								Découvrez mes cours complets pour maîtriser le développement web moderne. Du JavaScript aux frameworks
								les plus populaires.
							</p>

							{/* Stats */}
							<div className="mt-10 flex flex-wrap justify-center gap-8 text-white">
								<div className="text-center">
									<div className="text-4xl font-bold text-cyan-400">{coursesData.length}</div>
									<div className="text-sm text-white/70">Cours complets</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold text-indigo-400">{totalChapters}</div>
									<div className="text-sm text-white/70">Chapitres</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold text-purple-400">{totalLessons}</div>
									<div className="text-sm text-white/70">Leçons</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Courses Grid */}
				<section className="relative w-full pb-20">
					<div className="mx-auto px-4 sm:px-6 lg:px-8">
						<Suspense fallback={<CourseContentSkeleton />}>
							{coursesData.length > 0 ? (
								<div className="mx-auto max-w-360">
									<MasonryGrid
										initialColumns={getInitialColumns()}
										items={coursesData}
										locale={locale}
										renderItem={course => <CourseCard course={course} locale={locale} />}
									/>
								</div>
							) : (
								<div className="py-12 text-center text-white">
									<div className="text-xl font-semibold mb-2">
										{locale === 'fr' ? 'Aucun cours disponible' : 'No courses available'}
									</div>
									<div className="text-sm text-white/70">
										{locale === 'fr'
											? 'Vérifiez que votre API Strapi est bien lancée et accessible.'
											: 'Please check that your Strapi API is running and accessible.'}
									</div>
								</div>
							)}
						</Suspense>
					</div>
				</section>

				<Cta content_website={content_website} />
			</div>

			<Footer content_website={content_website} />
		</>
	)
}
