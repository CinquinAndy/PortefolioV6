import { getCgu, getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import { Layout } from '@/components/Global/Layout'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

export async function generateMetadata({ params }) {
	const { locale } = await params
	// fetch data
	const content_website = await getContentWebsite(locale)

	return {
		alternates: {
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/cgu`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/cgu`,
			},
			canonical:
				content_website?.data?.attributes?.content_cgu?.seo?.canonical || '/',
		},
		description:
			content_website?.data?.attributes?.content_cgu?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		title:
			content_website?.data?.attributes?.content_cgu?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
	}
}

export async function generateStaticParams() {
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export default async function Page({ params }) {
	const { locale } = await params
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data
	let cgu = await getCgu(locale)
	cgu = cgu?.data

	return (
		<>
			<Nav
				content_website={content_website}
				h1={content_website?.attributes?.content_cgu?.seo?.h1}
				isHome={false}
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
