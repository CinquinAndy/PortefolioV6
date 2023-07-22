import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'

export default function Document() {
	return (
		<Html lang="fr">
			<Head>
				<link rel="icon" href="/favicon.webp" />
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif+Display:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body
				className={
					'text-slate-50" relative bg-gradient-to-b from-indigo-1100 to-sky-1100'
				}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
