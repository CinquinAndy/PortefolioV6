'use client'
import { useEffect, useState } from 'react'

import * as SimpleIcons from 'simple-icons'
import Image from 'next/image'

export function TechnologyIcon({ name, image, className }) {
	const [icon, setIcon] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [fallbackImage, setFallbackImage] = useState(null)

	useEffect(() => {
		// First try to use SimpleIcons if we have a name
		if (name) {
			// Convert name to lowercase and remove spaces to match SimpleIcons format
			const formattedName = name.toLowerCase().replace(/\s+/g, '')

			// Try to find the icon in SimpleIcons
			let iconData = null
			try {
				// Try direct match
				iconData = SimpleIcons[`si${formattedName}`]

				// If not found, try searching through all keys
				if (!iconData) {
					const key = Object.keys(SimpleIcons).find(key => {
						return key.toLowerCase() === `si${formattedName}`
					})
					iconData = key ? SimpleIcons[key] : null
				}

				// If we found an icon, set it in state
				if (iconData) {
					setIcon(iconData)
				}
			} catch (error) {
				console.error(`Error looking up icon for ${name}:`, error)
			}
		}

		// If we have an image object but no icon found in SimpleIcons, prepare the fallback image
		if (image && image.attributes && image.attributes.url) {
			setFallbackImage(image.attributes.url)
		}

		// Done loading
		setIsLoading(false)
	}, [name, image])

	// Show nothing while loading
	if (isLoading) {
		return null
	}

	// If we found an icon in SimpleIcons, use it
	if (icon) {
		// Render the SVG for the icon with a visible background and correct sizing
		return (
			<div className={`flex items-center justify-center ${className}`}>
				<svg className="h-6 w-6" fill={`white`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d={icon.path} />
				</svg>
			</div>
		)
	}

	// If we have a fallback image, use it
	if (fallbackImage) {
		return (
			<div className={`flex items-center justify-center ${className}`}>
				<Image
					alt={name || image?.attributes?.name || 'Technology icon'}
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
