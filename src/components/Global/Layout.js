import parse, { domToReact } from 'html-react-parser'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const options = {
	replace: domNode => {
		if (domNode?.type === 'tag') {
			const { name, attribs } = domNode

			if (name === 'img') {
				const { src, alt, width, height } = attribs
				return <Image src={src} alt={alt} width={500} height={500} />
			}

			if (name === 'a') {
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
