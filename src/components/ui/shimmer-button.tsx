import React from 'react'

import { motion, HTMLMotionProps } from 'framer-motion'

import { cn } from '@/lib/utils'

export interface ShimmerButtonProps extends HTMLMotionProps<'button'> {
	shimmerColor?: string
	className?: string
	children?: React.ReactNode
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
	({ shimmerColor = '#0ea5e9', className, children, ...props }, ref) => {
		return (
			<motion.button
				className={cn(
					'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden',
					'rounded-full bg-black px-6 py-3 whitespace-nowrap text-white',
					'shadow-2xl',
					className
				)}
				ref={ref}
				whileTap={{ scale: 0.98 }}
				transition={{ type: 'spring', stiffness: 400, damping: 17 }}
				{...props}
			>
				{/* Pulsing inner glow */}
				<motion.div
					className="absolute inset-[0px] z-30 rounded-full"
					style={{
						background: `radial-gradient(circle, ${shimmerColor}10 0%, transparent 70%)`,
					}}
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						repeat: Infinity,
						ease: 'easeInOut',
						duration: 2,
					}}
				/>

				{/* Highlight overlay */}
				<motion.div
					className="absolute inset-[0px] z-30 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
					animate={{
						x: ['-100%', '100%'],
					}}
					transition={{
						repeatDelay: 2,
						repeat: Infinity,
						ease: 'easeInOut',
						duration: 1.5,
					}}
				/>

				{/* Inner highlight */}
				<div className="absolute inset-[0px] z-30 rounded-full shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]" />

				<motion.div
					className="absolute inset-[2px] z-0 scale-110"
					style={{
						borderRadius: 'inherit',
						background: `conic-gradient(from 0deg, transparent 0deg, ${shimmerColor} 30deg, ${shimmerColor} 60deg, transparent 90deg, transparent 360deg)`,
					}}
					animate={{
						rotate: 360,
					}}
					transition={{
						repeat: Infinity,
						ease: 'linear',
						duration: 6,
					}}
				/>

				{/* Mask to hide inner part and show only border */}
				<div
					className="absolute inset-0 z-10"
					style={{
						inset: '2px',
						borderRadius: 'inherit',
						background: '#000000',
					}}
				/>

				{/* Content */}
				<span className="relative z-10">{children}</span>
			</motion.button>
		)
	}
)

ShimmerButton.displayName = 'ShimmerButton'

export { ShimmerButton }
