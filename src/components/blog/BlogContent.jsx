'use client'

import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { BlogSearch } from './BlogSearch'
import { MasonryGrid } from './MasonryGrid'
import { ArticleCard } from './ArticleCard'

// Utility function to determine initial columns
function getInitialColumns() {
	if (typeof window === 'undefined') return 3 // Default value for server-side
	const width = window.innerWidth
	if (width < 640) return 1
	if (width < 1024) return 2
	if (width < 1536) return 3
	return 4
}

export function BlogContent({ articles, locale }) {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedType, setSelectedType] = useState('all')

	const fuse = useMemo(
		() =>
			new Fuse(articles, {
				keys: [
					'attributes.title',
					'attributes.subtitle',
					'attributes.description',
					{
						name: 'attributes.tags.name',
						getFn: article =>
							article.attributes.tags.map(tag => tag.name).join(' '),
					},
				],
				threshold: 0.3,
			}),
		[articles]
	)

	const filteredArticles = useMemo(() => {
		let results = articles

		if (searchQuery) {
			results = fuse.search(searchQuery).map(result => result.item)
		}

		return results.filter(
			article =>
				selectedType === 'all' || article.attributes.type === selectedType
		)
	}, [searchQuery, selectedType, articles, fuse])

	return (
		<div className="mx-auto max-w-[80vw] space-y-8 px-6 pb-12">
			<BlogSearch
				value={searchQuery}
				onChange={setSearchQuery}
				locale={locale}
			/>
			{filteredArticles.length > 0 ? (
				<MasonryGrid
					items={filteredArticles}
					renderItem={article => (
						<ArticleCard article={article} locale={locale} />
					)}
					initialColumns={getInitialColumns()}
					locale={locale}
				/>
			) : (
				<div className="py-12 text-center text-white">
					<div>No articles found</div>
				</div>
			)}
		</div>
	)
}
