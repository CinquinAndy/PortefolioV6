'use client'

import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function useTableOfContents(contentId: string) {
	const [headings, setHeadings] = useState<
		{ id: string; text: string; level: number; active: boolean }[]
	>([])
	const pathname = usePathname()

	useEffect(() => {
		const root = document.getElementById(contentId)
		if (!root) return

		setHeadings(
			Array.from(root.querySelectorAll('h2, h3'))
				.filter((heading) => heading.id) // Only keep headings with IDs
				.map((heading, index) => ({
					id: heading.id || `heading-${index}`,
					text: heading.textContent || '',
					level: Number.parseInt(heading.tagName[1]),
					active: false,
				}))
		)

		const contentElements = new Map<Element, string>()
		let currentHeadingId: string | null = null

		for (const element of Array.from(root.children)) {
			if (element.id && (element.tagName === 'H2' || element.tagName === 'H3')) {
				currentHeadingId = element.id
			}
			if (!currentHeadingId) continue
			contentElements.set(element, currentHeadingId)
		}

		const visibleElements = new Set<Element>()

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleElements.add(entry.target)
					} else {
						visibleElements.delete(entry.target)
					}
				}

				const firstVisibleContentElement = Array.from(contentElements.entries()).find(([element]) =>
					visibleElements.has(element)
				)

				setHeadings((current) =>
					current.map((heading) => ({
						...heading,
						active: heading.id === firstVisibleContentElement?.[1],
					}))
				)
			},
			{
				rootMargin: '-80px 0px 0px 0px',
			}
		)

		for (const element of contentElements.keys()) {
			observer.observe(element)
		}

		return () => observer.disconnect()
	}, [pathname, contentId])

	return headings
}

export default function TableOfContents({ contentId }: { contentId: string }) {
	const headings = useTableOfContents(contentId)

	if (headings.length === 0) {
		return null
	}

	return (
		<nav className="sticky top-16">
			<h2 className="text-sm/6 font-semibold text-gray-950 dark:text-white">On this page</h2>
			<ul className="mt-3 flex flex-col gap-3 border-l border-gray-950/10 text-sm/6 text-gray-700 dark:border-white/10 dark:text-gray-400">
				{headings.map((heading, index) => (
					<li
						key={`${heading.id}-${index}`}
						className={clsx(
							'-ml-px border-l border-transparent pl-4',
							'hover:text-gray-950 hover:not-has-aria-[current=location]:border-gray-400 dark:hover:text-white',
							'has-aria-[current=location]:border-gray-950 dark:has-aria-[current=location]:border-white'
						)}
					>
						<a
							href={`#${heading.id}`}
							aria-current={heading.active ? 'location' : undefined}
							className={clsx(
								heading.level === 3 && 'pl-4',
								'block aria-[current=location]:font-medium aria-[current=location]:text-gray-950 dark:aria-[current=location]:text-white'
							)}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
