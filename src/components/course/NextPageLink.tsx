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
				className="-mx-3 -my-2 block rounded-xl bg-slate-50/5 px-3 py-2 backdrop-blur-sm transition-all hover:bg-slate-50/10"
			>
				<p className="flex items-center gap-3 text-sm/7 text-slate-400">
					Suivant
					<ChevronRight className="h-4 w-4 stroke-current" />
				</p>
				<p className="mt-3 text-base/7 font-medium text-slate-50">{title}</p>
				<p className="text-sm/7 text-slate-300">{description}</p>
			</Link>
		</div>
	)
}
