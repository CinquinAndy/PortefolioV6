'use client'
import type React from 'react'

export const GaleryItemSkeleton = (): React.JSX.Element => (
	<div className="m-2 animate-pulse rounded-lg object-cover p-1">
		<div className="h-48 w-full bg-gray-300"></div>
	</div>
)
