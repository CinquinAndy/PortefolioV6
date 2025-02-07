'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function MasonryGrid({ items, renderItem }) {
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Determine the number of columns based on screen width
	const getColumns = () => {
		if (width < 640) return 1
		if (width < 1024) return 2
		if (width < 1536) return 3
		return 4
	}

	const columns = getColumns()
	const columnWidth = `${100 / columns}%`

	// Distribute items evenly across columns
	const itemsByColumn = Array.from({ length: columns }, (_, i) =>
		items.filter((_, index) => index % columns === i)
	)

	return (
		<div className="flex w-full gap-6">
			{itemsByColumn.map((columnItems, columnIndex) => (
				<div
					key={columnIndex}
					style={{ width: columnWidth }}
					className="flex flex-col gap-6"
				>
					<AnimatePresence>
						{columnItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{
									delay: index * 0.1,
									type: 'spring',
									stiffness: 100,
								}}
								className="transform transition-all duration-300 hover:scale-[1.02]"
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
