'use client'

import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { ComponentLoadComponent } from '@/components/Global/ComponentLoad.component'
import { ArticleRealisationSkeleton } from '@/components/Global/SkeletonsFallback/ArticleRealisationSkeleton'
import MasonryGrid from '@/components/ui/masonry-grid'
import { replaceTitle } from '@/services/utils'
import type { ContentWebsite, Realisation } from '@/types/strapi'

interface RealisationsProps {
	slice?: number
	realisations?: Realisation[]
	isHome?: boolean
	content_website?: ContentWebsite
}

function Realisations({ slice, realisations, isHome, content_website }: RealisationsProps): React.JSX.Element {
	// Filter out realisations without slug and then slice if needed
	const validRealisations = (realisations ?? []).filter(r => r?.attributes?.slug)
	const displayRealisations = slice != null && validRealisations ? validRealisations.slice(0, slice) : validRealisations

	return (
		<section className="w-full p-4 md:p-20">
			{/*// <!-- Last projects -->*/}
			{isHome != null && isHome === true && (
				<div className="mt-[100px] flex justify-between">
					<div className="w-1/2">
						<h2
							className="font-display! text-2xl normal-case leading-snug xl:text-5xl *:font-display! *:text-2xl *:normal-case xl:*:text-5xl"
							dangerouslySetInnerHTML={{
								__html: replaceTitle(content_website?.attributes?.content_home?.title_realisation ?? ''),
							}}
						></h2>
					</div>
					<div className="flex w-1/2 flex-col items-end gap-4 xl:flex-row xl:justify-end">
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
			)}
			<div className="mt-10 flex w-full justify-center xl:mt-20">
				<MasonryGrid
					items={displayRealisations}
					className="columns-1 md:columns-2 2xl:columns-3"
					gap="8rem"
					staggerDelay={0.08}
					disable3DAnimation={false}
					renderItem={(realisation, _index) => (
						<Link
							className="relative flex w-full flex-col"
							href={`/portefolio/${realisation?.attributes?.slug}`}
							key={realisation?.id}
						>
							<h2 className="z-30 w-full pb-2 text-2xl font-black normal-case xl:mt-0 xl:text-3xl 2xl:text-4xl">
								{realisation?.attributes?.title}
							</h2>
							<div className={'w-full shadow-[0_0_35px_0_rgba(27,31,76,1)]'}>
								<ComponentLoadComponent FallBack={ArticleRealisationSkeleton}>
									<div className="custom-card shadow-innercustom relative z-10 my-2 aspect-video w-full brightness-90">
										<Image
											alt={realisation?.attributes?.image_presentation?.data?.attributes?.alternativeText ?? ''}
											className="z-20 h-full w-full object-cover"
											fill={true}
											sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
											src={realisation?.attributes?.image_presentation?.data?.attributes?.url ?? ''}
										/>
										<div
											className={
												'custom-image-hover absolute left-0 top-0 z-20 h-full w-full backdrop-brightness-75 backdrop-grayscale'
											}
										/>
									</div>
								</ComponentLoadComponent>
							</div>
							<h2 className="z-30 w-full pt-6 pb-12 text-xl font-black text-cyan-400 xl:mt-0 xl:text-3xl xl:font-bold 2xl:text-4xl">
								{realisation?.attributes?.subtitle}
							</h2>
						</Link>
					)}
				/>
			</div>
		</section>
	)
}

export default Realisations
