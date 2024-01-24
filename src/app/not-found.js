'use client'

import Image from 'next/image'
import { router } from 'next/client'
import Footer from '@/components/Global/Footer'
import Link from 'next/link'
import { Layout } from '@/components/Global/Layout'
import { getContentWebsite, getNotFound } from '@/services/getContentWebsite'
import { useEffect, useState } from 'react'
import { getLocale } from 'next-intl/server'
// import { getContentWebsite, getNotFound } from '@/services/getContentWebsite'
//
// export async function generateMetadata({ locale }) {
// 	// fetch data
// 	const content_website = await getContentWebsite(locale)
//
// 	return {
// 		title:
// 			content_website?.attributes?.content_notfound?.seo?.title ||
// 			'Andy Cinquin - Entrepreneur & Développeur Freelance',
// 		description:
// 			content_website?.attributes?.content_notfound?.seo?.description ||
// 			'Portefolio professionnel de Andy Cinquin, développeur informatique Freelance, Nantes et alentours. Développement sur-mesure, web, applicatifs',
// 		metadataBase: new URL(
// 			content_website?.attributes?.content_notfound?.seo?.canonical
// 		),
// 		alternates: {
// 			canonical: '/',
// 			languages: {
// 				'fr-FR': '/',
// 				'en-US': 'https://andy-cinquin.com',
// 			},
// 		},
// 		icons: {
// 			icon: `${process.env.NEXT_PUBLIC_URL}/favicon.webp`,
// 		},
// 	}
// }

export default function NotFound() {
	// const { locale } = router
	// const locale = getLocale()
	const [content_website, setContent_website] = useState(null)
	const [notFound, setNotFound] = useState(null)

	// const content_website =  getContentWebsite(locale)
	// const notfound =  getNotFound(locale)
	useEffect(() => {
		console.log('useEffect')
		getContentWebsite('en').then(data => {
			setContent_website(data)
		})
		getNotFound('en').then(data => {
			setNotFound(data)
		})
	}, [])

	return (
		<>
			{content_website && notFound && (
				<>
					<div className="h-screen">
						<div className="flex h-full items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
							<div>
								<Link href={'/'}>
									<Image
										alt="Logo Andy Cinquin"
										width={50}
										height={50}
										src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/logov2.svg`}
									/>
								</Link>
								<div className={'mt-8'}>
									<h1 className={'my-8 text-2xl font-semibold text-slate-50'}>
										{content_website?.attributes?.content_notfound?.seo?.h1 ??
											'404 Not Found'}
									</h1>
									<div className="mx-auto max-w-3xl">
										<article>
											<div className={'prose prose-invert my-8'}>
												<Layout
													value={notFound?.attributes?.content.toString()}
												/>
											</div>
										</article>
									</div>

									<Link
										href={notFound?.attributes?.link?.url ?? '/'}
										className="mt-8 text-slate-50 underline"
									>
										{notFound?.attributes?.link?.label}
									</Link>
								</div>
							</div>
						</div>
					</div>
					<Footer content_website={content_website} />
				</>
			)}
		</>
	)
}
