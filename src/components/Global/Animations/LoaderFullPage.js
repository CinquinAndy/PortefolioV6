'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function LoaderFullPage({ locale }) {
	// on load page
	const [loading, setLoading] = useState(true)
	const [hide, setHide] = useState(false)
	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 0)
		setTimeout(() => {
			setHide(true)
		}, 1000)
	}, [])
	// background: -o-linear-gradient(50deg, var(--color-bg1), var(--color-bg2));
	// 	--color-bg1: rgb(108, 0, 162);
	// --color-bg2: rgb(0, 17, 82);
	return (
		<div
			className={`${loading === false || hide === true ? 'pointer-events-none opacity-0' : 'opacity-100'} body-loader from-[rgb(108, 0, 162)] to-[rgb(0, 17, 82)] fixed left-0 top-0 z-[999] flex h-dvh w-dvw flex-col items-center justify-between gap-20 bg-gradient-to-br antialiased transition-opacity duration-1000`}
		>
			<div></div>
			<div className="mx-auto max-w-2xl p-4">
				<div className="scale-125 transform">
					<div className="loader-circle"></div>
					<div className="loader-line-mask">
						<div className="loader-line" />
					</div>
					<span
						className={'z-10 flex h-full w-full items-center justify-center'}
					>
						<Image
							src={'assets/icons/logov2.svg'}
							width={50}
							height={50}
							alt={'icon'}
						/>
					</span>
				</div>
			</div>
			<div className={'pb-20'}>
				{locale === 'fr' ? (
					<h3 className="text-lg font-semibold text-slate-50">
						Chargement de mon univers...
					</h3>
				) : (
					<h3 className="text-lg font-semibold text-slate-50">
						Loading my universe...
					</h3>
				)}
			</div>
		</div>
	)
}

export default LoaderFullPage
