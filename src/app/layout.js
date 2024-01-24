import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/distorsions.css'
import '@/styles/main.css'
import '@/styles/nav.css'
import 'react-toastify/dist/ReactToastify.css'

import {Be_Vietnam_Pro, Noto_Serif} from 'next/font/google'
import Head from 'next/head'
import {ToastContainer} from 'react-toastify'
import Script from "next/script";
import {Html, Main, NextScript} from "next/document";

const be_vietnam_pro = Be_Vietnam_Pro({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-be-vietnam-pro',
    style: ['normal', 'italic'],
})

const noto_serif = Noto_Serif({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-noto-serif',
    style: ['normal', 'italic'],
})

export async function generateMetadata() {
    // fetch data
    const content_website = await getAllContentWebsite()

    return {
        title:
            content_website?.metadata_title ||
            'Andy Cinquin - Entrepreneur & Développeur Freelance',
        description:
            content_website?.metadata_description ||
            "Portefolio professionnel de Andy Cinquin, développeur informatique Freelance, Nantes et alentours. Développement sur-mesure, web, applicatifs",
        metadataBase: new URL(`https://andy-cinquin.fr`),
        alternates: {
            canonical: '/',
            languages: {
                'fr-FR': '/',
                'en-US': 'https://andy-cinquin.com',
            },
        },
    }
}


export default async function RootLayout({ children }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href={`${process.env.NEXT_PUBLIC_URL}/favicon.webp`}/>
                <Script
                    strategy={'afterInteractive'}
                    src="https://www.googletagmanager.com/gtag/js?id=UA-150969790-2"
                />
                <Script id={'analytics'} strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-150969790-2');
                    `}
                </Script>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={'true'}
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif+Display:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Html>
                <body
                    className={`relative bg-gradient-to-b from-indigo-1100 to-sky-1100 text-slate-50`}
                >
                <Main/>
                <NextScript/>
                <ToastContainer/>
                </body>
            </Html>
        </>
    )
}
