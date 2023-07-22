import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Document() {
	const [open, setOpen] = useState(false)
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
					'text-slate-50" relative bg-gradient-to-b from-indigo-950 to-sky-950'
				}
			>
				<header className="fixed left-0 top-0 z-50 mt-8 flex h-[40px] w-screen flex-row-reverse items-center justify-between px-4 xl:mt-0 xl:h-[80px] xl:flex-row xl:px-20">
					<div>
						<button
							id="btnNav"
							className={`${open ? 'opened' : ''} menu z-40`}
							onClick={() => setOpen(!open)}
							aria-label="Main Menu"
						>
							<svg
								className="z-30 h-8 w-8 xl:h-10 xl:w-10"
								viewBox="0 0 100 100"
								stroke="currentColor"
							>
								<path
									className="line line1"
									d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
								/>
								<path className="line line2" d="M 20,50 H 80" />
								<path
									className="line line3"
									d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
								/>
							</svg>
						</button>
					</div>
					<Link href="/" className="h-8 w-8 xl:h-10 xl:w-10">
						<Image
							src="/icons/logov2.svg"
							alt="Logo Cinquin Andy Signature"
							width={20}
							height={20}
						/>
					</Link>
					<Link
						href="/contact"
						className="button-animated smoke font-body hidden text-sm xl:block"
					>
						<h2>CONTACT</h2>
					</Link>
				</header>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
