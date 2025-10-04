import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function NextPageLink({
	title,
	description,
	href,
}: {
	title: string
	description: string
	href: string
}) {
	return (
		<div className="flow-root">
			<Link
				href={href}
				className="-mx-3 -my-2 block rounded-xl px-3 py-2 hover:bg-gray-950/4 dark:hover:bg-white/5"
			>
				<p className="flex items-center gap-3 text-sm/7 text-gray-500">
					Up next
					<ChevronRight className="h-4 w-4 stroke-current" />
				</p>
				<p className="mt-3 text-base/7 font-medium text-gray-950 dark:text-white">{title}</p>
				<p className="text-sm/7 text-gray-700 dark:text-gray-400">{description}</p>
			</Link>
		</div>
	)
}
