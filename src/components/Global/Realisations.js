import React from 'react'
import Link from 'next/link'
import { replaceTitle } from '@/services/utils'
import Image from 'next/image'

function Realisations({ content_website, realisations }) {
	realisations = realisations.slice(0, 5)
	return (
		<>
			<section className="w-full p-4 xl:p-20">
				{/*// <!--     Derniers projets -->*/}
				<div className="mt-[100px] flex justify-between xl:mt-[300px]">
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
							className="rounded bg-indigo-600 px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							{content_website?.attributes?.content_home?.link[0]?.label}
						</Link>
						<Link
							href={content_website?.attributes?.content_home?.link[1]?.url}
							className="rounded bg-sky-600 px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							{content_website?.attributes?.content_home?.link[1]?.label}
						</Link>
					</div>
				</div>
				<div className="mt-10 flex flex-row flex-nowrap overflow-hidden xl:mt-20">
					<div className="animate-scrolling-rea flex flex-row flex-nowrap gap-[20px] xl:gap-[40px]">
						{realisations.map(realisation => {
							return (
								<Link
									key={realisation?.id}
									href={'/portefolio/' + realisation?.attributes?.slug}
									className="relative flex h-[400px] w-[400px] flex-col p-10 pb-4 xl:h-[350px] xl:w-[600px] xl:p-14"
								>
									<h2 className="absolute left-0 top-0 z-30 mt-4 w-2/3 text-2xl font-black normal-case xl:mt-0 xl:text-3xl">
										{realisation?.attributes?.title}
									</h2>
									<div
										className={
											'h-full w-full shadow-[0_0_35px_0_rgba(27,31,76,1)]'
										}
									>
										<div className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full brightness-50">
											<Image
												src={
													realisation?.attributes?.image_presentation?.data
														?.attributes?.url
												}
												alt={realisation?.attributes?.title}
												className="z-20 h-full w-full object-cover"
												layout="fill"
											/>
										</div>
									</div>
									<h2 className="absolute bottom-0 left-0 z-30 mt-4 text-xl font-black text-sky-400 xl:mt-0 xl:text-3xl xl:font-bold">
										{realisation?.attributes?.subtitle}
									</h2>
								</Link>
							)
						})}
					</div>
				</div>
			</section>
		</>
	)
}

export default Realisations
