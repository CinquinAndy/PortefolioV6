import { ArrowLeft } from 'lucide-react'
import { clsx } from 'clsx'
import Link, { type LinkProps } from 'next/link'
import type React from 'react'

export function Breadcrumbs(props: React.ComponentProps<'nav'>) {
	return <nav aria-label="Breadcrumb" className="flex items-center gap-x-3 text-sm/6" {...props} />
}

export function BreadcrumbBackButton({ locale }: { locale: string }) {
	return (
		<Link
			href={`/${locale}/course`}
			className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-950/10 px-3 py-1.5 text-slate-50 hover:bg-indigo-950/20 hover:border-indigo-400/40 hover:text-indigo-400 transition-all font-sans"
		>
			<ArrowLeft className="h-4 w-4" />
			<span>Cours</span>
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
			<Link href={href} className={clsx(className, 'min-w-0 truncate text-slate-50 hover:text-indigo-400 font-sans')}>
				{children}
			</Link>
		)
	}

	return (
		<span className={clsx(className, 'min-w-0 truncate text-slate-50 last:text-slate-300 font-sans')}>{children}</span>
	)
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
	return <span className={clsx(className, 'text-slate-50/25')}>/</span>
}
