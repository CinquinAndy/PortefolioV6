import parse, { domToReact } from 'html-react-parser'
import React from 'react'

import hljs from 'highlight.js'
import Image from 'next/image'
import Link from 'next/link'

const options = {
	replace: domNode => {
		if (domNode?.type === 'tag') {
			const { name, children, attribs } = domNode

			if (name === 'p') {
				const content = domNode.children[0]?.data || ''
				if (isMarkdownTable(content)) {
					return markdownTableToHtml(content)
				} else {
					return <div className={'my-5'}>{domToReact(domNode.children, options)}</div>
				}
			}

			// Specific processing for code blocks
			if (name === 'pre' && children.length && children[0].name === 'code') {
				// Ensure the code content is plain text for parsing
				const codeContent = children[0].children[0]?.data || ''
				// Use highlight.js for code highlighting
				const highlightedContent = hljs.highlightAuto(codeContent).value

				return (
					<pre className={'code max-w-[calc(100vw-2.5rem-10px)] overflow-x-auto rounded-md p-5 text-white'}>
						<code dangerouslySetInnerHTML={{ __html: highlightedContent }} />
					</pre>
				)
			}

			if (name === 'img') {
				const { src, alt } = attribs
				return (
					<div className={'flex w-full items-center justify-center'}>
						<Image
							alt={alt}
							className={`max-h-[300px] object-contain xl:max-h-[650px] sm:max-h-[450px] md:max-h-[350px] lg:max-h-[550px]`}
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
				if (attribs.href.includes('.mp4')) {
					return (
						<video className={'w-full'} controls muted>
							<source src={attribs.href} type="video/mp4" />
						</video>
					)
				}
				const { href } = attribs
				return (
					<Link className={'underline'} href={href}>
						{domToReact(domNode.children, options)}
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

export function Layout({ value, className }: LayoutProps): React.JSX.Element {
	if (!value) {
		return null
	}
	const parsedContent = parse(value, options)
	// if replaced content contains '{actualYear}' replace it with the current year
	let replacedContent = domToReact(parsedContent, options)

	// Ensure replacedContent is an array
	if (!Array.isArray(replacedContent)) {
		replacedContent = [replacedContent]
	}

	// Convert the elements to a new array with updated children prop
	replacedContent = replacedContent.map(child => {
		if (React.isValidElement(child) && Array.isArray(child.props.children)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const updatedChildren = child.props.children.map((textChild, index) => {
				if (typeof textChild === 'string') {
					const currentYear = new Date().getFullYear()
					return textChild.replace(/{actualYear}/g, currentYear)
				} else {
					return textChild
				}
			})

			return React.cloneElement(child, { children: updatedChildren })
		}
		return child
	})

	return <div className={`${className ?? ''} layout-custom`}>{replacedContent}</div>
}

function isMarkdownTable(content) {
	const lines = content.split('\n')
	return (
		lines.length > 2 &&
		lines[1]
			.trim()
			.split('|')
			.some(part => part.trim().startsWith('---'))
	)
}

function markdownTableToHtml(markdown) {
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
