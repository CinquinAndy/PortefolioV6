import React from 'react'

export function BadgeDispo() {
	return (
		<div className={'w-[130px]'}>
			<span className="inline-flex items-center rounded-full bg-indigo-100  px-5 py-2 text-sm font-medium text-indigo-800">
				<svg
					className="-ml-1 mr-1.5 h-3 w-3 text-indigo-600"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<circle cx={8} cy={8} r={6} />
				</svg>
				Disponible
			</span>
		</div>
	)
}
