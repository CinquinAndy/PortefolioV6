import { getAbout, getContentWebsite } from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { Layout } from '@/components/Global/Layout'
import { HoloComponent } from '@/components/Global/Animations/HoloComponent'
import { localesConstant } from '@/services/localesConstant'

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export async function generateMetadata({ params }) {
	const { locale } = await params
	// fetch data
	const content_website = await getContentWebsite(locale)

	return {
		title:
			content_website?.data?.attributes?.content_about?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.data?.attributes?.content_about?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical:
				content_website?.data?.attributes?.content_about?.seo?.canonical || '/',
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/about`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/about`,
			},
		},
	}
}

export default async function Page({ params }) {
	const { locale } = await params
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data
	let about = await getAbout(locale)
	about = about?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_about?.seo?.h1}
			/>
			<div>
				<div className={'relative'}>
					<div
						className={
							'my-24 grid grid-cols-1 px-6 md:my-48 md:grid-cols-2 2xl:px-0'
						}
					>
						<div className={'flex w-full justify-center'}>
							<HoloComponent lang={locale} />
						</div>
						<div className="">
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout value={about?.attributes?.content.toString()} />
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
