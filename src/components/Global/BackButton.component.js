'use client'
import { BackwardIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

export function BackButtonComponent() {
	const router = useRouter()

	return (
		<button
			type="button"
			className="rounded-md border-2 border-white bg-transparent p-3 text-slate-100 hover:text-slate-200"
			onClick={() => router.back()}
		>
			<span className="sr-only">Back</span>
			<BackwardIcon className="h-6 w-6" aria-hidden="true" />
		</button>
	)
}
