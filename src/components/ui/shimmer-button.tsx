import React from 'react'

import { cn } from '@/lib/utils'

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	shimmerColor?: string
	className?: string
	children?: React.ReactNode
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
	({ shimmerColor = '#0ea5e9', className, children, ...props }, ref) => {
		return (
			<button
				className={cn(
					'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden',
					'rounded-full border border-white/10 bg-black px-6 py-3 whitespace-nowrap text-white',
					'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
					'shadow-2xl',
					className
				)}
				ref={ref}
				{...props}
			>
				{/* spark container */}
				<div className="absolute -inset-1 -z-30 overflow-hidden rounded-full">
					{/* spark */}
					<div className="absolute inset-0">
						{/* Border light effect */}
						<div
							className="shimmer-rotate absolute -inset-2 rounded-full opacity-70"
							style={{
								background: `conic-gradient(from 0deg, transparent 0deg, ${shimmerColor} 30deg, transparent 60deg, transparent 180deg, ${shimmerColor} 210deg, transparent 240deg, transparent 360deg)`,
							}}
						/>
					</div>
				</div>
				{children}

				{/* Highlight */}
				<div className="absolute inset-0 size-full transform-gpu rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />

				{/* backdrop */}
				<div className="absolute inset-[0.05em] -z-20 rounded-full bg-black" />
			</button>
		)
	}
)

ShimmerButton.displayName = 'ShimmerButton'

export { ShimmerButton }
