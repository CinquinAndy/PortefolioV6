'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function VideoBackground() {
	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe) return

		// Écouter les messages de l'API Vimeo Player
		const handleMessage = (event: MessageEvent) => {
			// Vérifier que le message vient de Vimeo
			if (event.origin !== 'https://player.vimeo.com') return

			try {
				const data = JSON.parse(event.data)
				// Quand la vidéo est prête ou commence à jouer
				if (data.event === 'ready' || data.event === 'loaded' || data.event === 'play') {
					// Dispatch un événement custom pour signaler que la vidéo est chargée
					window.dispatchEvent(new Event('videoBackgroundReady'))
				}
			} catch (e) {
				// Ignorer les erreurs de parsing
			}
		}

		window.addEventListener('message', handleMessage)

		// Timeout de sécurité : si après 3 secondes aucun événement n'est reçu,
		// on considère quand même la vidéo comme prête
		const safetyTimeout = setTimeout(() => {
			window.dispatchEvent(new Event('videoBackgroundReady'))
		}, 3000)

		return () => {
			window.removeEventListener('message', handleMessage)
			clearTimeout(safetyTimeout)
		}
	}, [])

	return (
		<div className="video-background mask relative clear-both m-0 h-screen w-screen max-w-screen overflow-x-hidden p-0">
			<Image
				alt={'bg_opti'}
				className={`mix-difference mask absolute left-0 top-0 -z-10 block bg-slate-900 object-cover opacity-75 blur-md`}
				fill={true}
				loading="eager"
				quality={10}
				src={'/assets/images/bg_opti.webp'}
			/>
			<iframe
				ref={iframeRef}
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
