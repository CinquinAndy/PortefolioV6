import parse, { domToReact } from 'html-react-parser'
import Image from 'next/image'

const options = {
	replace: domNode => {
		if (domNode?.type === 'tag' && domNode?.name === 'img') {
			const { attribs } = domNode
			const { src, alt, width, height } = attribs

			return <Image src={src} alt={alt} width={500} height={500} />
		}

		return domNode
	},
}

export function Layout({ className, value }) {
	const parsedContent = parse(value, options)
	const replacedContent = domToReact(parsedContent, options)

	return <div className={`${className} layout-custom`}>{replacedContent}</div>
}
