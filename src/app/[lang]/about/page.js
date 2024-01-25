import {getAbout, getArticles, getContentWebsite, getRealisations, getServices} from "@/services/getContentWebsite";
import Nav from "@/components/Global/Nav";
import Image from "next/image";
import Services from "@/components/Global/Services";
import Realisations from "@/components/Global/Realisations";
import Articles from "@/components/Global/Articles";
import Cta from "@/components/Global/Cta";
import Footer from "@/components/Global/Footer";
import {Layout} from "@/components/Global/Layout";

export async function generateMetadata({params}) {
    // fetch data
    const content_website = await getContentWebsite(params.lang)

    return {
        title:
            content_website?.data?.attributes?.content_about?.seo?.title ||
            'Andy Cinquin - Freelance Entrepreneur & Developer',
        description:
            content_website?.data?.attributes?.content_about?.seo?.description ||
            "Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications",
        metadataBase: new URL(`https://andy-cinquin.com`),
        alternates: {
            canonical: content_website?.data?.attributes?.content_about?.seo?.canonical || '/',
            languages: {
                'en-US': '/',
                'fr-FR': 'https://andy-cinquin.fr',
            },
        },
    }
}

export default async function Page({params}) {
    let content_website = await getContentWebsite(params.lang)
    content_website = content_website?.data
    let about = await getAbout(params.lang)
    about = about?.data

    return <>
        <Nav
            content_website={content_website}
            isHome={false}
            h1={content_website?.attributes?.content_about?.seo?.h1}
        />
        <div>
            <div className={'relative'}>
                <div className={'my-24 grid grid-cols-1 px-6 md:my-48 2xl:px-0'}>
                    <div className="mx-auto max-w-3xl">
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
}

// import Head from 'next/head'
// import Nav from '@/components/Global/Nav'
// import Footer from '@/components/Global/Footer'
// import React from 'react'
// import Cta from '@/components/Global/Cta'
// import {
//     getAbout,
//     getCgu,
//     getContentWebsite,
// } from '@/services/getContentWebsite'
// import { Layout } from '@/components/Global/Layout'
// import { useRouter } from 'next/router'
//
// export default function About({ content_website, about }) {
//     const router = useRouter()
//     const { locale } = router
//     return (
//         <>
//             <Head>
//                 <title>{content_website?.attributes?.content_about?.seo?.title}</title>
//                 <meta
//                     name="description"
//                     content={content_website?.attributes?.content_about?.seo?.description}
//                 />
//                 {/*	seo tag canonical link */}
//                 <link
//                     rel="canonical"
//                     href={content_website?.attributes?.content_about?.seo?.canonical}
//                 />
//                 <link
//                     rel="alternate"
//                     href={content_website?.attributes?.content_about?.seo?.canonical}
//                     hrefLang={locale}
//                 />
//             </Head>
//
//             <Nav
//                 content_website={content_website}
//                 isHome={false}
//                 h1={content_website?.attributes?.content_about?.seo?.h1}
//             />
//             <div>
//                 <div className={'relative'}>
//                     <div className={'my-24 grid grid-cols-1 px-6 md:my-48 2xl:px-0'}>
//                         <div className="mx-auto max-w-3xl">
//                             <article>
//                                 <div className={'prose prose-invert my-8'}>
//                                     <Layout value={about?.attributes?.content.toString()} />
//                                 </div>
//                             </article>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <Cta content_website={content_website} />
//
//             <Footer content_website={content_website} />
//         </>
//     )
// }
//
// export async function getStaticProps({ locale }) {
//     const content_website = await getContentWebsite(locale)
//     const about = await getAbout(locale)
//
//     if (!content_website || !about) {
//         return {
//             notFound: true,
//         }
//     }
//
//     return {
//         props: {
//             content_website: content_website.data,
//             about: about.data,
//         },
//         revalidate: 10,
//     }
// }
