import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getContentWebsite, getNotFound } from '@/services/getContentWebsite'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Global/Layout'
import Footer from '@/components/Global/Footer'

function Custom404({ content_website, notfound }) {
    const router = useRouter()
    const { locale } = router
    return (
        <>
            <Head>
                <title>
                    {content_website?.attributes?.content_notfound?.seo?.title}
                </title>
                <meta
                    name="description"
                    content={
                        content_website?.attributes?.content_notfound?.seo?.description
                    }
                />
                {/*	seo tag canonical link */}
                <link
                    rel="canonical"
                    href={content_website?.attributes?.content_notfound?.seo?.canonical}
                />
                <link
                    rel="alternate"
                    href={content_website?.attributes?.content_notfound?.seo?.canonical}
                    hrefLang={locale}
                />
            </Head>

            <div className="h-screen">
                <div className="flex h-full items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
                    <div className="">
                        <Link href={'/'}>
                            <Image
                                alt="Logo Andy Cinquin"
                                width={50}
                                height={50}
                                src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/logov2.svg`}
                            />
                        </Link>
                        <div className={'mt-8'}>
                            <h1 className={'my-8 text-2xl font-semibold text-slate-50'}>
                                {content_website?.attributes?.content_notfound?.seo?.h1 ??
                                    '404 Not Found'}
                            </h1>
                            <div className="mx-auto max-w-3xl">
                                <article>
                                    <div className={'prose prose-invert my-8'}>
                                        <Layout value={notfound?.attributes?.content.toString()} />
                                    </div>
                                </article>
                            </div>

                            <Link
                                href={notfound?.attributes?.link?.url}
                                className="mt-8 text-slate-50 underline"
                            >
                                {notfound?.attributes?.link?.label}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer content_website={content_website} />
        </>
    )
}

export async function getStaticProps({ locale }) {
    const content_website = await getContentWebsite(locale)
    const notfound = await getNotFound(locale)

    if (!content_website || !notfound) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            content_website: content_website.data,
            notfound: notfound.data,
        },
        revalidate: 10,
    }
}

export default Custom404
