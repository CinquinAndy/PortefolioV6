import React from 'react'

import { ShimmerButton } from './ui/shimmer-button'

function ShimmerButtonDemo() {
	return (
		<div className="z-10 flex min-h-64 items-center justify-center">
			<div className="flex flex-col gap-4">
				<ShimmerButton className="shadow-2xl">
					<span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
						Shimmer Button
					</span>
				</ShimmerButton>

				<ShimmerButton className="shadow-2xl" shimmerColor="#ff6b6b" borderRadius="50px">
					<span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
						Custom Color
					</span>
				</ShimmerButton>

				<ShimmerButton className="shadow-2xl" shimmerColor="#4ecdc4" shimmerDuration="2s">
					<span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
						Fast Shimmer
					</span>
				</ShimmerButton>
			</div>
		</div>
	)
}

export default ShimmerButtonDemo
