import React from 'react'

import { ContentWebsite } from '@/types/strapi'

import { Layout } from '@/components/Global/Layout'

interface SignatureProps {
	content_website?: ContentWebsite
}

export function Signature({ content_website }: SignatureProps): React.JSX.Element {
	return (
		<div className={'mt-10 px-6 pb-20 md:px-8 lg:px-20 2xl:mt-20'}>
			<div className="mx-auto max-w-3xl">
				<article>
					<div className={'prose-xs prose-invert'}>
						<Layout value={content_website?.attributes?.content_footer?.content_signature?.toString() ?? ''} />
					</div>
				</article>
			</div>
		</div>
	)
}
