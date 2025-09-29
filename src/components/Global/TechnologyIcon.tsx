'use client'
import Image from 'next/image'
import type React from 'react'
import { useEffect, useState } from 'react'
import * as SimpleIcons from 'simple-icons'

interface TechnologyIconProps {
	name: string
	image?: unknown
	className?: string
}

interface SimpleIconData {
	path: string
	[key: string]: unknown
}

interface ImageAttributes {
	url?: string
	name?: string
}

export function TechnologyIcon({ name, image, className }: TechnologyIconProps): React.JSX.Element | null {
	const [icon, setIcon] = useState<SimpleIconData | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fallbackImage, setFallbackImage] = useState<string | null>(null)

	useEffect(() => {
		// First try to use SimpleIcons if we have a name
		if (name) {
			// Convert name to lowercase and remove spaces to match SimpleIcons format
			const formattedName = name.toLowerCase().replace(/\s+/g, '')

			// Try to find the icon in SimpleIcons
			let iconData: SimpleIconData | null = null
			try {
				// Try direct match
				const simpleIcons = SimpleIcons as unknown as Record<string, SimpleIconData>
				iconData = simpleIcons[`si${formattedName}`] ?? null

				// If not found, try searching through all keys
				if (iconData == null) {
					const key = Object.keys(SimpleIcons).find(key => {
						return key != null && key.toLowerCase() === `si${formattedName}`
					})
					if (key != null && key.trim() !== '') {
						iconData = simpleIcons[key] ?? null
					}
				}

				// If we found an icon, set it in state
				if (iconData != null) {
					setIcon(iconData)
				}
			} catch (error) {
				console.error(`Error looking up icon for ${name}:`, error)
			}
		}

		// If we have an image object but no icon found in SimpleIcons, prepare the fallback image
		if (image != null && typeof image === 'object' && image !== null && 'attributes' in image) {
			const imageObj = image as { attributes?: ImageAttributes }
			const url = imageObj.attributes?.url
			if (typeof url === 'string') {
				setFallbackImage(url)
			}
		}

		// Done loading
		setIsLoading(false)
	}, [name, image])

	// Show nothing while loading
	if (isLoading) {
		return null
	}

	// If we found an icon in SimpleIcons, use it
	if (icon != null) {
		// Render the SVG for the icon with a visible background and correct sizing
		return (
			<div className={`flex items-center justify-center ${className}`}>
				<svg className="h-6 w-6" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label={name}>
					<title>{name}</title>
					<path d={icon.path} />
				</svg>
			</div>
		)
	}

	// If we have a fallback image, use it
	if (fallbackImage != null) {
		let altText = name || 'Technology icon'

		// Try to get a better alt text from the image object
		if (image != null && typeof image === 'object' && image !== null && 'attributes' in image) {
			const imageObj = image as { attributes?: ImageAttributes }
			const imageName = imageObj.attributes?.name
			if (typeof imageName === 'string' && imageName.trim()) {
				altText = imageName
			}
		}

		return (
			<div className={`flex items-center justify-center ${className}`}>
				<Image
					alt={altText}
					className="h-6 w-6 brightness-0 invert-[1] filter"
					height={24}
					src={fallbackImage}
					style={{ objectFit: 'contain' }}
					width={24}
				/>
			</div>
		)
	}

	// Last resort: text fallback (should rarely happen with the image fallback)
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<span className="text-xs text-white">{name || 'Unknown'}</span>
		</div>
	)
}
