'use client'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

export function NavigationArticle() {
	const router = useRouter() // useRouter hook to get the router object
	const pathname = usePathname() // usePathname hook to get the current path
	const pathSegments = pathname.split('/').filter(Boolean) // Split the path into segments and remove any empty strings

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
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="flex items-center lg:space-x-4">
						<li>
							<div>
								<Link
									href="/public"
									className="custom-button-icons text-gray-50 "
								>
									<HomeIcon
										className="h-5 w-5 flex-shrink-0"
										aria-hidden="true"
									/>
									<span className="sr-only">Home</span>
								</Link>
							</div>
						</li>
						{breadcrumbLinks.map((link, index) => (
							<li key={index}>
								<div className="flex items-center">
									<ChevronRightIcon
										className="h-5 w-5 flex-shrink-0 text-gray-50"
										aria-hidden="true"
									/>
									<Link
										href={link.href}
										className="ml-4 text-sm font-bold text-gray-50 hover:underline lg:text-lg"
										aria-current={link.current ? 'page' : undefined}
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
