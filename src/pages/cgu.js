import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'
import Cta from '@/components/Global/Cta'
import { getCgu, getContentWebsite } from '@/services/getContentWebsite'
import { Layout } from '@/components/Global/Layout'
import { useRouter } from 'next/router'

export default function Cgu({ content_website, cgu }) {
	const router = useRouter()
	const { locale } = router
	return (
		<>
			<Head>
				<title>{content_website?.attributes?.content_cgu?.seo?.title}</title>
				<meta
					name="description"
					content={content_website?.attributes?.content_cgu?.seo?.description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_cgu?.seo?.canonical}
				/>
				<link
					rel="alternate"
					href={content_website?.attributes?.content_cgu?.seo?.canonical}
					hrefLang={locale}
				/>
			</Head>

			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_cgu?.seo?.h1}
			/>
			<div>
				<div className={'relative'}>
					<div className={'my-24 grid grid-cols-1 px-6 md:my-48 2xl:px-0'}>
						<div className="mx-auto max-w-3xl">
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout value={cgu?.attributes?.content.toString()} />
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<Cta content_website={content_website} />

			<Footer content_website={content_website} />
		</>
	)
}

export async function getStaticProps({ locale }) {
	const content_website = await getContentWebsite(locale)
	const cgu = await getCgu(locale)

	if (!content_website || !cgu) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			content_website: content_website.data,
			cgu: cgu.data,
		},
		revalidate: 10,
	}
}
