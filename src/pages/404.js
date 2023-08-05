import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getContentWebsite } from '@/services/getContentWebsite'
import { useRouter } from 'next/router'

function Custom404({ content_website }) {
	const router = useRouter()
	const { locale } = router
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

			<div className="h-screen">
				<div className="flex h-full items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
					<div className="">
						<Link href={'/'}>
							<Image
								alt="Logo Andy Cinquin"
								width={50}
								height={50}
								src="/assets/icons/logov2.svg"
							/>
						</Link>
						<div className={'mt-8'}>
							<h1 className={'my-8 text-2xl font-semibold text-slate-50'}>
								{content_website?.attributes?.content_notfound?.seo?.h1 ??
									'404 Not Found'}
							</h1>
							{/*todo here*/}
							<p className={'text-slate-300'}>
								{/*todo here*/}
								{`Oops ! La page que vous cherchez n'existe pas.`}
							</p>

							<Link href={'/'} className="mt-8 text-slate-50">
								{/*todo here*/}
								{`Retourner à l'accueil`}
							</Link>
						</div>
					</div>
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
