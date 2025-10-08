import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function NextPageLink({ title, description, href }: { title: string; description: string; href: string }) {
	return (
		<div className="flow-root font-sans">
			<Link
				href={href}
				className="-mx-3 -my-2 block rounded-xl px-6 py-5 border-2 border-indigo-400/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 shadow-lg shadow-indigo-500/10"
			>
				<p className="flex items-center gap-3 text-sm/7 text-indigo-200 font-bold uppercase tracking-wide">
					Up next
					<ChevronRight className="h-4 w-4 stroke-current" />
				</p>
				<p className="mt-3 text-xl/8 font-bold text-white">{title}</p>
				<p className="mt-2 text-base/6 text-slate-100">{description}</p>
			</Link>
		</div>
	)
}
