import Link from 'next/link'
import { replaceTitle } from '@/services/utils'
import Image from 'next/image'
import { ComponentLoadComponent } from '@/components/Global/ComponentLoad.component'
import { ArticleSkeleton } from '@/components/Global/SkeletonsFallback/ArticleSkeleton'

function Articles({ content_website, articles, slice, isHome }) {
	articles = slice ? articles.slice(0, slice) : articles
	const gridTemplateCustom = index => {
		switch (index % 3) {
			case 0:
				return 'col-start-1 col-end-13 md:col-start-1 md:col-end-10 2xl:col-start-1 2xl:col-end-8'
			case 1:
				return 'col-start-1 col-end-13 md:col-start-3 md:col-end-13 2xl:col-start-7 2xl:col-end-13'
			case 2:
				return 'col-start-1 col-end-13 md:col-start-1 md:col-end-13 2xl:col-start-3 2xl:col-end-11'
		}
	}

	return (
		<section className="w-full p-4 md:p-20">
			{/*// <!--     Derniers articles -->*/}
			{isHome && (
				<div className="mt-[100px] flex justify-between">
					<div className="w-1/2">
						<h2
							className="!font-display text-2xl normal-case leading-snug xl:text-5xl [&>*]:!font-display [&>*]:text-2xl [&>*]:normal-case xl:[&>*]:text-5xl"
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
							className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							<span className={'button-purple-title'}>
								{content_website?.attributes?.content_home?.link[0]?.label}
							</span>
						</Link>
						<Link
							href={content_website?.attributes?.content_home?.link[2]?.url}
							className="button-cyan rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							<span className={'button-cyan-title'}>
								{content_website?.attributes?.content_home?.link[2]?.label}
							</span>
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
								)} relative flex aspect-[16/9] h-[75vh] w-full flex-col items-center justify-center p-10 sm:h-[55vh] lg:h-auto`}
							>
								<h2 className="z-30 w-full pb-2 text-2xl font-black normal-case xl:mt-0 xl:text-3xl 2xl:text-4xl">
									{article?.attributes?.title}
								</h2>
								<div className="h-full w-full shadow-[0_0_35px_0_rgba(27,31,76,1)]">
									{/*<ComponentLoadComponent FallBack={ArticleSkeleton}>*/}
									{/*	<Image*/}
									{/*		src={*/}
									{/*			article?.attributes?.image_presentation?.data*/}
									{/*				?.attributes?.url*/}
									{/*		}*/}
									{/*		alt={*/}
									{/*			article?.attributes?.image_presentation?.data*/}
									{/*				?.attributes?.alternativeText*/}
									{/*		}*/}
									{/*		className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full brightness-90"*/}
									{/*		fill={true}*/}
									{/*		sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"*/}
									{/*	/>*/}
									{/*</ComponentLoadComponent>*/}
									<ComponentLoadComponent FallBack={ArticleSkeleton}>
										<div className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full brightness-90">
											<Image
												src={
													article?.attributes?.image_presentation?.data
														?.attributes?.url
												}
												alt={
													article?.attributes?.image_presentation?.data
														?.attributes?.alternativeText
												}
												className="z-20 h-full w-full object-cover"
												fill={true}
												sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
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
									{article?.attributes?.subtitle}
								</h2>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Articles
