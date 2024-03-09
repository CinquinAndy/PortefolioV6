'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/16/solid'

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
		<div className={'mx-auto max-w-7xl p-4'}>
			<div className={'flex items-center justify-between'}>
				<button
					onClick={() => router.back()} // Use Next.js router to go back
					className={
						'flex cursor-pointer items-center justify-center rounded-xl border border-white bg-white/5 p-2 backdrop-blur-sm'
					}
				>
					<ChevronLeftIcon className="h-8 w-8 text-white" />
				</button>
				<nav className="flex" aria-label="Breadcrumb">
					<ol role="list" className="flex items-center space-x-4">
						<li>
							<div>
								<a href="/" className="text-gray-400 hover:text-gray-500">
									{' '}
									{/* Adjust the home link */}
									<HomeIcon
										className="h-5 w-5 flex-shrink-0"
										aria-hidden="true"
									/>
									<span className="sr-only">Home</span>
								</a>
							</div>
						</li>
						{breadcrumbLinks.map((link, index) => (
							<li key={index}>
								<div className="flex items-center">
									<ChevronRightIcon
										className="h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<a
										href={link.href}
										className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
										aria-current={link.current ? 'page' : undefined}
									>
										{link.name}
									</a>
								</div>
							</li>
						))}
					</ol>
				</nav>
			</div>
		</div>
	)
}
