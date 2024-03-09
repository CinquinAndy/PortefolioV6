'use client'
import { BackgroundBeams } from '@/components/Global/Animations/BackgroundBeam'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function LoaderFullPage({ params }) {
	// on load page
	const [loading, setLoading] = useState(true)
	const [hide, setHide] = useState(false)
	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 5000)
		setTimeout(() => {
			setHide(true)
		}, 7000)
	}, [])
	return (
		<div
			className={`${loading === false ? 'pointer-events-none opacity-0' : 'opacity-100'} body-loader 
			fixed left-0 top-0 z-[999] h-dvh w-dvw flex-col items-center justify-center antialiased 
			transition-opacity duration-1000 ${hide === true ? 'hidden' : 'flex'}`}
		>
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
			<BackgroundBeams />
		</div>
	)
}

export default LoaderFullPage
