'use client'

import { Carousel } from '@ark-ui/react/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { ComponentLoadComponent } from '@/components/Global/ComponentLoad.component'
import { ArticleRealisationSkeleton } from '@/components/Global/SkeletonsFallback/ArticleRealisationSkeleton'
import { replaceTitle } from '@/services/utils'
import type { ContentWebsite, Realisation } from '@/types/strapi'

interface RealisationsCarouselProps {
	realisations?: Realisation[]
	content_website?: ContentWebsite
}

function RealisationsCarousel({ realisations, content_website }: RealisationsCarouselProps): React.JSX.Element | null {
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
						className="!font-display text-2xl normal-case leading-snug xl:text-5xl [&>*]:!font-display *:text-2xl *:normal-case xl:*:text-5xl"
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

			{/* Carousel */}
			<div className="mt-10 xl:mt-20">
				<Carousel.Root slideCount={validRealisations.length} className="w-full">
					{/* Main carousel display */}
					<Carousel.ItemGroup className="overflow-hidden">
						{validRealisations.map((realisation, index) => (
							<Carousel.Item key={realisation.id} index={index}>
								<Link className="relative flex w-full flex-col" href={`/portefolio/${realisation?.attributes?.slug}`}>
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
													sizes="100vw"
													src={realisation?.attributes?.image_presentation?.data?.attributes?.url ?? ''}
													priority={index === 0}
												/>
												<div
													className={
														'custom-image-hover absolute left-0 top-0 z-20 h-full w-full backdrop-brightness-75 backdrop-grayscale'
													}
												/>
											</div>
										</ComponentLoadComponent>
									</div>
									<h2 className="z-30 w-full pt-6 text-xl font-black text-cyan-400 xl:mt-0 xl:text-3xl xl:font-bold 2xl:text-4xl">
										{realisation?.attributes?.subtitle}
									</h2>
								</Link>
							</Carousel.Item>
						))}
					</Carousel.ItemGroup>

					{/* Controls and thumbnails */}
					<div className="mt-10 flex flex-col md:flex-row items-center gap-6">
						{/* Previous button */}
						<Carousel.PrevTrigger className="button-purple rounded p-3 xl:p-4 shrink-0 transition-all hover:scale-105">
							<span className="button-purple-title">
								<ChevronLeft className="h-5 w-5" />
							</span>
						</Carousel.PrevTrigger>

						{/* Thumbnails */}
						<div className="flex-1 w-full overflow-hidden">
							<Carousel.IndicatorGroup className="flex gap-4 overflow-x-auto scrollbar-hide px-2 justify-center md:justify-start">
								{validRealisations.map((realisation, index) => (
									<Carousel.Indicator
										key={realisation.id}
										index={index}
										className="shrink-0 cursor-pointer transition-all relative group"
									>
										<div className="relative w-24 h-16 xl:w-32 xl:h-20 overflow-hidden rounded-md border-2 border-transparent data-[state=on]:border-cyan-400 transition-all hover:border-purple-400">
											<Image
												alt={realisation?.attributes?.image_presentation?.data?.attributes?.alternativeText ?? ''}
												className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
												fill={true}
												sizes="128px"
												src={realisation?.attributes?.image_presentation?.data?.attributes?.url ?? ''}
											/>
										</div>
									</Carousel.Indicator>
								))}
							</Carousel.IndicatorGroup>
						</div>

						{/* Next button */}
						<Carousel.NextTrigger className="button-cyan rounded p-3 xl:p-4 shrink-0 transition-all hover:scale-105">
							<span className="button-cyan-title">
								<ChevronRight className="h-5 w-5" />
							</span>
						</Carousel.NextTrigger>
					</div>

					{/* Dot indicators for mobile */}
					<Carousel.IndicatorGroup className="flex md:hidden justify-center items-center mt-6 gap-2">
						{validRealisations.map((realisation, index) => (
							<Carousel.Indicator
								key={`dot-${realisation.id}`}
								index={index}
								className="w-2 h-2 rounded-full bg-gray-600 data-[state=on]:bg-cyan-400 data-[state=on]:w-8 transition-all cursor-pointer"
							/>
						))}
					</Carousel.IndicatorGroup>
				</Carousel.Root>
			</div>
		</section>
	)
}

export default RealisationsCarousel
