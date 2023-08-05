import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getContentWebsite } from '@/services/getContentWebsite'

function Custom404({ content_website }) {
	return (
		<>
			<Head>
				<title>
					{content_website?.attributes?.content_notfound?.seo?.title}
				</title>
				<meta
					name="description"
					content={
						content_website?.attributes?.content_notfound?.seo?.description
					}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_notfound?.seo?.canonical}
				/>
				<link
					rel="alternate"
					href={content_website?.attributes?.content_notfound?.seo?.canonical}
					hrefLang={locale}
				/>
			</Head>

			<div className="">
				<div className="flex flex-1 flex-col justify-center bg-white px-4 sm:px-6 md:py-12 md:pt-12 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<Link href={'/'}>
							<Image
								alt="Logo Andy Cinquin"
								width={50}
								height={50}
								src="/assets/icons/logov2.svg"
							/>
						</Link>
						<div className={'mt-8'}>
							<h1 className={'my-8 text-2xl font-semibold text-slate-900'}>
								{content_website?.attributes?.content_notfound?.seo?.h1}
							</h1>
							{/*todo here*/}
							<p className={'text-slate-700'}>
								{/*todo here*/}
								{`Oops ! La page que vous cherchez n'existe pas.`}
							</p>

							<Link href={'/'} className="btn-primary-large mt-8">
								{/*todo here*/}
								{`Retourner à l'accueil`}
							</Link>
						</div>
					</div>
				</div>
				<div className="relative hidden w-full flex-1 lg:block lg:object-contain">
					<div
						className={
							'absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-r from-white via-transparent to-transparent'
						}
					></div>
					<Image
						alt={'background Andy Cinquin 404'}
						fill
						src="/assets/images/cat404.svg"
						className={'z-10 transform object-cover'}
					/>
				</div>
			</div>
		</>
	)
}

export async function getStaticProps({ locale }) {
	const content_website = await getContentWebsite(locale)

	if (!content_website) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
		},
		revalidate: 10,
	}
}

export default Custom404
