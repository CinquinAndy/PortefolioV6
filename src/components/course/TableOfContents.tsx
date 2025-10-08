'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function useTableOfContents(contentId: string) {
	const [headings, setHeadings] = useState<{ id: string; text: string; level: number; active: boolean }[]>([])
	const pathname = usePathname()

	useEffect(() => {
		const root = document.getElementById(contentId)
		if (!root) return

		setHeadings(
			Array.from(root.querySelectorAll('h2, h3')).map(heading => ({
				id: heading.id,
				text: heading.textContent || '',
				level: Number.parseInt(heading.tagName[1], 10),
				active: false,
			}))
		)

		const contentElements = new Map<Element, string>()
		let currentHeadingId: string | null = null

		Array.from(root.children).forEach(element => {
			if (element.id && (element.tagName === 'H2' || element.tagName === 'H3')) {
				currentHeadingId = element.id
			}
			if (!currentHeadingId) return
			contentElements.set(element, currentHeadingId)
		})

		const visibleElements = new Set<Element>()

		const observer = new IntersectionObserver(
			entries => {
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

				setHeadings(current =>
					current.map(heading => ({
						...heading,
						active: heading.id === firstVisibleContentElement?.[1],
					}))
				)
			},
			{
				rootMargin: `-${getComputedStyle(document.documentElement).scrollPaddingTop} 0px 0px`,
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

	return (
		<nav className="sticky top-16">
			<h2 className="text-sm/6 font-semibold text-slate-50">Sur cette page</h2>
			<ul className="mt-3 flex flex-col gap-3 border-l border-slate-50/10 text-sm/6 text-slate-300">
				{headings.map(heading => (
					<li
						key={heading.id}
						className={clsx(
							'-ml-px border-l border-transparent pl-4',
							'hover:text-slate-50 hover:not-has-aria-[current=location]:border-cyan-400',
							'has-aria-[current=location]:border-cyan-400'
						)}
					>
						<Link
							href={`#${heading.id}`}
							aria-current={heading.active ? 'location' : undefined}
							className={clsx(
								heading.level === 3 && 'pl-4',
								'block aria-[current=location]:font-medium aria-[current=location]:text-cyan-400'
							)}
						>
							{heading.text}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
