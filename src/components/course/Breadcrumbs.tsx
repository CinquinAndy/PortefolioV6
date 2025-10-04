import { clsx } from 'clsx'
import Link, { type LinkProps } from 'next/link'
import type React from 'react'

export function Breadcrumbs(props: React.ComponentProps<'nav'>) {
	return <nav aria-label="Breadcrumb" className="flex items-center gap-x-2 text-sm/6" {...props} />
}

export function BreadcrumbHome({ locale }: { locale: string }) {
	return (
		<Link href={`/${locale}/course`} className="min-w-0 shrink-0 text-slate-50 hover:text-cyan-300">
			Cours
		</Link>
	)
}

export function Breadcrumb({
	href,
	children,
	className,
}: {
	href?: LinkProps['href']
	children: React.ReactNode
	className?: string
}) {
	if (href) {
		return (
			<Link href={href} className={clsx(className, 'min-w-0 truncate text-slate-50 hover:text-cyan-300')}>
				{children}
			</Link>
		)
	}

	return <span className={clsx(className, 'min-w-0 truncate text-slate-50 last:text-slate-400')}>{children}</span>
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
	return <span className={clsx(className, 'text-slate-50/25')}>/</span>
}
