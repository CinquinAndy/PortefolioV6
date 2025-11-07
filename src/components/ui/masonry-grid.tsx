'use client'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Props for the MasonryGrid component.
 * @template T - The type of the items in the grid.
 */
interface MasonryGridProps<T> {
	items: T[]
	renderItem: (item: T, index: number) => React.ReactNode
	className?: string
	gap?: string
	staggerDelay?: number
}

// A self-contained GridItem component to handle advanced animations
const GridItem = ({ children }: { children: React.ReactNode }) => {
	const ref = React.useRef<HTMLDivElement>(null)

	// Motion values to track mouse position
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	// Spring animations for smoother transform changes
	const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
	const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

	// Transform mouse position into 3D rotation
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return
		const { left, top, width, height } = ref.current.getBoundingClientRect()
		const mouseX = e.clientX - left
		const mouseY = e.clientY - top
		// Normalize mouse position to a range of -0.5 to 0.5
		x.set(mouseX / width - 0.5)
		y.set(mouseY / height - 0.5)
	}

	const handleMouseLeave = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transformStyle: 'preserve-3d',
				perspective: '1000px',
			}}
			className="relative"
		>
			<motion.div
				style={{
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
				}}
				whileTap={{ scale: 0.95 }}
				className="h-full w-full"
			>
				{children}
			</motion.div>
		</motion.div>
	)
}

const MasonryGrid = <T,>({ items, renderItem, className, gap = '1rem', staggerDelay = 0.05 }: MasonryGridProps<T>) => {
	const containerRef = React.useRef(null)
	const isInView = useInView(containerRef, { once: true, amount: 0.2 })

	// Debug logs
	React.useEffect(() => {
		console.log('=== MasonryGrid Debug ===')
		console.log('Items count:', items.length)
		console.log('Is in view:', isInView)
		console.log('Container ref:', containerRef.current)
		console.log('=== End MasonryGrid Debug ===')
	}, [items, isInView])

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: staggerDelay,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: 'easeOut' as const,
			},
		},
	}

	return (
		<motion.div
			ref={containerRef}
			className={cn('w-full', className)}
			style={{ columnGap: gap }}
			initial="hidden"
			animate="visible" // Force visible pour debug
			variants={containerVariants}
			role="list"
		>
			{items.map((item, index) => (
				<motion.div
					// biome-ignore lint/suspicious/noArrayIndexKey: Items are dynamically rendered based on external data; no stable unique identifier available
					key={index}
					className="mb-4 break-inside-avoid"
					variants={itemVariants}
					role="listitem"
				>
					<GridItem>{renderItem(item, index)}</GridItem>
				</motion.div>
			))}
		</motion.div>
	)
}

export default MasonryGrid
