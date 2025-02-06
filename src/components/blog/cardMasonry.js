'use client'

import { useState } from 'react'
import { ArticleCard } from '@/components/blog/article-card'
import { MasonryGrid } from '@/components/blog/masonry-grid'

export function CardMasonry({ articles, params }) {
	const [sortBy, setSortBy] = useState('date') // You can add sorting options

	const sortedArticles = [...articles].sort((a, b) => {
		// Add your sorting logic here
		return new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
	})

	return (
		<div>
			<div className="mb-8 flex justify-end">
				<select
					className="rounded-lg bg-purple-700 px-4 py-2 text-white"
					value={sortBy}
					onChange={e => setSortBy(e.target.value)}
				>
					<option value="date">Latest</option>
					<option value="title">Title</option>
					{/* Add more sorting options */}
				</select>
			</div>
			<MasonryGrid
				items={sortedArticles}
				renderItem={article => (
					<ArticleCard article={article} locale={params.locale} />
				)}
			/>
		</div>
	)
}
