import Image from 'next/image'
import Link from 'next/link'

import { ArticleRealisationSkeleton } from '@/components/Global/SkeletonsFallback/ArticleRealisationSkeleton'
import { ComponentLoadComponent } from '@/components/Global/ComponentLoad.component'
import { replaceTitle } from '@/services/utils'

function Realisations({ content_website, realisations, isHome, slice }) {
	realisations = slice ? realisations.slice(0, slice) : realisations
	const gridTemplateCustom = index => {
		switch (index % 3) {
			case 0:
				return 'col-start-1 col-end-13 md:col-start-1 md:col-end-10 2xl:col-start-1 2xl:col-end-6'
			case 1:
				return 'col-start-1 col-end-13 md:col-start-4 md:col-end-13 2xl:col-start-5 2xl:col-end-13'
			case 2:
				return 'col-start-1 col-end-13 md:col-start-1 md:col-end-13 2xl:col-start-2 2xl:col-end-12'
		}
	}
	return (
		<section className="w-full p-4 md:p-20">
			{/*// <!--     Derniers projets -->*/}
			{isHome && (
				<div className="mt-[100px] flex justify-between">
					<div className="w-1/2">
						<h2
							className="!font-display text-2xl normal-case leading-snug xl:text-5xl [&>*]:!font-display [&>*]:text-2xl [&>*]:normal-case xl:[&>*]:text-5xl"
							dangerouslySetInnerHTML={{
								__html: replaceTitle(content_website?.attributes?.content_home?.title_realisation),
							}}
						></h2>
					</div>
					<div className="flex w-1/2 flex-col items-end gap-4 xl:flex-row xl:justify-end">
						<Link
							className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
							href={content_website?.attributes?.content_home?.link[0]?.url}
						>
							<span className={'button-purple-title'}>{content_website?.attributes?.content_home?.link[0]?.label}</span>
						</Link>
						<Link
							className="button-cyan rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
							href={content_website?.attributes?.content_home?.link[1]?.url}
						>
							<span className={'button-cyan-title'}>{content_website?.attributes?.content_home?.link[1]?.label}</span>
						</Link>
					</div>
				</div>
			)}
			<div className="mt-10 flex w-full justify-center xl:mt-20">
				<div className="grid w-full grid-cols-12 gap-[20px] md:gap-[40px] xl:gap-[60px] 2xl:gap-[80px] 2xl:gap-y-[150px]">
					{realisations.map((realisation, index) => {
						return (
							<Link
								className={`${gridTemplateCustom(index)} relative flex aspect-[16/9] h-[75vh] w-full flex-col items-center justify-center p-10 sm:h-[55vh] lg:h-auto`}
								href={'/portefolio/' + realisation?.attributes?.slug}
								key={realisation?.id}
							>
								<h2 className="z-30 w-full pb-2 text-2xl font-black normal-case xl:mt-0 xl:text-3xl 2xl:text-4xl">
									{realisation?.attributes?.title}
								</h2>
								<div className={'h-full w-full shadow-[0_0_35px_0_rgba(27,31,76,1)]'}>
									<ComponentLoadComponent FallBack={ArticleRealisationSkeleton}>
										<div className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full brightness-90">
											<Image
												alt={realisation?.attributes?.image_presentation?.data?.attributes?.alternativeText}
												className="z-20 h-full w-full object-cover"
												fill={true}
												sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
												src={realisation?.attributes?.image_presentation?.data?.attributes?.url}
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
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Realisations
