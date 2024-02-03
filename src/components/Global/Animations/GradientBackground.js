'use client'
import { useState, useEffect } from 'react'

export function GradientBackground() {
	// const [enableAnimations, setEnableAnimations] = useState(false)
	// useEffect(() => {
	// 	const connection =
	// 		navigator.connection ||
	// 		navigator.mozConnection ||
	// 		navigator.webkitConnection
	// 	if (!(connection && connection.effectiveType)) {
	// 		if (
	// 			connection.effectiveType.includes('2g') ||
	// 			connection.effectiveType.includes('slow-2g') ||
	// 			connection.effectiveType.includes('3g') ||
	// 			connection.effectiveType.includes('slow-3g') ||
	// 			connection.effectiveType.includes('slow-4g')
	// 		) {
	// 			// disable animations for 2G connection
	// 			setEnableAnimations(true)
	// 		}
	// 	}
	//
	// 	// disable animations for devices with 4 cores or less
	// 	if (!(navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
	// 		// disable animations for devices with 4 cores or less
	// 		setEnableAnimations(true)
	// 	}
	// }, [])
	return (
		<div className={`gradient-bg`}>
			{/*<svg xmlns="http://www.w3.org/2000/svg" className={'gradient_svg'}>*/}
			{/*	<defs>*/}
			{/*		<filter id="goo">*/}
			{/*			<feGaussianBlur*/}
			{/*				in="SourceGraphic"*/}
			{/*				stdDeviation="10"*/}
			{/*				result="blur"*/}
			{/*			/>*/}
			{/*			<feColorMatrix*/}
			{/*				in="blur"*/}
			{/*				mode="matrix"*/}
			{/*				values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"*/}
			{/*				result="goo"*/}
			{/*			/>*/}
			{/*			<feBlend in="SourceGraphic" in2="goo" />*/}
			{/*		</filter>*/}
			{/*	</defs>*/}
			{/*</svg>*/}
			<div className="gradients-container">
				<div className="g1"></div>
				<div className="g2"></div>
				<div className="g3"></div>
				<div className="g4"></div>
				<div className="g5"></div>
			</div>
		</div>
	)
}
