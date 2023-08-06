import { Layout } from '@/components/Global/Layout'

export function Signature({ content_website }) {
	const actualYear = new Date().getFullYear()
	return (
		<div className={'pb-20'}>
			<div className="mx-auto max-w-3xl">
				<article>
					<div className={'prose prose-invert'}>
						© {actualYear}
						<Layout
							value={content_website?.attributes?.content_footer?.content_signature?.toString()}
						/>
					</div>
				</article>
			</div>
		</div>
	)
}
