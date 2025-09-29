'use client'

import type { Article } from '@/types/strapi'

interface TagFiltersProps {
	selectedType: string
	onTypeChange: (type: string) => void
	articles: Article[]
}

export function TagFilters({ selectedType, onTypeChange, articles }: TagFiltersProps) {
	// Extract unique categories from the articles
	const types: string[] = [
		'all',
		...new Set(articles.map(article => article.attributes.type).filter((type): type is string => type !== undefined)),
	]

	return (
		<div className="flex flex-wrap justify-center gap-2">
			{types.map(type => (
				<button
					type="button"
					className={`rounded-full px-4 py-2 transition-all ${
						selectedType === type ? 'bg-purple-500 text-white' : 'bg-purple-700/50 text-purple-200 hover:bg-purple-600'
					}`}
					key={type}
					onClick={() => onTypeChange(type)}
				>
					{type}
				</button>
			))}
		</div>
	)
}
