'use client'
import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from '@heroicons/react/20/solid'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Pagination({ currentPage, totalPages }) {
	const pathname = usePathname()
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<nav className="mx-auto mt-10 flex w-full max-w-7xl items-center justify-between border-t border-t-white/15 p-4 pt-0 md:mt-0 md:max-w-[calc(100vw-160px)] md:pb-20">
			<div className="-mt-px flex w-0 flex-1">
				{currentPage > 1 && (
					<Link
						className="inline-flex h-full items-center border-t-2 border-transparent pr-1 pt-6 text-sm font-medium text-slate-50 hover:border-slate-300 hover:text-white"
						href={`${pathname}?page=${currentPage - 1}`}
					>
						<ArrowLongLeftIcon
							aria-hidden="true"
							className="mr-3 h-5 w-5 text-slate-50"
						/>
						Previous
					</Link>
				)}
			</div>

			<div className="hidden md:-mt-px md:flex">
				{pages.map(page => (
					<Link
						aria-current={currentPage === page ? 'page' : undefined}
						className={`inline-flex items-center border-t-2 px-4 pt-4 text-lg font-extrabold ${
							currentPage === page
								? 'border-indigo-500 text-indigo-500 underline hover:border-indigo-300 hover:text-indigo-50'
								: 'border-transparent text-slate-200 hover:border-slate-50 hover:text-slate-50'
						}`}
						href={`${pathname}?page=${page}`}
						key={page}
					>
						{page}
					</Link>
				))}
			</div>

			<div className="-mt-px flex w-0 flex-1 justify-end">
				{currentPage < totalPages && (
					<Link
						className="inline-flex h-full items-center border-t-2 border-transparent pr-1 pt-6 text-sm font-medium text-slate-50 hover:border-slate-300 hover:text-white"
						href={`${pathname}?page=${currentPage + 1}`}
					>
						Next
						<ArrowLongRightIcon
							aria-hidden="true"
							className="ml-3 h-5 w-5 text-slate-400"
						/>
					</Link>
				)}
			</div>
		</nav>
	)
}
