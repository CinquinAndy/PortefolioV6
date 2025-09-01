'use client'
import React from 'react'

export function GradientBackground(): React.JSX.Element {
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
				{/*<div className="g2"></div>*/}
				<div className="g3"></div>
				{/*<div className="g4"></div>*/}
				<div className="g5"></div>
			</div>
		</div>
	)
}
