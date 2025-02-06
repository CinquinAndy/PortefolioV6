'use client'

// New component for tag filtering
import { useState } from 'react'

export function TagFilters({ articles }) {
	const [selectedType, setSelectedType] = useState('all')

	const types = [
		'all',
		...new Set(articles.map(article => article.attributes.type)),
	]

	return (
		<div className="flex flex-wrap justify-center gap-2">
			{types.map(type => (
				<button
					key={type}
					onClick={() => setSelectedType(type)}
					className={`rounded-full px-4 py-2 transition-all ${
						selectedType === type
							? 'bg-purple-500 text-white'
							: 'bg-purple-700/50 text-purple-200 hover:bg-purple-600'
					}`}
				>
					{type}
				</button>
			))}
		</div>
	)
}
