import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function NextPageLink({ title, description, href }: { title: string; description: string; href: string }) {
	return (
		<div className="flow-root font-sans">
			<Link href={href} className="-mx-3 -my-2 block rounded-xl px-4 py-4 border-2 border-indigo-500/20 bg-indigo-950/10 hover:bg-indigo-950/20 hover:border-indigo-400/40 transition-all duration-300 shadow-lg shadow-indigo-500/5">
				<p className="flex items-center gap-3 text-sm/7 text-indigo-400 font-semibold uppercase tracking-wide">
					Up next
					<ChevronRight className="h-4 w-4 stroke-current" />
				</p>
				<p className="mt-3 text-lg/8 font-semibold text-slate-50">{title}</p>
				<p className="mt-1 text-sm/6 text-slate-300">{description}</p>
			</Link>
		</div>
	)
}
