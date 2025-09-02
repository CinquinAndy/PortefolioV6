import React, { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	shimmerColor?: string
	shimmerSize?: string
	borderRadius?: string
	shimmerDuration?: string
	background?: string
	className?: string
	children?: React.ReactNode
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
	(
		{
			shimmerSize = '0.05em',
			shimmerDuration = '3s',
			shimmerColor = '#ffffff',
			className,
			children,
			borderRadius = '100px',
			background = 'rgba(0, 0, 0, 1)',
			...props
		},
		ref
	) => {
		return (
			<button
				style={
					{
						'--spread': '90deg',
						'--speed': shimmerDuration,
						'--shimmer-color': shimmerColor,
						'--radius': borderRadius,
						'--cut': shimmerSize,
						'--bg': background,
					} as CSSProperties
				}
				className={cn(
					'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)] dark:text-black',
					'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
					className
				)}
				ref={ref}
				{...props}
			>
				{/* Shimmer effect */}
				<div
					className="animate-shimmer-around absolute inset-0 opacity-80"
					style={{
						WebkitMaskImage: 'radial-gradient(circle, transparent 65%, black 70%)',
						maskImage: 'radial-gradient(circle, transparent 65%, black 70%)',
						filter: 'blur(0.5px)',
						borderRadius: borderRadius,
						background: `conic-gradient(from 0deg, transparent 0deg, ${shimmerColor} 60deg, transparent 120deg, transparent 180deg, ${shimmerColor} 240deg, transparent 300deg, transparent 360deg)`,
					}}
				/>
				{children}

				{/* Highlight */}
				<div
					className={cn(
						'insert-0 absolute size-full',

						'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',

						// transition
						'transform-gpu transition-all duration-300 ease-in-out',

						// on hover
						'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',

						// on click
						'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]'
					)}
				/>

				{/* backdrop */}
				<div className={cn('absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]')} />
			</button>
		)
	}
)

ShimmerButton.displayName = 'ShimmerButton'

export { ShimmerButton }
