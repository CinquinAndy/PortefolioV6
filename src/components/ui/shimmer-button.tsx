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
				<div className="absolute inset-0 -z-30 overflow-visible blur-[2px]">
					{/* spark */}
					<div className="shimmer-slide absolute inset-0 aspect-square h-full rounded-none">
						{/* spark before */}
						<div
							className="spin-around absolute -inset-full w-auto translate-x-0 translate-y-0 rotate-0"
							style={{
								background: `conic-gradient(from 225deg, transparent 0, ${shimmerColor} 90deg, transparent 180deg)`,
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
