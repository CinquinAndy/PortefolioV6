'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FancyCard } from '@/components/ui/fancy-card'
import type { Locale } from '@/types/strapi'

interface CourseHighlightCardProps {
	locale: Locale
}

export function CourseHighlightCard({ locale }: CourseHighlightCardProps) {
	const content = {
		fr: {
			title: 'Découvrez mes Formations',
			subtitle: 'Apprenez le développement web moderne',
			description:
				'Explorez ma plateforme de cours complets sur JavaScript, React, Next.js et bien plus. Des tutoriels structurés pour tous les niveaux.',
			cta: 'Accéder aux cours',
		},
		en: {
			title: 'Discover my Training Courses',
			subtitle: 'Learn modern web development',
			description:
				'Explore my platform of comprehensive courses on JavaScript, React, Next.js and more. Structured tutorials for all levels.',
			cta: 'Access courses',
		},
	}

	const text = content[locale]

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="mx-auto w-full max-w-5xl px-0 lg:px-8"
		>
			<Link href={`/${locale}/course`} className="block group">
				<FancyCard
					variant="dots"
					className="bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-sky-950/40 backdrop-blur-sm border-indigo-500/30 dark:border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300"
				>
					<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
						{/* Content Section */}
						<div className="flex-1 space-y-3">
							<div className="flex items-center gap-2">
								<h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors">
									{text.title}
								</h3>
							</div>
							<p className="text-lg text-indigo-200 font-medium">{text.subtitle}</p>
							<p className="text-slate-300 leading-relaxed">{text.description}</p>
						</div>
						{/* CTA Section */}
						<div className="flex-shrink-0 w-full md:w-auto">
							<div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg group-hover:from-indigo-500 group-hover:to-purple-500 transition-all shadow-lg group-hover:shadow-indigo-500/50">
								<span>{text.cta}</span>
								<svg
									className="w-5 h-5 group-hover:translate-x-1 transition-transform"
									fill="none"
									aria-hidden="true"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</div>
						</div>
					</div>
				</FancyCard>
			</Link>
		</motion.div>
	)
}
