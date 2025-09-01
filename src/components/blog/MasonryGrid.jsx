'use client'

import { useLayoutEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

const BREAKPOINTS = {
	xl: 1536,
	sm: 640,
	lg: 1024,
}

// Date formatting utilities
const formatDate = (dateString, locale) => {
	try {
		const date = new Date(dateString)

		// Return different formats based on locale
		if (locale === 'fr') {
			return new Intl.DateTimeFormat('fr-FR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}).format(date)
		}

		// Default to English
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(date)
	} catch (error) {
		console.error('Error formatting date:', error)
		return dateString // Return original string if parsing fails
	}
}

export function MasonryGrid({ renderItem, locale = 'en', items, initialColumns = 3 }) {
	const [columns, setColumns] = useState(initialColumns)
	const [isClient, setIsClient] = useState(false)

	useLayoutEffect(() => {
		setIsClient(true)
		const updateColumns = () => {
			const width = window.innerWidth
			if (width < BREAKPOINTS.sm) setColumns(1)
			else if (width < BREAKPOINTS.lg) setColumns(2)
			else if (width < BREAKPOINTS.xl) setColumns(3)
			else setColumns(4)
		}

		updateColumns()
		window.addEventListener('resize', updateColumns)
		return () => window.removeEventListener('resize', updateColumns)
	}, [])

	// Distribute items across columns efficiently
	const getItemsByColumn = () => {
		return Array.from({ length: columns }, (_, colIndex) =>
			items.filter((_, itemIndex) => itemIndex % columns === colIndex)
		)
	}

	const columnWidth = `${100 / columns}%`
	const itemsByColumn = getItemsByColumn()

	// Wrap renderItem to inject formatted date
	const renderItemWithFormattedDate = (item, index) => {
		if (item.attributes?.createdAt) {
			const formattedItem = {
				...item,
				attributes: {
					...item.attributes,
					createdAt: formatDate(item.attributes.createdAt, locale),
				},
			}
			return renderItem(formattedItem, index)
		}
		return renderItem(item, index)
	}

	return (
		<div className="flex w-full gap-6">
			{itemsByColumn.map((columnItems, columnIndex) => (
				<div className="flex flex-col gap-6" key={columnIndex} style={{ width: columnWidth }}>
					<AnimatePresence mode="popLayout">
						{columnItems.map((item, index) => (
							<motion.div
								animate={{ y: 0, opacity: 1 }}
								className="transform will-change-transform"
								exit={{ y: -20, opacity: 0 }}
								initial={isClient ? { y: 20, opacity: 0 } : false}
								key={item.id}
								layout
								transition={{
									duration: 0.3,
									delay: index * 0.05,
								}}
							>
								{renderItemWithFormattedDate(item, index)}
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			))}
		</div>
	)
}
