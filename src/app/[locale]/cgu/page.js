import { getCgu, getContentWebsite } from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { Layout } from '@/components/Global/Layout'
import { localesConstant } from '@/services/localesConstant'

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export async function generateMetadata({ params }) {
	// fetch data
	const content_website = await getContentWebsite(params.locale)

	return {
		title:
			content_website?.data?.attributes?.content_cgu?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.data?.attributes?.content_cgu?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical:
				content_website?.data?.attributes?.content_cgu?.seo?.canonical || '/',
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/cgu`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/cgu`,
			},
		},
	}
}

export default async function Page({ params }) {
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let cgu = await getCgu(params.locale)
	cgu = cgu?.data

	return (
		<>
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
