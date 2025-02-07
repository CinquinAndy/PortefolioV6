'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from '@heroicons/react/20/solid'

export function Pagination({ currentPage, totalPages }) {
	const pathname = usePathname()
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<nav className="mx-auto mt-10 flex w-full max-w-7xl items-center justify-between border-t border-t-white/15 p-4 pt-0 md:mt-0 md:max-w-[calc(100vw-160px)] md:pb-20">
			<div className="-mt-px flex w-0 flex-1">
				{currentPage > 1 && (
					<Link
						href={`${pathname}?page=${currentPage - 1}`}
						className="inline-flex h-full items-center border-t-2 border-transparent pr-1 pt-6 text-sm font-medium text-slate-50 hover:border-slate-300 hover:text-white"
					>
						<ArrowLongLeftIcon
							className="mr-3 h-5 w-5 text-slate-50"
							aria-hidden="true"
						/>
						Previous
					</Link>
				)}
			</div>

			<div className="hidden md:-mt-px md:flex">
				{pages.map(page => (
					<Link
						key={page}
						href={`${pathname}?page=${page}`}
						className={`inline-flex items-center border-t-2 px-4 pt-4 text-lg font-extrabold ${
							currentPage === page
								? 'border-indigo-500 text-indigo-500 underline hover:border-indigo-300 hover:text-indigo-50'
								: 'border-transparent text-slate-200 hover:border-slate-50 hover:text-slate-50'
						}`}
						aria-current={currentPage === page ? 'page' : undefined}
					>
						{page}
					</Link>
				))}
			</div>

			<div className="-mt-px flex w-0 flex-1 justify-end">
				{currentPage < totalPages && (
					<Link
						href={`${pathname}?page=${currentPage + 1}`}
						className="inline-flex h-full items-center border-t-2 border-transparent pr-1 pt-6 text-sm font-medium text-slate-50 hover:border-slate-300 hover:text-white"
					>
						Next
						<ArrowLongRightIcon
							className="ml-3 h-5 w-5 text-slate-400"
							aria-hidden="true"
						/>
					</Link>
				)}
			</div>
		</nav>
	)
}
