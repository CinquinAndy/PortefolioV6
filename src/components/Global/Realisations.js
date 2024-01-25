import React from 'react'
import Link from 'next/link'
import { replaceTitle } from '@/services/utils'
import Image from 'next/image'

function Realisations({ content_website, realisations, slice, isHome }) {
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
							className="text-2xl normal-case leading-snug xl:text-5xl"
							dangerouslySetInnerHTML={{
								__html: replaceTitle(
									content_website?.attributes?.content_home?.title_realisation
								),
							}}
						></h2>
					</div>
					<div className="flex w-1/2 flex-col items-end gap-4 xl:flex-row xl:justify-end">
						<Link
							href={content_website?.attributes?.content_home?.link[0]?.url}
							className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							<span className={'button-purple-title'}>
								{content_website?.attributes?.content_home?.link[0]?.label}
							</span>
						</Link>
						<Link
							href={content_website?.attributes?.content_home?.link[1]?.url}
							className="button-sky rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							<span className={'button-sky-title'}>
								{content_website?.attributes?.content_home?.link[1]?.label}
							</span>
						</Link>
					</div>
				</div>
			)}
			<div className="mt-10 flex w-full justify-center xl:mt-20">
				<div className="grid w-full grid-cols-12 gap-[20px] md:gap-[40px] xl:gap-[60px] 2xl:gap-[80px] 2xl:gap-y-[150px]">
					{realisations.map((realisation, index) => {
						return (
							<Link
								key={realisation?.id}
								href={'/portefolio/' + realisation?.attributes?.slug}
								className={`${gridTemplateCustom(index)} relative flex aspect-[16/9] h-[50vh] w-full flex-col items-center justify-center p-10 sm:h-auto`}
							>
								<h2 className="absolute left-0 top-0 z-30 mt-4 w-2/3 text-2xl font-black normal-case xl:mt-0 xl:text-3xl 2xl:text-4xl">
									{realisation?.attributes?.title}
								</h2>
								<div className={'h-full w-full'}>
									<div className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full brightness-90">
										<Image
											src={
												realisation?.attributes?.image_presentation?.data
													?.attributes?.url
											}
											alt={realisation?.attributes?.title}
											className="mas z-20 h-full w-full object-cover"
											fill={true}
											sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
										/>
										<div
											className={
												'custom-image-hover absolute left-0 top-0 z-20 h-full w-full backdrop-brightness-75 backdrop-grayscale'
											}
										/>
									</div>
								</div>
								<h2 className="absolute bottom-0 left-0 z-30 mt-4 text-xl font-black text-sky-400 xl:mt-0 xl:text-3xl xl:font-bold 2xl:text-4xl">
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
