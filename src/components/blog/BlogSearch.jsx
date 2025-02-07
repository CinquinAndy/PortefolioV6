import { motion } from 'framer-motion'
import { Command } from 'lucide-react'

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
}

const elementVariants = {
	hidden: {
		opacity: 0,
		y: -20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 12,
			stiffness: 100,
		},
	},
}

export function BlogSearch({ value, onChange, locale }) {
	const placeholder =
		locale === 'en' ? 'Search articles...' : 'Rechercher des articles...'

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="mx-auto w-full max-w-5xl px-0 lg:px-8"
		>
			<div className="relative flex">
				<motion.input
					variants={elementVariants}
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					className="w-full rounded-lg border border-white/70 bg-purple-700/50 px-4 py-2 text-white placeholder-white outline-0 transition-colors duration-200 focus:border-white focus:outline-none focus:ring-0 focus:ring-white"
				/>
				<motion.div
					variants={elementVariants}
					className="absolute right-3 top-0 flex h-full items-center justify-center opacity-90"
				>
					<Command className="text-white/80 transition-colors duration-200 group-focus-within:text-white" />
				</motion.div>
			</div>
		</motion.div>
	)
}
