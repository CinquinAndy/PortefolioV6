import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React, {Suspense} from 'react'
import Services from '@/components/Global/Services'
import Cta from '@/components/Global/Cta'
import Realisations from '@/components/Global/Realisations'
import {
    getArticles,
    getContentWebsite,
    getRealisations,
    getServices,
} from '@/services/getContentWebsite'
import Articles from '@/components/Global/Articles'
import {useRouter} from 'next/router'
import Image from 'next/image'

export default function Home({
                                 content_website,
                                 services,
                                 realisations,
                                 articles,
                             }) {
    const router = useRouter()
    const {locale} = router
    return (
        <>
            <Head>
                <title>{content_website?.attributes?.content_home?.seo?.title}</title>
                <meta
                    name="description"
                    content={content_website?.attributes?.content_home?.seo?.description}
                />
                {/*	seo tag canonical link */}
                <link
                    rel="canonical"
                    href={content_website?.attributes?.content_home?.seo?.canonical}
                />
                <link
                    rel="alternate"
                    href={content_website?.attributes?.content_home?.seo?.canonical}
                    hrefLang={locale}
                />
            </Head>

            <Nav content_website={content_website}/>

            <div className={"w-screen h-screen absolute top-0 left-0 -z-10 mask"}>
                <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center mask">
                    <div className="video-background relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0 mask">
                        <Image
                            src={'/assets/images/bg_opti.webp'}
                            alt={'bg_opti'}
                            className={
                                'absolute left-0 top-0 blur-md  ' +
                                'mix-difference -z-10 block bg-slate-900 object-cover opacity-75 mask  '
                            }
                            quality={10}
                            fill={true}
                            loading="eager"
                        />

                        <iframe
                            title="video"
                            className={
                                'absolute left-0 top-0 h-full w-full object-cover object-center mask ' +
                                'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'
                            }
                            id="topHeroVideo"
                            src="https://player.vimeo.com/video/905713566?background=1"
                            width="1920"
                            height="1080"
                            frameBorder="0"
                            allow="autoplay"
                            data-ready="true"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>

            <div className={"relative"}>
                <Services content_website={content_website} services={services}/>
                <Realisations
                    content_website={content_website}
                    realisations={realisations}
                    slice={3}
                    isHome={true}
                />
                <Articles
                    content_website={content_website}
                    articles={articles}
                    slice={3}
                    isHome={true}
                ></Articles>
                <Cta content_website={content_website}/>
            </div>
            <Footer content_website={content_website}/>
        </>
    )
}

export async function getStaticProps({locale}) {
    const content_website = await getContentWebsite(locale)
    const services = await getServices(locale)
    const realisations = await getRealisations(locale)
    const articles = await getArticles(locale)

    if (!content_website || !services || !realisations || !articles) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            content_website: content_website.data,
            services: services.data,
            realisations: realisations.data,
            articles: articles.data,
        },
        revalidate: 10,
    }
}
