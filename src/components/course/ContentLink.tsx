import Link from 'next/link'
import { CirclePlayIcon } from './icons/CirclePlayIcon'

function formatDuration(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = seconds % 60

	return `${m}:${s.toString().padStart(2, '0')}`
}

export function ContentLink({
	title,
	description,
	href,
	duration,
	locale,
}: {
	title: string
	description: string
	href: string
	duration?: number | null
	locale: string
}) {
	return (
		<div className="flow-root">
			<Link
				href={`/${locale}/course/${href}`}
				className="-mx-3 -my-2 flex gap-3 rounded-xl bg-slate-50/5 px-3 py-2 text-sm/7 backdrop-blur-sm transition-all hover:bg-slate-50/10"
			>
				<div className="flex h-lh shrink items-center">
					<CirclePlayIcon className="fill-cyan-400 stroke-cyan-400/40" />
				</div>
				<div>
					<div>
						<span className="font-semibold text-slate-50">{title}</span>
						{duration && (
							<>
								<span className="mx-2 hidden text-slate-50/25 sm:inline">&middot;</span>
								<span className="hidden text-slate-400 sm:inline">{formatDuration(duration)}</span>
							</>
						)}
					</div>
					<p className="text-slate-300">{description}</p>
					{duration && <div className="text-slate-400 sm:hidden">{formatDuration(duration)}</div>}
				</div>
			</Link>
		</div>
	)
}
