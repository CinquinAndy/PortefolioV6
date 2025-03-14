import { getContentWebsite } from '@/services/getContentWebsite'
import { ContactForm } from '@/components/Global/ContactForm'
import { localesConstant } from '@/services/localesConstant'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'

export async function generateMetadata({ params }) {
	const { locale } = await params
	// fetch data
	const content_website = await getContentWebsite(locale)

	return {
		alternates: {
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/contact`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/contact`,
			},
			canonical:
				content_website?.data?.attributes?.content_contact?.seo?.canonical ||
				'/',
		},
		description:
			content_website?.data?.attributes?.content_contact?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		title:
			content_website?.data?.attributes?.content_contact?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
	}
}

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export default async function Page({ params }) {
	const { locale } = await params
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data

	return (
		<>
			<Nav
				content_website={content_website}
				h1={content_website?.attributes?.content_contact?.seo?.h1}
				isHome={false}
			/>
			<ContactForm content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
