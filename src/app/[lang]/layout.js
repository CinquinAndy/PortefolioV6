export async function generateStaticParams() {
    return [{lang: 'en'}, {lang: 'fr'}]
}

export default function RootLayout({children, params}) {
    console.log("inside server", params.lang);
    return (
        <html lang={`en`}>
        {/*<ToastContainer/>*/}
            <body>{params.lang} -- {children}</body>
        </html>
    )
}


// import { Head, Html, Main, NextScript } from 'next/document'
// import Script from 'next/script'

// export default function Document() {
//     return (
//         <Html>
//             <Head>
//                 <link rel="icon" href={`${process.env.NEXT_PUBLIC_URL}/favicon.webp`} />
//                 <Script
//                     strategy={'afterInteractive'}
//                     src="https://www.googletagmanager.com/gtag/js?id=UA-150969790-2"
//                 />
//                 <Script id={'analytics'} strategy="afterInteractive">
//                     {`
//                         window.dataLayer = window.dataLayer || [];
//                         function gtag(){dataLayer.push(arguments);}
//                         gtag('js', new Date());
//
//                         gtag('config', 'UA-150969790-2');
//                     `}
//                 </Script>
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link
//                     rel="preconnect"
//                     href="https://fonts.gstatic.com"
//                     crossOrigin={'true'}
//                 />
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif+Display:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>
//             {/* if the page is 404 then, set overflow to hidden */}
//             <body
//                 // className={`relative bg-gradient-to-b from-indigo-1100 to-sky-1100 text-slate-50`}
//                 className={`relative text-slate-50`}
//             >
//             <div className="gradient-bg">
//                 <svg xmlns="http://www.w3.org/2000/svg" className={"gradient_svg"}>
//                     <defs>
//                         <filter id="goo">
//                             <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
//                             <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"/>
//                             <feBlend in="SourceGraphic" in2="goo"/>
//                         </filter>
//                     </defs>
//                 </svg>
//                 <div className="gradients-container">
//                     <div className="g1"></div>
//                     <div className="g2"></div>
//                     <div className="g3"></div>
//                     <div className="g4"></div>
//                     <div className="g5"></div>
//                 </div>
//             </div>
//             <Main/>
//             <NextScript/>
//             </body>
//         </Html>
//     )
// }
