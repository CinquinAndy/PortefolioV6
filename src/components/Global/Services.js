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
				<div className="mt-10 flex flex-row justify-center xl:mt-20">
					<div className="grid grid-cols-1 gap-[60px] md:grid-cols-2 lg:grid-cols-3 xl:gap-[80px] 2xl:grid-cols-4">
						{services.map(service => {
							return (
								<>
									<section
										className={`shadow-innercustom relative flex flex-col bg-slate-1000 p-20`}
									>
										<div className="relative flex w-full items-center justify-center ">
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
			</section>
		</>
	)
}

export default Services
