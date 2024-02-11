import Image from 'next/image'

export function ImageLoad({ image }) {
	return (
		<Image
			src={image?.attributes?.url}
			alt={image?.attributes?.alternativeText ?? 'Project Image'}
			width={image?.attributes?.width}
			height={image?.attributes?.height}
			className={`rounded-lg p-32`}
			quality={75}
		/>
	)
}