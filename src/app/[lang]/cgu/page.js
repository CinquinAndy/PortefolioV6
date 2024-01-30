import {getCgu, getContentWebsite} from "@/services/getContentWebsite";
import Nav from "@/components/Global/Nav";
import Cta from "@/components/Global/Cta";
import Footer from "@/components/Global/Footer";
import {Layout} from "@/components/Global/Layout";

export async function generateMetadata({params}) {
    // fetch data
    const content_website = await getContentWebsite(params.lang)

    return {
        title:
            content_website?.data?.attributes?.content_cgu?.seo?.title ||
            'Andy Cinquin - Freelance Entrepreneur & Developer',
        description:
            content_website?.data?.attributes?.content_cgu?.seo?.description ||
            "Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications",
        metadataBase: new URL(`https://andy-cinquin.com`),
        alternates: {
            canonical: content_website?.data?.attributes?.content_cgu?.seo?.canonical || '/',
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
    let cgu = await getCgu(params.lang)
    cgu = cgu?.data

    return <>
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
}
