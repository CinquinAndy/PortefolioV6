'use client'

import Image from 'next/image'
import type React from 'react'
import { useEffect, useState } from 'react'

interface LoaderFullPageProps {
	locale?: string
}

function LoaderFullPage({ locale }: LoaderFullPageProps): React.JSX.Element {
	const [loading, setLoading] = useState(true)
	const [hide, setHide] = useState(false)

	useEffect(() => {
		let videoReady = false
		let minTimeElapsed = false

		// Attendre que la vidéo soit prête
		const handleVideoReady = () => {
			videoReady = true
			checkAndHideLoader()
		}

		// Assurer un temps minimum d'affichage du loader (800ms)
		const minDisplayTimer = setTimeout(() => {
			minTimeElapsed = true
			checkAndHideLoader()
		}, 800)

		// Timeout de sécurité : forcer la fermeture après 5 secondes max
		const maxDisplayTimer = setTimeout(() => {
			setLoading(false)
			setTimeout(() => setHide(true), 1000)
		}, 5000)

		// Fonction pour vérifier si on peut masquer le loader
		const checkAndHideLoader = () => {
			// Le loader se cache uniquement quand :
			// 1. La vidéo est prête ET
			// 2. Le temps minimum est écoulé
			if (videoReady && minTimeElapsed) {
				setLoading(false)
				setTimeout(() => {
					setHide(true)
				}, 1000)
				clearTimeout(maxDisplayTimer)
			}
		}

		window.addEventListener('videoBackgroundReady', handleVideoReady)

		return () => {
			window.removeEventListener('videoBackgroundReady', handleVideoReady)
			clearTimeout(minDisplayTimer)
			clearTimeout(maxDisplayTimer)
		}
	}, [])

	return (
		<div
			className={`${loading === false || hide === true ? 'pointer-events-none opacity-0' : 'opacity-100'} body-loader fixed left-0 top-0 z-999 flex h-dvh w-dvw flex-col items-center justify-between gap-20 bg-gradient-to-br from-andy-purple-500 to-andy-blue-500 antialiased transition-opacity duration-1000`}
		>
			<div></div>
			<div className="mx-auto max-w-2xl p-4">
				<div className="scale-125 transform">
					<div className="loader-circle"></div>
					<div className="loader-line-mask">
						<div className="loader-line" />
					</div>
					<span className={'z-10 flex h-full w-full items-center justify-center'}>
						<Image alt={'icon'} height={50} src={'assets/icons/logov2.svg'} width={50} />
					</span>
				</div>
			</div>
			<div className={'pb-20'}>
				{locale === 'fr' ? (
					<h3 className="text-lg font-semibold text-slate-50">Chargement de mon univers...</h3>
				) : (
					<h3 className="text-lg font-semibold text-slate-50">Loading my universe...</h3>
				)}
			</div>
		</div>
	)
}

export default LoaderFullPage
