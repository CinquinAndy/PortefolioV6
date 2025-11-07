'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import type React from 'react'
import type { Realisation } from '@/types/strapi'

interface PrevNextNavProps {
	realisations: Realisation[]
	currentSlug: string
	locale: string
}

export function PrevNextNav({ realisations, currentSlug, locale }: PrevNextNavProps): React.JSX.Element {
	// Find current index and get previous/next items
	const currentIndex = realisations.findIndex(r => r.attributes.slug === currentSlug)
	const previousRealisation = currentIndex > 0 ? realisations[currentIndex - 1] : null
	const nextRealisation = currentIndex < realisations.length - 1 ? realisations[currentIndex + 1] : null

	// Calculate position counter (1-based for user display)
	const currentPosition = currentIndex + 1
	const totalCount = realisations.length

	return (
		<div className="flex items-center justify-end gap-3">
			{/* Counter */}
			<span className="text-xs font-mono text-gray-400 lg:text-sm">
				{String(currentPosition).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
			</span>

			{/* Previous button - only show if there is a previous item */}
			{previousRealisation && (
				<Link
					className="custom-button-icons group flex items-center gap-1 rounded border border-indigo-600 bg-transparent px-3 py-1.5 text-xs transition-colors hover:bg-indigo-600/10 lg:px-4 lg:py-2 lg:text-sm"
					href={`/${locale}/portefolio/${previousRealisation.attributes.slug}`}
					title={previousRealisation.attributes.title}
				>
					<ChevronLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
					<span className="hidden sm:inline">Previous</span>
				</Link>
			)}

			{/* Next button - only show if there is a next item */}
			{nextRealisation && (
				<Link
					className="custom-button-icons group flex items-center gap-1 rounded border border-indigo-600 bg-transparent px-3 py-1.5 text-xs transition-colors hover:bg-indigo-600/10 lg:px-4 lg:py-2 lg:text-sm"
					href={`/${locale}/portefolio/${nextRealisation.attributes.slug}`}
					title={nextRealisation.attributes.title}
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
				</Link>
			)}
		</div>
	)
}
