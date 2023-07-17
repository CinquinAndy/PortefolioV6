import React from 'react'

export function BadgeIndispo() {
	return (
		<div className={'w-[130px]'}>
			<span className="inline-flex items-center rounded-full bg-red-100 px-5 py-2  text-sm font-medium text-red-800">
				<svg
					className="-ml-1 mr-1.5 h-3 w-3 text-red-600"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<circle cx={8} cy={8} r={6} />
				</svg>
				Indisponible
			</span>
		</div>
	)
}
