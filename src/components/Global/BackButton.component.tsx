'use client'
import { BackwardIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import type React from 'react'

export function BackButtonComponent(): React.JSX.Element {
	const router = useRouter()

	return (
		<button
			className="rounded-md border-2 border-white bg-transparent p-3 text-slate-100 hover:text-slate-200"
			onClick={() => router.back()}
			type="button"
		>
			<span className="sr-only">Back</span>
			<BackwardIcon aria-hidden="true" className="h-6 w-6" />
		</button>
	)
}
