'use client'

import { Suspense, use, useEffect } from 'react'
import { MasonryGrid } from '@/components/blog/MasonryGrid'
import { CourseCard } from '@/components/course/CourseCard'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import type { Course } from '@/types/course'
import type { ContentWebsite, Locale } from '@/types/strapi'
import { getCourseTranslations } from '@/utils/courseTranslations'

interface PageProps {
	params: Promise<{ locale: Locale }>
	coursesData: Course[]
	totalChapters: number
	totalLessons: number
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

export default function CoursePage({ params, coursesData, totalChapters, totalLessons, content_website }: PageProps) {
	const { locale } = use(params)
	const t = getCourseTranslations(locale)

	useEffect(() => {
		console.log('coursesData', coursesData)
		console.log('totalChapters', totalChapters)
		console.log('totalLessons', totalLessons)
	}, [coursesData, totalChapters, totalLessons])
	
	return (
		<>
			<Nav locale={locale} content_website={content_website} isHome={false} />

			<div>
				{/* Hero Section */}
				<section className="relative w-full pt-32 pb-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">{t.coursesPage.title}</h1>
							<p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
								{t.coursesPage.description}
							</p>

							{/* Stats */}
							<div className="mt-10 flex flex-wrap justify-center gap-8 text-white">
								<div className="text-center">
									<div className="text-4xl font-bold text-cyan-400">{coursesData.length}</div>
									<div className="text-sm text-white/70">{t.coursesPage.stats.completeCourses}</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold text-indigo-400">{totalChapters}</div>
									<div className="text-sm text-white/70">{t.coursesPage.stats.chapters}</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold text-purple-400">{totalLessons}</div>
									<div className="text-sm text-white/70">{t.coursesPage.stats.lessons}</div>
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
										{t.coursesPage.noCourses}
									</div>
									<div className="text-sm text-white/70">
										{t.coursesPage.noCoursesDescription}
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
