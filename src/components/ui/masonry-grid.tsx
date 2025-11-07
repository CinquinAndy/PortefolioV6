'use client'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
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
	disable3DAnimation?: boolean
}

interface GridItemProps {
	children: React.ReactNode
	disable3D?: boolean
	href?: string
}

// Create animated Link component
const MotionLink = motion(Link)

// A self-contained GridItem component to handle advanced animations
const GridItem = ({ children, disable3D = false, href }: GridItemProps) => {
	const ref = React.useRef<HTMLDivElement>(null)
	const [isHovered, setIsHovered] = React.useState(false)

	// Motion values to track mouse position (always initialize hooks)
	const x = useMotionValue(0)
	const y = useMotionValue(0)

	// Spring animations for smoother transform changes
	const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
	const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

	// Transform mouse position into 3D rotation
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current || !isHovered) return
		const { left, top, width, height } = ref.current.getBoundingClientRect()
		const mouseX = e.clientX - left
		const mouseY = e.clientY - top
		// Normalize mouse position to a range of -0.5 to 0.5
		x.set(mouseX / width - 0.5)
		y.set(mouseY / height - 0.5)
	}

	const handleMouseEnter = () => {
		setIsHovered(true)
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		x.set(0)
		y.set(0)
	}

	// If 3D is disabled, return simple wrapper with hover effect
	if (disable3D) {
		const Component = href ? MotionLink : motion.div
		const componentProps = href ? { href } : {}

		return (
			<Component
				{...componentProps}
				className="relative block h-full w-full"
				whileHover={{
					y: -8,
					transition: { duration: 0.3, ease: 'easeOut' },
				}}
				whileTap={{ scale: 0.98 }}
			>
				{children}
			</Component>
		)
	}

	// 3D animation enabled
	const InnerComponent = href ? MotionLink : motion.div
	const innerProps = href ? { href } : {}

	return (
		<motion.div
			ref={ref}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transformStyle: 'preserve-3d',
				perspective: '1000px',
			}}
			className="group relative"
		>
			<InnerComponent
				{...innerProps}
				style={{
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
				}}
				whileTap={{ scale: 0.95 }}
				className="block h-full w-full"
			>
				{children}
			</InnerComponent>
		</motion.div>
	)
}

interface ExtendedMasonryGridProps<T> extends MasonryGridProps<T> {
	getItemHref?: (item: T, index: number) => string | undefined
}

const MasonryGrid = <T,>({
	items,
	renderItem,
	className,
	gap = '1rem',
	staggerDelay = 0.05,
	disable3DAnimation = false,
	getItemHref,
}: ExtendedMasonryGridProps<T>) => {
	const containerRef = React.useRef(null)
	const isInView = useInView(containerRef, { once: true, amount: 0.05, margin: '0px 0px -100px 0px' })

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
			animate={isInView ? 'visible' : 'hidden'}
			variants={containerVariants}
			role="list"
		>
			{items.map((item, index) => {
				const href = getItemHref?.(item, index)
				return (
					<motion.div
						// biome-ignore lint/suspicious/noArrayIndexKey: Items are dynamically rendered based on external data; no stable unique identifier available
						key={index}
						className="mb-4 break-inside-avoid"
						variants={itemVariants}
						role="listitem"
					>
						<GridItem disable3D={disable3DAnimation} href={href}>
							{renderItem(item, index)}
						</GridItem>
					</motion.div>
				)
			})}
		</motion.div>
	)
}

export default MasonryGrid
