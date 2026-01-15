'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

interface ExpandableSectionProps {
	title: string
	summary: string
	children: React.ReactNode
	defaultExpanded?: boolean
	className?: string
	titleClassName?: string
	icon?: React.ReactNode
}

// Animation variants for staggered text reveal
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			staggerChildren: 0.02,
			staggerDirection: -1,
		},
	},
}

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		filter: 'blur(10px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
	},
	exit: {
		opacity: 0,
		y: -10,
		filter: 'blur(5px)',
	},
}

export function ExpandableSection({
	title,
	summary,
	children,
	defaultExpanded = false,
	className = '',
	titleClassName = '',
	icon,
}: ExpandableSectionProps) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded)

	return (
		<div
			className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/50 via-slate-900/50 to-sky-950/50 backdrop-blur-sm ${className}`}
		>
			{/* Glassmorphism glow effect */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-500/5" />

			{/* Header - Always visible */}
			<button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				className="group relative flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/5 md:p-8"
			>
				<div className="flex flex-1 items-center gap-4">
					{icon && (
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400">
							{icon}
						</div>
					)}
					<div className="flex-1">
						<h3 className={`font-serif text-xl font-semibold text-white md:text-2xl ${titleClassName}`}>{title}</h3>
						<p className="mt-1 text-sm text-slate-400 md:text-base">{summary}</p>
					</div>
				</div>

				<motion.div
					animate={{ rotate: isExpanded ? 180 : 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-400 transition-colors group-hover:bg-white/20 group-hover:text-white"
				>
					<ChevronDown className="h-5 w-5" />
				</motion.div>
			</button>

			{/* Expandable content with vaporize-like reveal animation */}
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
							opacity: { duration: 0.3, delay: 0.1 },
						}}
						className="overflow-hidden"
					>
						<div className="border-t border-white/10 px-6 py-6 md:px-8 md:py-8">
							<motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
								{children}
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

// Animated text item component for use inside ExpandableSection
interface AnimatedItemProps {
	children: React.ReactNode
	className?: string
}

export function AnimatedItem({ children, className = '' }: AnimatedItemProps) {
	return (
		<motion.div variants={itemVariants} transition={{ duration: 0.5, ease: 'easeOut' }} className={className}>
			{children}
		</motion.div>
	)
}

// Export a simple link card for the links section
interface LinkCardProps {
	href: string
	icon: React.ReactNode
	title: string
	description?: string
}

export function LinkCard({ href, icon, title, description }: LinkCardProps) {
	return (
		<motion.a
			variants={itemVariants}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/30 hover:bg-white/10"
		>
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400 transition-colors group-hover:from-indigo-500/30 group-hover:to-cyan-500/30">
				{icon}
			</div>
			<div className="flex-1 overflow-hidden">
				<h4 className="truncate font-medium text-white transition-colors group-hover:text-cyan-400">{title}</h4>
				{description && <p className="truncate text-sm text-slate-500">{description}</p>}
			</div>
			<ChevronDown className="h-4 w-4 -rotate-90 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
		</motion.a>
	)
}

// Export a project card for featured projects
interface ProjectCardProps {
	href: string
	githubUrl?: string
	title: string
	description: string
	highlight?: string
}

export function ProjectCard({ href, githubUrl, title, description, highlight }: ProjectCardProps) {
	return (
		<motion.div
			variants={itemVariants}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-indigo-950/30 to-slate-900/30 p-4 transition-all hover:border-cyan-500/30 md:p-5"
		>
			{highlight && (
				<span className="mb-2 inline-block rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
					{highlight}
				</span>
			)}
			<h4 className="mb-2 font-semibold text-white">{title}</h4>
			<p className="mb-4 text-sm leading-relaxed text-slate-400">{description}</p>
			<div className="flex flex-wrap gap-2">
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
				>
					View Project →
				</a>
				{githubUrl && (
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
					>
						GitHub
					</a>
				)}
			</div>
		</motion.div>
	)
}
