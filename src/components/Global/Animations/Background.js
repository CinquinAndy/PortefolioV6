'use client'
import Image from 'next/image'

export function Background() {
	return (
		<div className="video-background mask relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
			<Image
				src={'/assets/images/bg_opti.webp'}
				alt={'background video, blured'}
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
				title="video background"
				className={
					'mask absolute left-0 top-0 h-full w-full object-cover object-center ' +
					'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'
				}
				id="topHeroVideo"
			>
				<source src="/assets/video_background.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	)
}
