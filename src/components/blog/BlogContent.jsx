'use client'

import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { BlogSearch } from './BlogSearch'
import { MasonryGrid } from './MasonryGrid'
import { Pagination } from '@/components/Global/Pagination'
import { ArticleCard } from '@/components/blog/ArticleCard'

export function BlogContent({ articles, content_website, params, pagination }) {
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
	}, [searchQuery, selectedType, fuse])

	return (
		<div className="mx-auto max-w-[80vw] space-y-8 px-6">
			<BlogSearch value={searchQuery} onChange={setSearchQuery} />
			{filteredArticles.length > 0 ? (
				<MasonryGrid
					items={filteredArticles}
					renderItem={article => (
						<ArticleCard
							article={article}
							content_website={content_website}
							locale={params.locale}
						/>
					)}
				/>
			) : (
				<div className="py-12 text-center text-white">
					<div>No articles found</div>
				</div>
			)}
			<div className="mt-8">
				<Pagination {...pagination} />
			</div>
		</div>
	)
}
