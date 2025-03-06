'use client'

import Image from 'next/image'

import { TechnologyIcon } from './TechnologyIcon'

export const formatTechnologyName = name => {
	if (!name) return ''
	// Replace 'dot' with '.' and capitalize first letter
	return (
		name.replace(/dot/i, '.').charAt(0).toUpperCase() +
		name.slice(1).replace(/dot/i, '.')
	)
}

export function TechnologyDisplay({ technology }) {
	if (!technology) return null

	return (
		<div className="flex flex-col items-center">
			{/* Icon container */}
			<div
				className="custom-button-icons-3d relative flex items-center justify-center"
				key={technology?.id}
			>
				<Image
					alt="icon-3d"
					height={80}
					src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/3d.svg`}
					width={80}
				/>
				<TechnologyIcon
					className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 skew-y-30 transform rounded-full p-1"
					image={technology?.icon?.data}
					name={technology?.name}
				/>
			</div>

			{/* Technology label */}
			<span className="mt-2 w-full text-center text-xs font-medium italic text-gray-300">
				({formatTechnologyName(technology?.name)})
			</span>
		</div>
	)
}
