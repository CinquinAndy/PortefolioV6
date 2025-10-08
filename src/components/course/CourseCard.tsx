'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/course/StarRating'
import type { Course } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { getCourseTranslations, pluralize } from '@/utils/courseTranslations'

interface CourseCardProps {
	locale: Locale
	course: Course
}

const getCourseUrl = (locale: Locale, course: Course): string | undefined => {
	// Get the parent course slug (this course is the parent)
	const parentCourseSlug = course.attributes.slug

	// Get all chapters and sort by order
	const chapters = course.attributes.chapters?.data ?? []
	if (chapters.length === 0) {
		// No chapters at all
		return undefined
	}

	// Sort chapters by order and get the first one
	const sortedChapters = [...chapters].sort((a, b) => a.attributes.order - b.attributes.order)
	const firstChapter = sortedChapters[0]

	if (!firstChapter?.attributes?.slug) {
		return undefined
	}

	// Get all lessons from first chapter and sort by order
	const lessons = firstChapter.attributes.lessons?.data ?? []
	if (lessons.length > 0) {
		const sortedLessons = [...lessons].sort((a, b) => a.attributes.order - b.attributes.order)
		const firstLesson = sortedLessons[0]

		if (firstLesson?.attributes?.slug) {
			// If we have a lesson, link directly to it with parent course slug
			return `/${locale}/course/${parentCourseSlug}/${firstChapter.attributes.slug}/${firstLesson.attributes.slug}`
		}
	}

	// If we have chapters but no lessons yet, link to the chapter page
	// (This allows displaying courses that are being built)
	return `/${locale}/course/${parentCourseSlug}/${firstChapter.attributes.slug}`
}

export function CourseCard({ locale, course }: CourseCardProps) {
	const ref = useRef<HTMLDivElement>(null)
	const courseUrl = getCourseUrl(locale, course)
	const t = getCourseTranslations(locale)

	// Calculate stats
	const totalChapters = course.attributes.chapters?.data?.length ?? 0

	// Don't render card if no valid URL (no chapters at all)
	if (!courseUrl) {
		console.warn(`Course ${course.attributes.title} has no chapters, skipping card`)
		return null
	}

	return (
		<Link className="block" href={courseUrl}>
			<motion.div
				animate={{ y: 0, opacity: 1 }}
				className="group"
				initial={{ y: 20, opacity: 0 }}
				ref={ref}
				transition={{ duration: 0.3 }}
			>
				<div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
					{/* Animated background image container */}
					<motion.div className="absolute inset-0 -z-10">
						{course.attributes.thumbnail?.data?.attributes?.url ? (
							<div className="relative h-full w-full overflow-hidden">
								<Image
									alt={course.attributes.thumbnail.data.attributes.alternativeText || course.attributes.title}
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									fill
									priority={false}
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									src={course.attributes.thumbnail.data.attributes.url}
								/>
							</div>
						) : (
							<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
						)}
						<div className="absolute inset-0 left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-black/80 to-black/95" />
					</motion.div>

					{/* Card Header */}
					<div className="relative z-10 flex flex-col space-y-1.5 p-6 pt-48">
						<div className="relative">
							<div className="flex items-center justify-between text-sm">
								{course.attributes.difficulty ? (
									<StarRating rating={course.attributes.difficulty} />
								) : (
									<Badge className="border-cyan-500/30 bg-cyan-500/20 text-white" variant="outline">
										{course.attributes.level ?? t.level.beginner}
									</Badge>
								)}
								<div className="flex items-center gap-2 text-white/90">
									<span>
										{totalChapters} {pluralize(totalChapters, t.chapter, t.chapters)}
									</span>
								</div>
							</div>
							<div className="mt-4 text-xl font-bold leading-none tracking-tight text-white transition-colors group-hover:text-cyan-300">
								{course.attributes.title}
							</div>
							<div className="text-sm text-muted-foreground text-white/80">{course.attributes.description}</div>
						</div>
					</div>

					{/* Card Content displaying tags */}
					<div className="relative z-10 p-6 pt-0">
						<div className="flex flex-wrap gap-2">
							{course.attributes.tags?.slice(0, 5).map(tag => (
								<Badge className="border-indigo-500/30 bg-indigo-500/20 text-white" key={tag.id} variant="secondary">
									{tag.name}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</Link>
	)
}
