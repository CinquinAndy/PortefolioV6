'use client'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import type { Realisation } from '@/types/strapi'
import { t } from '@/utils/translations'

interface BreadcrumbNavProps {
	realisations: Realisation[]
	currentSlug: string
	locale: string
}

export function BreadcrumbNav({ realisations, currentSlug, locale }: BreadcrumbNavProps): React.JSX.Element {
	const pathname = usePathname()
	const pathSegments = (pathname ?? '').split('/').filter(Boolean)

	// Find current realisation
	const currentRealisation = realisations.find(r => r.attributes.slug === currentSlug)

	// Build breadcrumb links (exclude the last segment which is the current page slug)
	const breadcrumbSegments = pathSegments.slice(0, -1)
	const breadcrumbLinks = breadcrumbSegments.map((segment, index) => {
		const href = `/${pathSegments.slice(0, index + 1).join('/')}`
		return {
			name: segment.charAt(0).toUpperCase() + segment.slice(1),
			href,
			current: false,
		}
	})

	// Add current page to breadcrumb
	const currentTitle = currentRealisation?.attributes?.title || currentSlug
	breadcrumbLinks.push({
		name: currentTitle,
		href: pathname ?? '',
		current: true,
	})

	return (
		<nav aria-label="Breadcrumb" className="flex">
			<ol className="flex flex-wrap items-center space-x-2 lg:space-x-4">
				<li>
					<div>
						<Link className="custom-button-icons text-gray-50" href={`/${locale}`}>
							<HomeIcon aria-hidden="true" className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
							<span className="sr-only">{t('home', locale)}</span>
						</Link>
					</div>
				</li>
				{breadcrumbLinks.map(link => (
					<li key={link.href}>
						<div className="flex items-center">
							<ChevronRightIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-50 lg:h-5 lg:w-5" />
							<Link
								aria-current={link.current ? 'page' : undefined}
								className={`ml-2 text-xs font-bold lg:ml-4 lg:text-sm ${
									link.current ? 'text-white underline' : 'text-gray-50 hover:underline'
								}`}
								href={link.href}
							>
								{link.name}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	)
}
