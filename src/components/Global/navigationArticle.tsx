'use client'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { HomeIcon } from '@heroicons/react/16/solid'
import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavigationArticle(): React.JSX.Element {
	const pathname = usePathname() // usePathname hook to get the current path
	const pathSegments = (pathname ?? '').split('/').filter(Boolean) // Split the path into segments and remove any empty strings

	const breadcrumbLinks = pathSegments.map((segment, index) => {
		const href = `/${pathSegments.slice(0, index + 1).join('/')}` // Create the href for the link
		return {
			name: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the first letter of the segment
			href,
			current: index === pathSegments.length - 1, // Determine if this is the current page
		}
	})

	return (
		<div className={'mx-auto max-w-5xl lg:p-4'}>
			<div className={'flex items-center justify-start gap-8'}>
				<nav aria-label="Breadcrumb" className="flex">
					<ol className="flex items-center lg:space-x-4">
						<li>
							<div>
								<Link className="custom-button-icons text-gray-50" href="/">
									<HomeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
									<span className="sr-only">Home</span>
								</Link>
							</div>
						</li>
						{breadcrumbLinks.map((link, index) => (
							<li key={index}>
								<div className="flex items-center">
									<ChevronRightIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-50" />
									<Link
										aria-current={link.current ? 'page' : undefined}
										className="ml-4 text-sm font-bold text-gray-50 hover:underline lg:text-lg"
										href={link.href}
									>
										{link.name}
									</Link>
								</div>
							</li>
						))}
					</ol>
				</nav>
			</div>
		</div>
	)
}
