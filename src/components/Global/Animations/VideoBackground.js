'use client'
import Image from 'next/image'

export function VideoBackground() {
	return (
		<div className="video-background mask relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
			<Image
				alt={'bg_opti'}
				className={`mix-difference mask absolute left-0 top-0 -z-10 block bg-slate-900 object-cover opacity-75 blur-md`}
				fill={true}
				loading="eager"
				quality={10}
				src={'/assets/images/bg_opti.webp'}
			/>
			{/*<video*/}
			{/*	width="1920"*/}
			{/*	height="1080"*/}
			{/*	muted*/}
			{/*	autoPlay={true}*/}
			{/*	playsInline={true}*/}
			{/*	preload={'auto'}*/}
			{/*	loop*/}
			{/*	title="video"*/}
			{/*	className={*/}
			{/*		'mask absolute left-0 top-0 h-full w-full object-cover object-center ' +*/}
			{/*		'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'*/}
			{/*	}*/}
			{/*	id="topHeroVideo"*/}
			{/*>*/}
			{/*	<source src="/assets/video_background.mp4" type="video/mp4" />*/}
			{/*	Your browser does not support the video tag.*/}
			{/*</video>*/}
			<iframe
				allow="autoplay"
				allowFullScreen
				className={
					'mask absolute left-0 top-0 h-full w-full object-cover object-center ' +
					'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'
				}
				data-ready="true"
				height="1080"
				id="topHeroVideo"
				src="https://player.vimeo.com/video/921761467?background=1"
				title="video"
				width="1920"
			></iframe>
		</div>
	)
}
