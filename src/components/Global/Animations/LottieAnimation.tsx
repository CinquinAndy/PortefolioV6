'use client'

import dynamic from 'next/dynamic'
import type React from 'react'
import { useEffect, useState } from 'react'

// Dynamically import the Player component with SSR disabled
const LottiePlayer = dynamic(
	() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
	{ ssr: false } // This is critical - prevents any server-side rendering
)

export function LottieAnimation(): React.JSX.Element {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(false)
	}, [])

	return (
		<>
			{!isLoading && (
				<div className={'container-lottie'}>
					<div className={'lottie-1'}>
						<LottiePlayer
							autoplay
							loop
							src="/assets/background_animation/Animation - 1706890285931.json"
							style={{ width: '1920px', height: '1080px' }}
						/>
					</div>
					<div className={'lottie-2'}>
						<LottiePlayer
							autoplay
							loop
							src="/assets/background_animation/Animation - 1706890285931.json"
							style={{ width: '1920px', height: '1080px' }}
						/>
					</div>
				</div>
			)}
		</>
	)
}
