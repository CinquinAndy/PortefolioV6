import parse, { domToReact } from 'html-react-parser'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const options = {
	replace: domNode => {
		if (domNode?.type === 'tag') {
			const { name, attribs } = domNode

			if (name === 'p') {
				const content = domNode.children[0]?.data || ''
				if (isMarkdownTable(content)) {
					return markdownTableToHtml(content)
				} else {
					return (
						<div className={'my-5'}>
							{domToReact(domNode.children, options)}
						</div>
					)
				}
			}

			if (name === 'img') {
				const { src, alt } = attribs
				return (
					<div className={'flex w-full items-center justify-center'}>
						<Image
							src={src}
							alt={alt}
							width={1000}
							height={1000}
							quality={85}
							className={`max-h-[300px] object-contain sm:max-h-[450px] md:max-h-[350px] lg:max-h-[550px] xl:max-h-[650px]`}
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
						<video muted controls className={'w-full'}>
							<source src={attribs.href} type="video/mp4" />
						</video>
					)
				}
				const { href } = attribs
				return (
					<Link href={href} className={'underline'}>
						{domToReact(domNode.children, options)}
					</Link>
				)
			}
		}

		return domNode
	},
}

export function Layout({ className, value }) {
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

	return (
		<div className={`${className ?? ''} layout-custom`}>{replacedContent}</div>
	)
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
			React.createElement(
				'tbody',
				{ className: '*:border-white/50' },
				parse(tableRows)
			)
		)
	)
}
