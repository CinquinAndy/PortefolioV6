'use client'

import Link from 'next/link'
import type React from 'react'
import { RealisationsSlider } from '@/components/ui/realisations-slider'
import { replaceTitle } from '@/services/utils'
import type { ContentWebsite, Realisation } from '@/types/strapi'

interface RealisationsSliderSectionProps {
	realisations?: Realisation[]
	content_website?: ContentWebsite
}

function RealisationsSliderSection({
	realisations,
	content_website,
}: RealisationsSliderSectionProps): React.JSX.Element | null {
	// Filter out realisations without slug
	const validRealisations = (realisations ?? []).filter(r => r?.attributes?.slug)

	if (validRealisations.length === 0) {
		return null
	}

	return (
		<section className="w-full p-4 md:p-20">
			{/* Header with title and CTA buttons */}
			<div className="mt-[100px] flex flex-col md:flex-row justify-between gap-8 md:gap-4">
				<div className="w-full md:w-1/2">
					<h2
						className="font-display! text-2xl normal-case leading-snug xl:text-5xl *:font-display! *:text-2xl *:normal-case xl:*:text-5xl"
						dangerouslySetInnerHTML={{
							__html: replaceTitle(content_website?.attributes?.content_home?.title_realisation ?? ''),
						}}
					/>
				</div>
				<div className="flex w-full md:w-1/2 flex-col items-start md:items-end gap-4 xl:flex-row xl:justify-end">
					<Link
						className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						href={content_website?.attributes?.content_home?.link?.[0]?.url ?? '/'}
					>
						<span className={'button-purple-title'}>
							{content_website?.attributes?.content_home?.link?.[0]?.label ?? ''}
						</span>
					</Link>
					<Link
						className="button-cyan rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						href={content_website?.attributes?.content_home?.link?.[1]?.url ?? '/'}
					>
						<span className={'button-cyan-title'}>{content_website?.attributes?.content_home?.link?.[1]?.label}</span>
					</Link>
				</div>
			</div>

			{/* Slider */}
			<div className="mt-10 xl:mt-20">
				<RealisationsSlider realisations={validRealisations} />
			</div>
		</section>
	)
}

export default RealisationsSliderSection
