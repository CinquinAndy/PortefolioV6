import React from 'react'
import Link from 'next/link'
import { replaceTitle } from '@/services/utils'
import Image from 'next/image'

function Services({ content_website, services }) {
	return (
		<>
			<section className="w-full p-4 pt-[100px] xl:p-20 xl:pt-[300px] ">
				<div className="flex justify-between">
					<div className="w-2/3 xl:w-1/2">
						<h2
							className="text-2xl normal-case leading-snug xl:text-5xl"
							dangerouslySetInnerHTML={{
								__html: replaceTitle(
									content_website?.attributes?.content_home?.title_service
								),
							}}
						></h2>
					</div>
					<div className="flex w-1/2 items-end justify-end">
						<Link
							href={content_website?.attributes?.content_home?.link[0]?.url}
							className="rounded bg-indigo-600 px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							{content_website?.attributes?.content_home?.link[0]?.label}
						</Link>
					</div>
				</div>
				<div className="mt-10 flex flex-row flex-nowrap overflow-hidden xl:mt-20">
					<div className="animate-scrolling flex flex-row flex-nowrap gap-[20px] xl:gap-[40px]">
						{services.map(service => {
							return (
								<>
									<section className="flex h-[300px] w-[300px] flex-col bg-slate-1000 p-8 xl:h-[350px] xl:w-[600px] xl:p-20">
										<div className="flex w-full items-center justify-center">
											<Image
												src={service?.attributes?.image?.data?.attributes?.url}
												alt={service?.attributes?.title}
												className="h-[50px] w-[50px] xl:h-[75px] xl:w-[75px]"
												width={50}
												height={50}
											/>
										</div>
										<header className="flex w-full items-center justify-center py-8 xl:py-6">
											<h2
												className="text-lg normal-case xl:text-xl"
												dangerouslySetInnerHTML={{
													__html: replaceTitle(service?.attributes?.title),
												}}
											></h2>
										</header>
										<article
											className="text-xs xl:text-sm [&>*]:font-body"
											dangerouslySetInnerHTML={{
												__html: replaceTitle(service?.attributes?.content),
											}}
										></article>
									</section>
								</>
							)
						})}
					</div>
				</div>

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
						<a
							href="link"
							className="relative flex h-[400px] w-[400px] flex-col p-10 pb-4 xl:h-[350px] xl:w-[600px] xl:p-14"
						>
							<h2 className="absolute left-0 top-0 z-30 mt-4 w-2/3 text-2xl font-black normal-case xl:mt-0 xl:text-3xl">
								title
							</h2>
							<div className="custom-card shadow-innercustom bg-<?= $post->ID ?> z-10 my-2 h-full w-full brightness-50"></div>
							{/*<style>*/}
							{/*    .bg-<?= $post->ID ?> {*/}
							{/*    background: url(<?= get_the_post_thumbnail_url($post)?>) no-repeat center center;*/}
							{/*    background-size: cover;*/}
							{/*}*/}
							{/*</style>*/}
							<h2 className="absolute bottom-0 left-0 z-30 mt-4 text-xl font-black text-sky-400 xl:mt-0 xl:text-3xl xl:font-bold">
								subtitle
							</h2>
						</a>
					</div>
				</div>
			</section>
		</>
	)
}

export default Services
