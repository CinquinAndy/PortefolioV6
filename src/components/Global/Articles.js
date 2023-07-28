import React from 'react'
import Link from 'next/link'
import { replaceTitle } from '@/services/utils'
import Image from 'next/image'

function Articles({ content_website, articles, slice, isHome }) {
	articles = slice ? articles.slice(0, slice) : articles
	const gridTemplateCustom = index => {
		switch (index % 3) {
			case 0:
				return 'col-start-1 col-end-13 md:col-start-1 md:col-end-8 2xl:col-start-1 2xl:col-end-8'
			case 1:
				return 'col-start-1 col-end-13 md:col-start-6 md:col-end-13 2xl:col-start-7 2xl:col-end-13'
			case 2:
				return 'col-start-1 col-end-13 md:col-start-1 md:col-end-13 2xl:col-start-3 2xl:col-end-11'
		}
	}
	return (
		<>
			<section className="w-full p-4 md:p-20">
				{/*// <!--     Derniers articles -->*/}
				{isHome && (
					<div className="mt-[100px] flex justify-between">
						<div className="w-1/2">
							<h2
								className="text-2xl normal-case leading-snug xl:text-5xl"
								dangerouslySetInnerHTML={{
									__html: replaceTitle(
										content_website?.attributes?.content_home?.title_blog
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
				)}
				<div className="mt-10 flex w-full justify-center xl:mt-20">
					<div className="grid w-full grid-cols-12 gap-[20px] md:gap-[40px] xl:gap-[60px] 2xl:gap-[80px] 2xl:gap-y-[150px]">
						{articles.map((article, index) => {
							return (
								<Link
									key={article?.id}
									href={'/blog/' + article?.attributes?.slug}
									className={`${gridTemplateCustom(
										index
									)} relative flex aspect-[16/9] h-[50vh] w-full flex-col items-center justify-center p-10 sm:h-auto`}
								>
									<h2 className="absolute left-0 top-0 z-30 mt-4 w-2/3 text-2xl font-black normal-case xl:mt-0 xl:text-3xl 2xl:text-4xl">
										{article?.attributes?.title}
									</h2>
									<div
										className={
											'h-full w-full shadow-[0_0_35px_0_rgba(27,31,76,1)]'
										}
									>
										<div className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full brightness-90">
											<Image
												src={
													article?.attributes?.image_presentation?.data
														?.attributes?.url
												}
												alt={article?.attributes?.title}
												className="z-20 h-full w-full object-cover"
												fill={true}
												sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
											/>
										</div>
									</div>
									<h2 className="absolute bottom-0 left-0 z-30 mt-4 text-xl font-black text-sky-400 xl:mt-0 xl:text-3xl xl:font-bold 2xl:text-4xl">
										{article?.attributes?.subtitle}
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

export default Articles
