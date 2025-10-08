import { AnimatePresence, motion } from 'framer-motion'

import { type ReactNode, useLayoutEffect, useState } from 'react'
import type { Locale } from '@/types/strapi'

const BREAKPOINTS = {
	xl: 1536,
	sm: 640,
	lg: 1024,
} as const

interface MasonryGridProps<T> {
	renderItem: (item: T, index: number) => ReactNode
	locale?: Locale
	items: T[]
	initialColumns?: number
}

export function MasonryGrid<T>({ renderItem, locale = 'en', items, initialColumns = 3 }: MasonryGridProps<T>) {
	const [columns, setColumns] = useState<number>(initialColumns)
	const [isClient, setIsClient] = useState<boolean>(false)

	useLayoutEffect(() => {
		const updateColumns = (): void => {
			const width = window.innerWidth
			if (width < BREAKPOINTS.sm) setColumns(1)
			else if (width < BREAKPOINTS.lg) setColumns(2)
			else if (width < BREAKPOINTS.xl) setColumns(3)
			else setColumns(4)
		}

		updateColumns()
		setIsClient(true)
		window.addEventListener('resize', updateColumns)
		return () => window.removeEventListener('resize', updateColumns)
	}, [])

	// Distribute items across columns efficiently
	const getItemsByColumn = (): T[][] => {
		return Array.from({ length: columns }, (_, colIndex) =>
			items.filter((_, itemIndex) => itemIndex % columns === colIndex)
		)
	}

	const columnWidth = `${100 / columns}%`
	const itemsByColumn = getItemsByColumn()

	// Don't render until client-side to avoid hydration mismatch
	if (!isClient) {
		return null
	}

	return (
		<div className="flex w-full gap-6">
			{itemsByColumn.map((columnItems, columnIndex) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: Columns are stable structural elements that never reorder
				<div className="flex flex-col gap-6" key={`col-${columnIndex}`} style={{ width: columnWidth }}>
					<AnimatePresence mode="popLayout">
						{columnItems.map((item, index) => (
							<motion.div
								animate={{ y: 0, opacity: 1 }}
								className="transform will-change-transform"
								exit={{ y: -20, opacity: 0 }}
								initial={{ y: 20, opacity: 0 }}
								key={typeof item === 'object' && item !== null && 'id' in item ? (item.id as number | string) : index}
								layout
								transition={{
									duration: 0.3,
									delay: index * 0.05,
								}}
							>
								{renderItem(item, index)}
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			))}
		</div>
	)
}
