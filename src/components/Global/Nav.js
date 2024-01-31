'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { TypeAnimation } from 'react-type-animation'

function Nav({ content_website, selectedMenu, h1, isHome = true }) {
	const [open, setOpen] = useState(false)
	const [linkToSwitchLanguage, setLinkToSwitchLanguage] = useState('')
	const pathname = usePathname()

	content_website = content_website.attributes
	const menu = content_website.menu
	const socials = content_website.socials

	useEffect(() => {
		setLinkToSwitchLanguage(
			window.location.origin === 'https://andy-cinquin.fr'
				? `https://andy-cinquin.com${pathname}`
				: `https://andy-cinquin.fr${pathname}`
		)
		console.log('window.location.origin', window.location.origin)
		console.log('process.env.NEXT_PUBLIC_URL', process.env.NEXT_PUBLIC_URL)
		console.log(
			'process.env.NEXT_PUBLIC_URL_ALT/path',
			`${process.env.NEXT_PUBLIC_URL_ALT}${pathname}`
		)
		console.log(
			'process.env.NEXT_PUBLIC_URL/path',
			`${process.env.NEXT_PUBLIC_URL}${pathname}`
		)
	}, [pathname])

	return (
		<>
			<header
				className={`${!open ? 'sticky' : 'fixed'} left-0 top-0 z-50 mt-8 flex h-[40px] w-full flex-row-reverse items-center justify-between px-4 md:mt-0 md:h-[80px] md:flex-row md:px-20`}
			>
				<div>
					<button
						id="btnNav"
						className={`${open ? 'opened' : ''} menu z-40`}
						onClick={() => setOpen(!open)}
						aria-label="Main Menu"
					>
						<svg
							className="z-30 h-8 w-8 md:h-10 md:w-10"
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
				{!open && (
					<>
						<Link href="/" className="h-8 w-8 md:h-10 md:w-10">
							<Image
								src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/logov2.svg`}
								alt="Logo Cinquin Andy Signature"
								width={35}
								height={35}
							/>
						</Link>

						<Link
							href={'/contact'}
							className="button-animated smoke hidden font-body text-sm md:block"
						>
							<h2>
								<div>
									<span>C</span>
									<span>O</span>
									<span>N</span>
									<span>T</span>
									<span>A</span>
									<span>C</span>
									<span>T</span>
								</div>
							</h2>
						</Link>
					</>
				)}
			</header>
			<nav
				id="nav-block"
				className={`${!open ? 'pointer-events-none -z-10 -translate-y-[100vh] opacity-0' : 'pointer-events-auto z-40 -translate-y-0 opacity-100'} fixed flex h-screen w-screen transform transition-transform`}
			>
				<div className="md:gap-18 flex h-full w-full flex-col justify-around gap-12 border-r-0 border-slate-50 border-opacity-10 bg-gradient-to-b from-indigo-1100 to-sky-1100 p-4 pt-28 md:w-3/5 md:border-r-40 md:p-20 md:pt-36">
					{menu.map((item, index) => {
						return selectedMenu === item?.Link?.url ? (
							<Link
								className="relative text-indigo-400"
								href={item?.Link?.url}
								rel="noopener"
							>
								<svg
									className="absolute left-0 top-1/2 h-8 w-8 -translate-x-[50px] -translate-y-1/2 transform md:h-10 md:w-10"
									viewBox="0 0 156 156"
									fill="currentColor"
								>
									<path
										d="m123.52 69.33c-1.23-1.24-10.45-5.53-26.62-12.4-24-10.2-35.08-14.64-36.55-14.64-.79 0-1.79.41-2.26.92-.77.84-.73 1.76.45 10.9.71 5.52 1.29 10.02 1.29 10.08 0 .36-11.24 2.52-18.33 3.52-6.88.96-8.76 1.41-9.37 2.2-.78 1.04-.69 5.2.38 17.38.26 2.99.35 6.1.19 6.96-.26 1.37-.11 1.59 1.18 1.92.81.2 5.25-.02 9.87-.5 13.86-1.43 19.16-1.65 19.41-.81.12.4.62 4.52 1.09 9.14.61 5.93 1.1 8.63 1.65 9.19.71.71.85.71 1.42-.03.35-.46 1-.74 1.47-.64 1.01.2 8.51-4.69 15.17-9.91 11.4-8.92 18.79-14.35 27.73-20.34 5.15-3.46 10.14-7 11.03-7.83 1.9-1.77 2.2-3.71.8-5.11zm-5.52 3.84c-2 1.26-2.48 1.12-2.14-.63.27-1.42 1.64-2 2.98-1.27 1.13.62 1.1.67-.84 1.9zm-5.64 3.78c-.3 0-.62-.21-.81-.53-.18-.3.03-.52.5-.52s.81.22.81.52c0 .32-.2.53-.5.53zm-12.92 5.8c-1.57-.59-6.22-1.92-10.32-2.94-13.39-3.35-24.05-6.99-24.05-8.22 0-.29.34-.4.76-.24s1.65.45 2.76.65c1.1.21 4.78 1.41 8.19 2.68 9.5 3.55 25.62 8.04 26.73 7.45 1.98-1.05 1.1-2.4-2.52-3.84-3.54-1.41-18.38-5.72-25.42-7.37-4.46-1.05-11.03-4.21-11.03-5.32 0-.49.39-.66 1.18-.5.65.13 2.6.51 4.33.84 1.75.33 5.72 1.66 8.93 2.98 6.86 2.83 15.65 5.83 23.63 8.07 3.2.9 5.97 1.74 6.22 1.89.25.14-1.1 1.3-3.05 2.6l-3.49 2.34zm-2.68 5.12c-1.94 1.5-2.21 1.58-2.42.74-.16-.65-1.29-1.23-3.6-1.85-8.45-2.27-24.63-7.88-24.63-8.55 0-.42.2-.73.47-.73 3.1 0 33.45 7.8 32.72 8.41-.2.17-1.33 1.05-2.54 1.98zm-6.25 4.31c-.3 0-5.65-1.65-11.89-3.66-10.03-3.24-12.6-4.42-11.66-5.37.34-.34 9.08 1.71 19.01 4.45l8.03 2.21-1.47 1.19c-.78.63-1.72 1.18-2.02 1.18zm-8.11-25.82c-5.62-1.45-13.1-4.58-15.49-6.48-.99-.79-.95-.82.68-.5.96.19 3.41 1.11 5.51 2.07 2.08.96 6.43 2.75 9.69 3.99 3.25 1.25 5.85 2.31 5.77 2.36-.06.07-2.85-.59-6.16-1.44zm.47 31.91c-4.25 3.18-4.84 3.47-5.3 2.65-.29-.51-1.02-1.13-1.65-1.39-.76-.32-.32-.37 1.36-.16 2.05.26 2.55.15 2.82-.58.49-1.32-.64-2.16-5.32-3.92-5.21-1.97-4.57-2.04 2.63-.32 3.1.74 5.97 1.21 6.41 1.04 1.29-.5.47-1.55-2-2.55-1.26-.51-1.71-.81-1-.66 4.73.98 6.83 1.56 6.83 1.88 0 .25-2.15 2.04-4.78 4.01zm-2.73-40.81c-2.68-.74-13.05-5.74-11.13-5.37 1.68.33 13.51 5.46 13.23 5.75-.08.08-1.05-.09-2.1-.38zm-2.05 34.56c-.43-.17-.31-.28.32-.32.52-.03.85.1.68.26-.17.18-.63.2-1 .06zm-5.9 14.2c-2.15 1.52-4.04 2.76-4.2 2.76s-.29-.44-.29-.97c0-.73.32-.91 1.26-.74 1.52.28 2.67-1.39 2.29-3.33-.23-1.19-.11-1.26 2.3-1.26 1.42 0 2.55.17 2.55.39s-1.76 1.64-3.91 3.15zm-2.89-5.64c-.3 0-.62-.21-.81-.52-.18-.3.03-.53.5-.53s.81.22.81.53-.2.52-.5.52zm-4.76-38.33c-.3 0-.52-.24-.52-.55 0-.32.22-.42.52-.24.32.19.53.41.53.55s-.21.24-.53.24zm-5.06 11.1c-.79-.44-.81-.55-.13-.58.89-.03 1.68.53 1.3.92-.11.12-.65-.04-1.17-.34zm-.45-3.76c-.42 0-.79-.1-.79-.21s.37-.35.79-.5.79-.06.79.21-.37.5-.79.5zm-10.29 7.36c-5.78-2.16-8.6-3.59-8.09-4.1.87-.87 14.96 5.2 14.16 6.09-.1.12-2.81-.77-6.07-1.99zm3.65-2.81c-1.1-.48-1.41-.78-.81-.81 1.05-.05 3.2.94 2.84 1.31-.15.14-1.09-.09-2.03-.5zm-7.61 17.49c-.62.01-2.15-.56-3.41-1.29-2.2-1.27-2.23-1.31-.76-1.31.84 0 2.81.4 4.39.89 2.2.69 2.64.98 1.89 1.29-.56.22-1.48.4-2.11.42zm-.71-4.71c-2-.53-6.3-2.82-6.3-3.35 0-.12.53-.09 1.21.07 1.42.32 7.72 3.47 7.46 3.72-.1.07-1.17-.12-2.37-.44zm-.79-4.81c-2.21-.6-5.23-2.48-4.77-2.96.14-.14 1.78.53 3.67 1.52s3.35 1.83 3.28 1.89-1.08-.15-2.18-.45zm-1.63-4.55c-1.07-.62-.74-.79.58-.3.47.18.74.43.6.58-.13.15-.65.02-1.18-.28z"
										opacity=".9"
									/>
								</svg>
								<h2 className="text-xl font-semibold uppercase md:text-3xl">
									{menu?.Link?.label}
								</h2>
							</Link>
						) : (
							<Link
								key={index}
								className="hover:text-indigo-400"
								href={item?.Link?.url}
								rel="noopener"
							>
								<h2 className="text-xl font-semibold uppercase md:text-3xl">
									{item?.Link?.label}
								</h2>
							</Link>
						)
					})}
					<div>
						<hr className="mb-20 w-32 border opacity-75 md:mb-10 md:w-10" />
						<div className="flex">
							<div className="flex items-center justify-evenly gap-10">
								<Link
									className="text-indigo-500 hover:text-slate-50"
									href={socials?.facebook}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg
										className="h-5 w-5 md:h-7 md:w-7"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z" />
									</svg>
								</Link>
								<Link
									className="text-indigo-500 hover:text-slate-50"
									href={socials?.instagram}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg
										className="h-5 w-5 md:h-7 md:w-7"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z" />
										<path d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z" />
										<circle cx="18.406" cy="5.595" r="1.439" />
									</svg>
								</Link>
								<Link
									className="text-indigo-500 hover:text-slate-50"
									href={socials?.linkedin}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg
										className="h-5 w-5 md:h-7 md:w-7"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z" />
										<path d="m.396 7.977h4.976v16.023h-4.976z" />
										<path d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z" />
									</svg>
								</Link>
								<Link
									className="text-indigo-500 hover:text-slate-50"
									href={socials?.github}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg
										className="h-5 w-5 md:h-7 md:w-7"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="m12.29 21.499c3.73 0 8.94.09 10.835-3.701.715-1.449.875-3.122.875-4.7h-.001c0-2.073-.575-4.047-1.95-5.651.255-.766.385-1.573.385-2.385 0-1.064-.24-1.598-.73-2.563-2.24 0-3.69.42-5.39 1.742-1.31-.311-2.67-.455-4.02-.455-1.495 0-2.986.154-4.435.495-1.725-1.336-3.175-1.781-5.44-1.781-.484.965-.729 1.499-.729 2.563 0 .811.125 1.632.385 2.414-1.38 1.589-2.075 3.548-2.075 5.621 0 1.578.281 3.266 1.01 4.701 1.97 3.835 7.49 3.7 11.28 3.7zm-5.289-9.99c.95 0 1.865.168 2.8.297 3.418.52 5.215-.297 7.31-.297 2.339 0 3.675 1.915 3.675 4.087 0 4.349-4.015 5.012-7.53 5.012h-2.41c-3.5 0-7.52-.667-7.52-5.012 0-2.172 1.334-4.087 3.675-4.087z" />
										<path d="m16.655 18.323c1.29 0 1.835-1.692 1.835-2.727s-.545-2.727-1.835-2.727-1.835 1.692-1.835 2.727.545 2.727 1.835 2.727z" />
										<path d="m7.47 18.323c1.29 0 1.835-1.692 1.835-2.727s-.546-2.726-1.835-2.726-1.835 1.692-1.835 2.727.545 2.726 1.835 2.726z" />
									</svg>
								</Link>
								{/*// <!--        Malt -->*/}
								<Link
									className="text-indigo-500 hover:text-slate-50"
									href={socials?.malt}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg
										className="h-5 w-5 md:h-7 md:w-7"
										viewBox="0 0 1000 1000"
										fill="currentColor"
									>
										<path
											d="M855.8,144.4c-75.3-75.3-156.2-26.7-206.4,23.9L172.5,644.8c-50.6,50.6-103.2,127.1-23.9,206.4
		c79.3,79.3,156.2,26.7,206.4-23.9l476.5-476.5C882.5,300.2,931.1,219.7,855.8,144.4z"
										/>
										<path
											d="M400.4,124.9l100.8,100.8L604,122.9c7.2-7.2,13.9-13.5,21.1-19.5C614.3,49.2,583.3,0.2,501.2,0.2
		c-82.5,0-113.1,49.4-123.9,103.6C384.9,110.2,392.4,116.9,400.4,124.9z"
										/>
										<path
											d="M604,874.3L501.2,771.5L400.4,872.7c-7.6,7.6-15.1,14.7-22.7,21.1c11.6,55.4,44.2,106,123.5,106
		c79.7,0,112.4-51,123.9-106.4C617.9,887.5,610.8,881.5,604,874.3z"
										/>
										<path d="M357.4,369.5H162.9C91.6,369.5,0,391.8,0,498.6C0,578.3,51,611,106.4,622.5C113.1,614.9,357.4,369.5,357.4,369.5z" />
										<path d="M896.4,374.7c-6,7.2-251,253.4-251,253.4h191.6c71.3,0,162.9-16.7,162.9-129.1C1000,416.1,950.6,385.5,896.4,374.7z" />
										<path
											d="M421.1,305.4l34.7-34.7L355,169.9C304.4,119.3,227.9,66.7,148.6,146c-58.2,58.2-45.4,114.7-14.3,161
		C143.8,306.2,421.1,305.4,421.1,305.4z"
										/>
										<path
											d="M581.3,691.8l-34.7,34.7l102.8,102.8c50.6,50.6,131.1,99.2,206.4,23.9c56.2-56.2,43.4-115.5,12.4-162.9
		C857.8,691,581.3,691.8,581.3,691.8z"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
					<div></div>
					<div className="flex flex-col gap-2 text-xs text-slate-300">
						<p className="font-body normal-case">
							{content_website?.contact?.address}
						</p>
						<Link
							className="font-body normal-case underline"
							href={`tel:${(content_website?.contact?.phone ?? '')
								.toString()
								.replace(/\s+/g, '')}`}
						>
							{content_website?.contact?.phone}
						</Link>
						<div>
							<Link
								href={linkToSwitchLanguage}
								className="font-body normal-case underline"
							>
								{content_website?.contact?.langage}
							</Link>
						</div>
					</div>
					<div className="block md:hidden"></div>
				</div>
				<input
					type={'button'}
					id="nav-right"
					aria-label="Close Menu"
					onClick={() => setOpen(!open)}
					className="hidden h-full w-3/5 bg-black bg-opacity-90 md:block"
				/>
			</nav>
			<div
				className={`${isHome ? 'h-[calc(100vh-80px)]' : 'h-auto pt-[30vh] 2xl:pt-[40vh]'} relative flex w-screen items-center justify-center`}
			>
				{isHome && (
					<div className="patterns translate-y-[-140px] transform md:px-20">
						<svg width="100%" height="100%">
							<defs>
								<pattern
									id="polka-dots"
									x="0"
									y="0"
									width="100"
									height="100"
									patternUnits="userSpaceOnUse"
								>
									<circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
								</pattern>
							</defs>
							<text
								x="50%"
								y="60%"
								textAnchor="middle"
								className={
									'text-2xl font-semibold uppercase tracking-widest md:text-5xl lg:text-8xl'
								}
							>
								{content_website?.content_home?.title_home}
							</text>
						</svg>
					</div>
				)}
				<h1
					className={`${isHome ? 'sr-only' : ''} z-20 px-20 text-center text-2xl font-semibold uppercase tracking-widest md:text-5xl lg:text-8xl`}
				>
					{isHome ? content_website?.content_home?.title_home : h1}
				</h1>
				{!isHome && (
					<div
						className={`${isHome ? 'top-1/2' : 'top-[70%] lg:top-1/2 2xl:top-[60%]'} absolute left-1/2 -z-10 flex w-3/5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-start`}
					>
						<Image
							width={450}
							height={450}
							src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/LogoCinquinAndy.svg`}
							alt="Développeur Freelance - Logo"
							className="mb-32 ml-16 h-112 w-112 -rotate-12 opacity-20 brightness-75"
							loading={'eager'}
						/>
					</div>
				)}
				<div
					className={`${isHome ? 'flex' : 'hidden'} absolute bottom-0 right-0 mb-14 flex-col items-center justify-evenly gap-8 p-4 md:mb-0 md:gap-10 md:p-20`}
				>
					<div className={'relative p-3'}>
						<Link
							className="slider-nav-item text-slate-300 hover:text-slate-50"
							href={socials?.facebook}
							rel="noopener nofollow noreferrer"
							target="_blank"
						>
							<svg
								className="h-5 w-5 md:h-7 md:w-7"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z" />
							</svg>
						</Link>
					</div>
					<div className={'relative p-3'}>
						<Link
							className="slider-nav-item text-slate-300 hover:text-slate-50"
							href={socials?.instagram}
							rel="noopener nofollow noreferrer"
							target="_blank"
						>
							<svg
								className="h-5 w-5 md:h-7 md:w-7"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z" />
								<path d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z" />
								<circle cx="18.406" cy="5.595" r="1.439" />
							</svg>
						</Link>
					</div>
					<div className={'relative p-3'}>
						<Link
							className="slider-nav-item text-slate-300 hover:text-slate-50"
							href={socials?.linkedin}
							rel="noopener nofollow noreferrer"
							target="_blank"
						>
							<svg
								className="h-5 w-5 md:h-7 md:w-7"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z" />
								<path d="m.396 7.977h4.976v16.023h-4.976z" />
								<path d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z" />
							</svg>
						</Link>
					</div>
					<div className={'relative p-3'}>
						<Link
							className="slider-nav-item text-slate-300 hover:text-slate-50"
							href={socials?.github}
							rel="noopener nofollow noreferrer"
							target="_blank"
						>
							<svg
								className="h-5 w-5 md:h-7 md:w-7"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="m12.29 21.499c3.73 0 8.94.09 10.835-3.701.715-1.449.875-3.122.875-4.7h-.001c0-2.073-.575-4.047-1.95-5.651.255-.766.385-1.573.385-2.385 0-1.064-.24-1.598-.73-2.563-2.24 0-3.69.42-5.39 1.742-1.31-.311-2.67-.455-4.02-.455-1.495 0-2.986.154-4.435.495-1.725-1.336-3.175-1.781-5.44-1.781-.484.965-.729 1.499-.729 2.563 0 .811.125 1.632.385 2.414-1.38 1.589-2.075 3.548-2.075 5.621 0 1.578.281 3.266 1.01 4.701 1.97 3.835 7.49 3.7 11.28 3.7zm-5.289-9.99c.95 0 1.865.168 2.8.297 3.418.52 5.215-.297 7.31-.297 2.339 0 3.675 1.915 3.675 4.087 0 4.349-4.015 5.012-7.53 5.012h-2.41c-3.5 0-7.52-.667-7.52-5.012 0-2.172 1.334-4.087 3.675-4.087z" />
								<path d="m16.655 18.323c1.29 0 1.835-1.692 1.835-2.727s-.545-2.727-1.835-2.727-1.835 1.692-1.835 2.727.545 2.727 1.835 2.727z" />
								<path d="m7.47 18.323c1.29 0 1.835-1.692 1.835-2.727s-.546-2.726-1.835-2.726-1.835 1.692-1.835 2.727.545 2.726 1.835 2.726z" />
							</svg>
						</Link>
					</div>
				</div>
				<div
					className={`${isHome ? 'flex' : 'hidden'} absolute bottom-0 left-0 mb-12 flex items-center justify-center p-8 md:mb-0 md:p-20 `}
				>
					<h2 className={'sr-only'}>
						{`‣ ${content_website?.content_home?.title_vertical_left_1} / ${content_website?.content_home?.title_vertical_left_2} / ${content_website?.content_home?.title_vertical_left_3} / ${content_website?.content_home?.title_vertical_left_4} / ${content_website?.content_home?.title_vertical_left_5} / ${content_website?.content_home?.title_vertical_left_6}`}
					</h2>
					<div className={'origin-bottom-left -rotate-90 uppercase'}>
						<TypeAnimation
							sequence={[
								`‣ ${content_website?.content_home?.title_vertical_left_1}`,
								1000, // Waits 1s
								`‣ ${content_website?.content_home?.title_vertical_left_2}`,
								2000, // Waits 2s
								`‣ ${content_website?.content_home?.title_vertical_left_3}`,
								1000, // Waits 1s
								`‣ ${content_website?.content_home?.title_vertical_left_4}`,
								2000, // Waits 2s
								`‣ ${content_website?.content_home?.title_vertical_left_5}`,
								1000, // Waits 1s
								`‣ ${content_website?.content_home?.title_vertical_left_6}`,
							]}
							wrapper="span"
							cursor={true}
							repeat={Infinity}
							style={{
								fontSize: '0.875rem',
								lineHeight: '1.25rem',
								letterSpacing: '0.05em',
								opacity: 0.75,
								'@media (minWidth: 768px)': {
									fontSize: '1.25rem',
									lineHeight: '1.75rem',
								},
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Nav
