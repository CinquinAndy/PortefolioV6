'use client'
import Image from 'next/image'
import { useState } from 'react'

export function ImageLoad({ className, src, alt, width, height }) {
	const [loaded, setLoaded] = useState(false)

	return (
		<>
			{!loaded && (
				<div
					className={
						'!pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center'
					}
				>
					<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]">
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Loading...
						</span>
					</div>
				</div>
			)}
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				className={`${loaded ? 'block' : '!pointer-events-none fixed -z-10 opacity-0'} ${className}`}
				quality={75}
				onLoad={() => setLoaded(true)}
			/>
		</>
	)
}
