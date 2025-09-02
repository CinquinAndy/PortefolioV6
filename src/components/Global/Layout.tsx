import parse, { domToReact } from 'html-react-parser'
import React from 'react'

import hljs from 'highlight.js'
import Image from 'next/image'
import Link from 'next/link'

import { replaceDynamicVariables } from '@/services/utils'

const options = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	replace: (domNode: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (domNode?.type === 'tag') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { name, children, attribs } = domNode

			if (name === 'p') {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				const content = domNode.children?.[0]?.data ?? ''
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				if (isMarkdownTable(content)) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					return markdownTableToHtml(content)
				} else {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					return <div className={'my-5'}>{domToReact(children, options)}</div>
				}
			}

			// Specific processing for code blocks
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (name === 'pre' && children?.length > 0 && children[0].name === 'code') {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				const codeContent = children[0].children?.[0]?.data ?? ''
				// Use highlight.js for code highlighting
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const highlightedContent = hljs.highlightAuto(codeContent).value

				return (
					<pre className={'code max-w-[calc(100vw-2.5rem-10px)] overflow-x-auto rounded-md p-5 text-white'}>
						<code dangerouslySetInnerHTML={{ __html: highlightedContent }} />
					</pre>
				)
			}

			if (name === 'img') {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const { src, alt } = attribs

				if (!(src as string) || !(alt as string)) return null
				return (
					<div className={'flex w-full items-center justify-center'}>
						<Image
							alt={alt as string}
							className={`max-h-[300px] object-contain xl:max-h-[650px] sm:max-h-[450px] md:max-h-[350px] lg:max-h-[550px]`}
							height={1000}
							quality={85}
							src={src as string}
							width={1000}
						/>
					</div>
				)
			}

			if (name === 'hr') {
				return <hr className={'border-white/50'} />
			}

			if (name === 'a') {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				const href = attribs?.href

				if (!(href as string)) return null

				if ((href as string).includes('.mp4')) {
					return (
						<video className={'w-full'} controls muted>
							<source src={href as string} type="video/mp4" />
						</video>
					)
				}
				return (
					<Link className={'underline'} href={href as string}>
						{/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
						{domToReact(children, options)}
					</Link>
				)
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
	const replacedContent: any = domToReact(parsedContent as any, options)

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
