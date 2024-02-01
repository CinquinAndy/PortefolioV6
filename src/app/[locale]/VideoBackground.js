'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function VideoBackground() {
	const [enableHeavyContent, setEnableHeavyContent] = useState(false)
	useEffect(() => {
		const connection =
			navigator.connection ||
			navigator.mozConnection ||
			navigator.webkitConnection
		if (!(connection && connection.effectiveType)) {
			if (
				connection.effectiveType.includes('2g') ||
				connection.effectiveType.includes('slow-2g') ||
				connection.effectiveType.includes('3g') ||
				connection.effectiveType.includes('slow-3g') ||
				connection.effectiveType.includes('slow-4g')
			) {
				// disable animations for 2G connection
				setEnableHeavyContent(true)
			}
		}

		// disable animations for devices with 4 cores or less
		if (
			!(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
		) {
			// disable animations for devices with 4 cores or less
			setEnableHeavyContent(true)
		}
	}, [])
	return (
		<div className="video-background mask relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
			{!enableHeavyContent ? (
				<Image
					src={'/assets/images/background.webp'}
					alt={'bg_opti'}
					className={`mix-difference mask absolute left-0 top-0 -z-10 block bg-slate-900 object-cover`}
					quality={90}
					fill={true}
					loading="eager"
				/>
			) : (
				<>
					<Image
						src={'/assets/images/bg_opti.webp'}
						alt={'bg_opti'}
						className={`mix-difference mask absolute left-0 top-0 -z-10 block bg-slate-900 object-cover opacity-75 blur-md`}
						quality={10}
						fill={true}
						loading="eager"
					/>
					<video
						width="1920"
						height="1080"
						muted
						autoPlay={true}
						playsInline={true}
						preload={'auto'}
						loop
						title="video"
						className={
							'mask absolute left-0 top-0 h-full w-full object-cover object-center ' +
							'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'
						}
						id="topHeroVideo"
					>
						<source src="/assets/video_background.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</>
			)}
		</div>
	)
}
