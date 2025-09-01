'use client'

import type { Article, Locale } from '@/types/strapi'

import { useMemo, useState } from 'react'

import Fuse from 'fuse.js'

import { MasonryGrid } from './MasonryGrid'
import { ArticleCard } from './ArticleCard'
import { BlogSearch } from './BlogSearch'

interface BlogContentProps {
	locale: Locale
	articles: Article[]
}

export function BlogContent({ locale, articles }: BlogContentProps) {
	const [searchQuery, setSearchQuery] = useState<string>('')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedType, setSelectedType] = useState<string>('all')

	const fuse = useMemo(
		() =>
			new Fuse(articles, {
				threshold: 0.3,
				keys: [
					'attributes.title',
					'attributes.subtitle',
					'attributes.description',
					{
						name: 'attributes.tags.name',
						getFn: article => article.attributes.tags?.map(tag => tag.name).join(' ') ?? '',
					},
				],
			}),
		[articles]
	)

	const filteredArticles = useMemo((): Article[] => {
		let results = articles

		if (searchQuery) {
			results = fuse.search(searchQuery).map(result => result.item)
		}

		return results.filter(article => selectedType === 'all' || article.attributes.type === selectedType)
	}, [searchQuery, selectedType, articles, fuse])

	return (
		<section className="relative w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative space-y-8 py-12 md:py-16 lg:py-20">
					<BlogSearch locale={locale} onChange={setSearchQuery} value={searchQuery} />
					{filteredArticles.length > 0 ? (
						<div className="mx-auto max-w-360">
							<MasonryGrid
								initialColumns={getInitialColumns()}
								items={filteredArticles}
								locale={locale}
								renderItem={article => <ArticleCard article={article} locale={locale} />}
							/>
						</div>
					) : (
						<div className="py-12 text-center text-white">
							<div>{locale === 'fr' ? 'Aucun article trouvé' : 'No articles found'}</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

function getInitialColumns(): number {
	if (typeof window === 'undefined') return 3
	const width = window.innerWidth
	if (width < 640) return 1
	if (width < 1024) return 2
	if (width < 1536) return 3
	return 4
}
