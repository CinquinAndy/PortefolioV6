'use client'

import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Fuse from 'fuse.js'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Article, Locale } from '@/types/strapi'
import { ArticleCard } from './ArticleCard'
import { BlogSearch } from './BlogSearch'
import { MasonryGrid } from './MasonryGrid'

interface BlogContentProps {
	locale: Locale
	articles: Article[]
}

export function BlogContent({ locale, articles }: BlogContentProps) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const [searchQuery, setSearchQuery] = useState<string>('')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedType, _setSelectedType] = useState<string>('all')
	const [currentPage, setCurrentPage] = useState<number>(1)

	const pageSize = 12

	// Update current page from URL params
	useEffect(() => {
		const page = searchParams?.get('page')
		setCurrentPage(page != null && page !== '' ? parseInt(page, 10) : 1)
	}, [searchParams])

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

	// Paginated articles
	const paginatedArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		const endIndex = startIndex + pageSize
		return filteredArticles.slice(startIndex, endIndex)
	}, [filteredArticles, currentPage, pageSize])

	const totalPages = Math.ceil(filteredArticles.length / pageSize)

	// Handle page change
	const handlePageChange = useCallback(
		(page: number) => {
			const params = new URLSearchParams(searchParams?.toString() ?? '')
			if (page === 1) {
				params.delete('page')
			} else {
				params.set('page', page.toString())
			}
			const newUrl = params.toString().length > 0 ? `${pathname}?${params.toString()}` : (pathname ?? '')
			router.push(newUrl, { scroll: false })
		},
		[searchParams, pathname, router]
	)

	// Reset to first page when search changes
	useEffect(() => {
		if (currentPage > 1 && searchQuery) {
			handlePageChange(1)
		}
	}, [searchQuery, currentPage, handlePageChange])

	return (
		<section className="relative w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative space-y-8 py-12 md:py-16 lg:py-20">
					<BlogSearch locale={locale} onChange={setSearchQuery} value={searchQuery} />
					{paginatedArticles.length > 0 ? (
						<>
							<div className="mx-auto max-w-360">
								<MasonryGrid
									initialColumns={getInitialColumns()}
									items={paginatedArticles}
									locale={locale}
									renderItem={article => <ArticleCard article={article} locale={locale} />}
								/>
							</div>
							{totalPages > 1 && (
								<PaginationClient currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
							)}
						</>
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

interface PaginationClientProps {
	currentPage: number
	onPageChange: (page: number) => void
	totalPages: number
}

function PaginationClient({ totalPages, onPageChange, currentPage }: PaginationClientProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<nav className="mx-auto mt-10 flex w-full max-w-7xl items-center justify-between border-t border-t-white/15 p-4 pt-0 md:mt-0 md:max-w-[calc(100vw-160px)] md:pb-20">
			<div className="-mt-px flex w-0 flex-1">
				{currentPage > 1 && (
					<button
						type="button"
						className="inline-flex h-full items-center border-t-2 border-transparent pt-6 pr-1 text-sm font-medium text-slate-50 hover:border-slate-300 hover:text-white"
						onClick={() => onPageChange(currentPage - 1)}
					>
						<ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-slate-50" />
						Previous
					</button>
				)}
			</div>

			<div className="hidden md:-mt-px md:flex">
				{pages.map(page => (
					<button
						key={page}
						type="button"
						aria-current={currentPage === page ? 'page' : undefined}
						className={`inline-flex items-center border-t-2 px-4 pt-4 text-lg font-extrabold ${
							currentPage === page
								? 'border-indigo-500 text-indigo-500 underline hover:border-indigo-300 hover:text-indigo-50'
								: 'border-transparent text-slate-200 hover:border-slate-50 hover:text-slate-50'
						}`}
						onClick={() => onPageChange(page)}
					>
						{page}
					</button>
				))}
			</div>

			<div className="-mt-px flex w-0 flex-1 justify-end">
				{currentPage < totalPages && (
					<button
						type="button"
						className="inline-flex h-full items-center border-t-2 border-transparent pt-6 pr-1 text-sm font-medium text-slate-50 hover:border-slate-300 hover:text-white"
						onClick={() => onPageChange(currentPage + 1)}
					>
						Next
						<ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-slate-400" />
					</button>
				)}
			</div>
		</nav>
	)
}
