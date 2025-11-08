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
	const linkRef = React.useRef<HTMLAnchorElement>(null)
	const divRef = React.useRef<HTMLDivElement>(null)
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

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
		const currentRef = href ? linkRef.current : divRef.current
		if (!currentRef || !isHovered) return
		const { left, top, width, height } = currentRef.getBoundingClientRect()
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

	// Shared animation style for 3D effect (must be separate for framer-motion)
	const innerMotionStyle = {
		rotateX,
		rotateY,
		transformStyle: 'preserve-3d' as const,
	}

	const containerStyle = {
		perspective: '1000px',
		transformStyle: 'preserve-3d' as const,
	}

	// If 3D is disabled, return simple wrapper with hover effect
	if (disable3D) {
		if (href) {
			return (
				<MotionLink
					href={href}
					className="relative block h-full w-full"
					style={{ pointerEvents: 'auto', cursor: 'pointer' }}
					whileHover={{
						y: -8,
						transition: { duration: 0.3, ease: 'easeOut' },
					}}
					whileTap={{ scale: 0.98 }}
				>
					{children}
				</MotionLink>
			)
		}

		return (
			<motion.div
				className="relative block h-full w-full"
				style={{ pointerEvents: 'auto' }}
				whileHover={{
					y: -8,
					transition: { duration: 0.3, ease: 'easeOut' },
				}}
				whileTap={{ scale: 0.98 }}
			>
				{children}
			</motion.div>
		)
	}

	// 3D animation enabled - Link parent with perspective, div child with rotation
	if (href) {
		return (
			<MotionLink
				href={href}
				ref={linkRef}
				style={containerStyle}
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				whileTap={{ scale: 0.95 }}
				className="group relative block h-full w-full"
			>
				<motion.div style={innerMotionStyle} className="h-full w-full">
					{children}
				</motion.div>
			</MotionLink>
		)
	}

	return (
		<motion.div
			ref={divRef}
			style={containerStyle}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			whileTap={{ scale: 0.95 }}
			className="group relative block h-full w-full"
		>
			<motion.div style={innerMotionStyle} className="h-full w-full">
				{children}
			</motion.div>
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
	staggerDelay = 0.08,
	disable3DAnimation = false,
	getItemHref,
}: ExtendedMasonryGridProps<T>) => {
	const containerRef = React.useRef(null)
	const isInView = useInView(containerRef, { once: true, amount: 0, margin: '0px 0px 300px 0px' })

	const containerVariants = {
		hidden: {},
		visible: {},
	}

	const getItemVariants = (index: number) => ({
		hidden: { opacity: 0, y: 50, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut' as const,
				delay: index * staggerDelay,
			},
		},
	})

	return (
		<motion.div
			ref={containerRef}
			className={cn('w-full grid', className)}
			style={{ gap }}
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
						variants={getItemVariants(index)}
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
