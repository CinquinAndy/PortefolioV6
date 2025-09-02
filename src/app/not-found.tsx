import { getMetadataBase, getCanonicalUrl, getLanguageAlternates } from '@/utils/seo'
import { getResponseData } from '@/types/strapi'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { LottieAnimation } from '@/components/Global/Animations/LottieAnimation'
import { getContentWebsite, getNotFound } from '@/services/getContentWebsite'
import { Layout } from '@/components/Global/Layout'

export async function generateMetadata(): Promise<Metadata> {
	// fetch data
	const content_website_response = await getContentWebsite('en' as const)
	const content_website = getResponseData(content_website_response)

	const defaultMetadata = {
		title: 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: getMetadataBase('en'),
		description:
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: getLanguageAlternates('/404'),
			canonical: getCanonicalUrl('en', '/404'),
		},
	}

	if (!content_website || typeof content_website !== 'object' || !('attributes' in content_website)) {
		return defaultMetadata
	}

	return {
		title: content_website.attributes?.content_notfound?.seo?.title ?? defaultMetadata.title,
		metadataBase: getMetadataBase('en'),
		description: content_website.attributes?.content_notfound?.seo?.description ?? defaultMetadata.description,
		alternates: {
			languages: getLanguageAlternates('/404'),
			canonical: content_website.attributes?.content_notfound?.seo?.canonical ?? getCanonicalUrl('en', '/404'),
		},
	}
}

export default async function NotFound() {
	const content_website_response = await getContentWebsite('en' as const)
	const content_website = getResponseData(content_website_response)

	const notfound_response = await getNotFound('en' as const)
	const notfound = getResponseData(notfound_response)

	return (
		<>
			<LottieAnimation />
			<div className="h-dvh">
				<div className="flex h-full items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
					<div className="">
						<Link href={'/'}>
							<Image
								alt="Logo Andy Cinquin"
								height={50}
								src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/logov2.svg`}
								width={50}
							/>
						</Link>
						<div className={'mt-8'}>
							<h1 className={'my-8 text-2xl font-semibold text-slate-50'}>
								{content_website?.attributes?.content_notfound?.seo?.h1}
							</h1>
							<div className="mx-auto max-w-3xl">
								<article>
									<div className={'prose prose-invert my-8'}>
										<Layout value={notfound?.attributes?.content?.toString() ?? ''} />
									</div>
								</article>
							</div>

							<Link className="mt-8 text-slate-50 underline" href={notfound?.attributes?.link?.url ?? '/'}>
								{notfound?.attributes?.link?.label ?? 'Go Home'}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
