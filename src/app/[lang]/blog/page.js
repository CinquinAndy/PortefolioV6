import { getCgu, getContentWebsite } from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { Layout } from '@/components/Global/Layout'
import Articles from '@/components/Global/Articles'

export async function generateMetadata({ params }) {
	// fetch data
	const content_website = await getContentWebsite(params.lang)

	return {
		title:
			content_website?.data?.attributes?.content_blog?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.data?.attributes?.content_blog?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical:
				content_website?.data?.attributes?.content_blog?.seo?.canonical || '/',
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
	let cgu = await getCgu(params.lang)
	cgu = cgu?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_blog?.seo?.h1}
			/>
			<div>
				<Articles
					content_website={content_website}
					articles={articles}
					slice={false}
					isHome={true}
				/>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}

// import React from 'react'
// import Head from 'next/head'
// import Nav from '@/components/Global/Nav'
// import Cta from '@/components/Global/Cta'
// import Footer from '@/components/Global/Footer'
// import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
// import Articles from '@/components/Global/Articles'
// import { useRouter } from 'next/router'
//
// function Blog({ content_website, articles }) {
//     const router = useRouter()
//     const { locale } = router
//     return (
//         <>
//             <Head>
//                 <title>{content_website?.attributes?.content_blog?.seo?.title}</title>
//                 <meta
//                     name="description"
//                     content={content_website?.attributes?.content_blog?.seo?.description}
//                 />
//                 {/*	seo tag canonical link */}
//                 <link
//                     rel="canonical"
//                     href={content_website?.attributes?.content_blog?.seo?.canonical}
//                 />
//                 <link
//                     rel="alternate"
//                     href={content_website?.attributes?.content_blog?.seo?.canonical}
//                     hrefLang={locale}
//                 />
//             </Head>
//
//             <Nav
//                 content_website={content_website}
//                 isHome={false}
//                 h1={content_website?.attributes?.content_blog?.seo?.h1}
//             />
//             <div>
//                 <Articles
//                     content_website={content_website}
//                     articles={articles}
//                     slice={false}
//                     isHome={true}
//                 />
//                 <Cta content_website={content_website} />
//             </div>
//             <Footer content_website={content_website} />
//         </>
//     )
// }
//
// export async function getStaticProps({ locale }) {
//     const content_website = await getContentWebsite(locale)
//     const articles = await getArticles(locale)
//
//     if (!content_website || !articles) {
//         return {
//             notFound: true,
//         }
//     }
//
//     return {
//         props: {
//             content_website: content_website.data,
//             articles: articles.data,
//         },
//         revalidate: 10,
//     }
// }
//
// export default Blog
