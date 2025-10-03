import type React from 'react'

export function PageSection({
	title,
	children,
	...props
}: Omit<React.ComponentProps<'section'>, 'title'> & {
	title: React.ReactNode
}) {
	return (
		<section
			{...props}
			className="grid grid-cols-4 border-t border-slate-50/10 backdrop-blur-sm"
		>
			<div className="col-span-full sm:col-span-1">
				<div className="-mt-px inline-flex border-t border-cyan-400 pt-px">
					<div className="pt-4 text-sm/7 font-semibold text-slate-50 sm:pt-10">{title}</div>
				</div>
			</div>
			<div className="col-span-full pt-6 sm:col-span-3 sm:pt-10">{children}</div>
		</section>
	)
}
