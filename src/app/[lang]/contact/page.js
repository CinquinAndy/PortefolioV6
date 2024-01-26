import { getContentWebsite } from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactForm } from '@/app/[lang]/contact/contactForm'

export async function generateMetadata({ params }) {
	// fetch data
	const content_website = await getContentWebsite(params.lang)

	return {
		title:
			content_website?.data?.attributes?.content_contact?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.data?.attributes?.content_contact?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical:
				content_website?.data?.attributes?.content_contact?.seo?.canonical ||
				'/',
			languages: {
				'en-US': '/',
				'fr-FR': 'https://andy-cinquin.fr',
			},
		},
	}
}

export default async function Page({ params }) {
	let content_website = await getContentWebsite(params.lang)
	content_website = content_website?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_contact?.seo?.h1}
			/>
			<ContactForm content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
