import { Command } from 'lucide-react'

import { motion, Variants } from 'framer-motion'

import type { Locale } from '@/types/strapi'

interface BlogSearchProps {
	value: string
	onChange: (value: string) => void
	locale: Locale
}

const containerVariants: Variants = {
	visible: {
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
}

const elementVariants: Variants = {
	visible: {
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 12,
		},
		opacity: 1,
	},
	hidden: {
		y: -20,
		opacity: 0,
	},
}

export function BlogSearch({ value, onChange, locale }: BlogSearchProps) {
	const placeholder = locale === 'en' ? 'Search articles...' : 'Rechercher des articles...'

	return (
		<motion.div
			animate="visible"
			className="mx-auto w-full max-w-5xl px-0 lg:px-8"
			initial="hidden"
			variants={containerVariants}
		>
			<div className="relative flex">
				<motion.input
					className="w-full rounded-lg border border-white/70 bg-purple-700/50 px-4 py-2 text-white placeholder-white outline-0 transition-colors duration-200 focus:border-white focus:outline-none focus:ring-0 focus:ring-white"
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					type="text"
					value={value}
					variants={elementVariants}
				/>
				<motion.div
					className="absolute right-3 top-0 flex h-full items-center justify-center opacity-90"
					variants={elementVariants}
				>
					<Command className="text-white/80 transition-colors duration-200 group-focus-within:text-white" />
				</motion.div>
			</div>
		</motion.div>
	)
}
