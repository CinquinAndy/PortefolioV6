import hljs from 'highlight.js'
import parse, { type DOMNode, domToReact, type Element } from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { replaceDynamicVariables } from '@/services/utils'

const options = {
	replace: (domNode: DOMNode) => {
		if (domNode.type === 'tag') {
			const elementNode = domNode as Element
			const { parent, name, children, attribs } = elementNode

			if (name === 'p') {
				// Check if this paragraph is inside a list item by walking up the parent tree
				let currentParent = parent
				let isInListItem = false

				// Walk up the DOM tree to check if we're inside a list item
				while (currentParent != null) {
					const parentElement = currentParent as Element
					if (parentElement.name === 'li' || parentElement.name === 'ul' || parentElement.name === 'ol') {
						isInListItem = true
						break
					}
					currentParent = parentElement.parent
				}

				const firstChild = children?.[0]
				const content = firstChild && 'data' in firstChild ? (firstChild.data as string) : ''
				if (isMarkdownTable(content)) {
					return markdownTableToHtml(content)
				} else if (isInListItem) {
					// Don't wrap paragraphs inside list items with additional divs
					return domToReact(children as DOMNode[], options)
				} else {
					return <div className={'my-5'}>{domToReact(children as DOMNode[], options)}</div>
				}
			}

			// Specific processing for code blocks
			if (name === 'pre' && children?.length > 0) {
				const firstChild = children[0] as Element
				if (firstChild.name === 'code') {
					const codeChild = firstChild.children?.[0]
					const codeContent = codeChild && 'data' in codeChild ? (codeChild.data as string) : ''
					// Use highlight.js for code highlighting
					const highlightedContent = hljs.highlightAuto(codeContent).value

					return (
						<pre className={'code max-w-[calc(100vw-2.5rem-10px)] overflow-x-auto rounded-md p-5 text-white'}>
							<code dangerouslySetInnerHTML={{ __html: highlightedContent }} />
						</pre>
					)
				}
			}

			if (name === 'img') {
				const { src, alt } = attribs

				if (!src || !alt) return null
				return (
					<div className={'flex w-full items-center justify-center'}>
						<Image
							alt={alt}
							className={`max-h-[300px] object-contain sm:max-h-[450px] md:max-h-[350px] lg:max-h-[550px] xl:max-h-[650px]`}
							height={1000}
							quality={85}
							src={src}
							width={1000}
						/>
					</div>
				)
			}

			if (name === 'hr') {
				return <hr className={'border-white/50'} />
			}

			if (name === 'a') {
				const href = attribs?.href

				if (!href) return null

				if (href.includes('.mp4')) {
					return (
						<video className={'w-full'} controls muted>
							<source src={href} type="video/mp4" />
						</video>
					)
				}
				return (
					<Link className={'underline'} href={href}>
						{domToReact(children as DOMNode[], options)}
					</Link>
				)
			}
		}

		return domNode
	},
}

interface LayoutProps {
	value: string
	className?: string
}

export function Layout({ value, className }: LayoutProps): React.JSX.Element | null {
	if (!value) {
		return null
	}
	// Replace dynamic variables before parsing
	const valueWithReplacements = replaceDynamicVariables(value)
	const parsedContent = parse(valueWithReplacements, options)
	const replacedContent = Array.isArray(parsedContent)
		? domToReact(parsedContent as unknown as DOMNode[], options)
		: parsedContent

	return <div className={`${className ?? ''} layout-custom`}>{replacedContent}</div>
}

function isMarkdownTable(content: string): boolean {
	const lines = content.split('\n')
	return (
		lines.length > 2 &&
		lines[1]
			.trim()
			.split('|')
			.some(part => part.trim().startsWith('---'))
	)
}

function markdownTableToHtml(markdown: string): React.JSX.Element {
	const rows = markdown.split('\n').filter(row => row.trim())
	const tableRows = rows
		.map((row, index) => {
			const rowData = row.split('|').filter(cell => cell.trim())
			if (index === 0) {
				return `<tr>${rowData.map(header => `<th className="font-black px-3 py-3 text-left">${header.trim()}</th>`).join('')}</tr>`
			} else if (index === 1) {
				return ''
			} else {
				return `<tr>${rowData.map(cell => `<td className="px-3 text-left">${cell.trim()}</td>`).join('')}</tr>`
			}
		})
		.join('')

	return React.createElement(
		'div',
		{
			className: 'bg-black/50 rounded-lg',
		},
		React.createElement(
			'table',
			{
				className: 'min-w-full *:border-white/50 border-white/50',
			},
			React.createElement('tbody', { className: '*:border-white/50' }, parse(tableRows))
		)
	)
}
