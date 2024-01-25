import {getArticles, getContentWebsite, getRealisations, getServices} from "@/services/getContentWebsite";
import Nav from "@/components/Global/Nav";
import Image from "next/image";
import Services from "@/components/Global/Services";
import Realisations from "@/components/Global/Realisations";
import Articles from "@/components/Global/Articles";
import Cta from "@/components/Global/Cta";
import Footer from "@/components/Global/Footer";

export async function generateMetadata({params}) {
    // fetch data
    let content_website = await getContentWebsite(params.lang)
    content_website = content_website?.data;

    return {
        title:
            content_website?.attributes?.content_home?.seo?.title ||
            'Andy Cinquin - Freelance Entrepreneur & Developer',
        description:
            content_website?.attributes?.content_home?.seo?.description ||
            "Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications",
        metadataBase: new URL(`https://andy-cinquin.fr`),
        alternates: {
            canonical: content_website?.attributes?.content_home?.seo?.canonical || '/',
            languages: {
                'fr-FR': '/',
                'en-US': 'https://andy-cinquin.com',
            },
        },
    }
}

export default async function Page({params}) {
    let content_website = await getContentWebsite(params.lang)
    content_website = content_website?.data;
    let services = await getServices(params.lang)
    services = services?.data;
    let realisations = await getRealisations(params.lang)
    realisations = realisations?.data;
    let articles = await getArticles(params.lang)
    articles = articles?.data;

    return <>
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
}