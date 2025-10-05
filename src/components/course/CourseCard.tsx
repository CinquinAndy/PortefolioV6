'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import type { Course } from '@/types/course'
import type { Locale } from '@/types/strapi'

interface CourseCardProps {
	locale: Locale
	course: Course
}

const getCourseUrl = (locale: Locale, course: Course): string | undefined => {
	// Get first chapter and first lesson
	const firstChapter = course.attributes.chapters?.data?.[0]
	const firstLesson = firstChapter?.attributes?.lessons?.data?.[0]

	if (firstChapter?.attributes?.slug && firstLesson?.attributes?.slug) {
		return `/${locale}/course/${firstChapter.attributes.slug}/${firstLesson.attributes.slug}`
	}

	// If no chapter/lesson structure, fallback to undefined to signal incomplete data
	return undefined
}

export function CourseCard({ locale, course }: CourseCardProps) {
	const ref = useRef<HTMLDivElement>(null)
	const courseUrl = getCourseUrl(locale, course)

	// Calculate stats
	const totalChapters = course.attributes.chapters?.data?.length ?? 0
	const totalLessons =
		course.attributes.chapters?.data?.reduce((acc, chapter) => {
			return acc + (chapter.attributes?.lessons?.data?.length ?? 0)
		}, 0) ?? 0

	// Don't render card if no valid URL
	if (!courseUrl) {
		console.warn(`Course ${course.attributes.title} has no chapters/lessons, skipping card`)
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
						<div
							className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
							style={{
								backgroundImage: `url(${course.attributes.thumbnail?.attributes?.url ?? '/placeholder.svg'})`,
							}}
						/>
						<div className="absolute inset-0 left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-black/80 to-black/95" />
					</motion.div>

					{/* Card Header */}
					<div className="relative z-10 flex flex-col space-y-1.5 p-6 pt-48">
						<div className="relative">
							<div className="flex items-center justify-between text-sm">
								<Badge className="border-cyan-500/30 bg-cyan-500/20 text-white" variant="outline">
									{course.attributes.level ?? 'Débutant'}
								</Badge>
								<div className="flex items-center gap-2 text-white/90">
									<span>
										{totalChapters} chapitre{totalChapters > 1 ? 's' : ''}
									</span>
									<span>•</span>
									<span>
										{totalLessons} leçon{totalLessons > 1 ? 's' : ''}
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
