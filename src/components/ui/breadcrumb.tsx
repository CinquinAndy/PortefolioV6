'use client'

import Link from 'next/link'
import type { Locale } from '@/types/strapi'

export interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbProps {
	items: BreadcrumbItem[]
	locale: Locale
}

export function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav aria-label="Breadcrumb" className="mb-8">
			<ol className="flex items-center gap-2 text-sm">
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					return (
						<li key={`${item.label}-${index}`} className="flex items-center gap-2">
							{index > 0 && (
								<svg
									className="h-4 w-4 text-slate-400"
									fill="none"
									aria-hidden="true"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M9 5l7 7-7 7" />
								</svg>
							)}
							{!isLast && item.href ? (
								<Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
									{item.label}
								</Link>
							) : (
								<span className={isLast ? 'text-white font-medium' : 'text-slate-400'}>{item.label}</span>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
