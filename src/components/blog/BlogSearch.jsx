import { motion } from 'framer-motion'
import { Command } from 'lucide-react'

export function BlogSearch({ value, onChange, locale }) {
	const placeholder =
		locale === 'en' ? 'Search articles...' : 'Rechercher des articles...'
	return (
		<div className="">
			<div className={'relative mx-auto mt-8 flex w-full max-w-7xl'}>
				<motion.input
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					className="w-full max-w-7xl rounded-lg border border-white/70 bg-purple-700/50 px-4 py-2 text-white placeholder-white outline-0 focus:border-white focus:outline-none focus:ring-0 focus:ring-white"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				/>
				<Command className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
			</div>
		</div>
	)
}
