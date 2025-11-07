'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Realisation } from '@/types/strapi'

// Define the props for the slider component
interface RealisationsSliderProps {
	realisations: Realisation[]
	/** Optional class name for the container */
	className?: string
}

/**
 * A reusable, animated realisations slider component.
 * It uses framer-motion for animations and is styled with
 * the existing portfolio theme (cyan/purple).
 */
export const RealisationsSlider = ({ realisations, className }: RealisationsSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	// 'direction' helps framer-motion understand slide direction (next vs. prev)
	const [direction, setDirection] = useState<'left' | 'right'>('right')

	const activeRealisation = realisations[currentIndex]

	const handleNext = () => {
		setDirection('right')
		setCurrentIndex(prev => (prev + 1) % realisations.length)
	}

	const handlePrev = () => {
		setDirection('left')
		setCurrentIndex(prev => (prev - 1 + realisations.length) % realisations.length)
	}

	const handleThumbnailClick = (index: number) => {
		// Determine direction for animation
		setDirection(index > currentIndex ? 'right' : 'left')
		setCurrentIndex(index)
	}

	// All realisations for the scrollable grid
	const thumbnailRealisations = realisations

	// Animation variants for the main image
	const imageVariants = {
		enter: (direction: 'left' | 'right') => ({
			y: direction === 'right' ? '100%' : '-100%',
			opacity: 0,
		}),
		center: { y: 0, opacity: 1 },
		exit: (direction: 'left' | 'right') => ({
			y: direction === 'right' ? '-100%' : '100%',
			opacity: 0,
		}),
	}

	// Animation variants for the text content
	const textVariants = {
		enter: (direction: 'left' | 'right') => ({
			x: direction === 'right' ? 50 : -50,
			opacity: 0,
		}),
		center: { x: 0, opacity: 1 },
		exit: (direction: 'left' | 'right') => ({
			x: direction === 'right' ? -50 : 50,
			opacity: 0,
		}),
	}

	return (
		<div
			className={cn(
				'relative w-full min-h-[650px] md:min-h-[600px] overflow-hidden bg-background text-foreground p-8 md:p-12',
				className
			)}
		>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
				{/* === Left Column: Meta and Thumbnails === */}
				<div className="md:col-span-3 flex flex-col justify-between order-2 md:order-1">
					<div className="flex flex-row md:flex-col justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4">
						{/* Pagination */}
						<span className="text-sm text-muted-foreground font-mono">
							{String(currentIndex + 1).padStart(2, '0')} / {String(realisations.length).padStart(2, '0')}
						</span>
						{/* Vertical "Realisations" Text */}
						<h2 className="text-sm font-medium tracking-widest uppercase [writing-mode:vertical-rl] md:rotate-180 hidden md:block">
							Réalisations
						</h2>
					</div>

					{/* Thumbnail Navigation - 2x3 Scrollable Grid */}
					<div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-800 pr-2">
						<div className="grid grid-cols-2 gap-3">
							{thumbnailRealisations.map((realisation, index) => {
								const isActive = index === currentIndex
								return (
									<button
										type="button"
										key={realisation.id}
										onClick={() => handleThumbnailClick(index)}
										className={cn(
											'relative overflow-hidden rounded-md h-24 m-0.5 w-full transition-all duration-300 focus:outline-none group',
											isActive
												? 'ring-2 ring-cyan-400 opacity-100'
												: 'opacity-70 hover:opacity-100 hover:ring-2 hover:ring-purple-400'
										)}
										aria-label={`Voir la réalisation ${realisation.attributes.title}`}
									>
										<Image
											src={realisation.attributes.image_presentation?.data?.attributes?.url ?? ''}
											alt={realisation.attributes.image_presentation?.data?.attributes?.alternativeText ?? ''}
											fill
											className="object-cover"
											sizes="150px"
										/>
										{/* Numéro en bas à droite */}
										<span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
											{String(index + 1).padStart(2, '0')}/{String(realisations.length).padStart(2, '0')}
										</span>
									</button>
								)
							})}
						</div>
					</div>
				</div>

				{/* === Center Column: Main Image === */}
				<div className="md:col-span-4 relative h-80 min-h-[400px] md:min-h-[500px] order-1 md:order-2">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={currentIndex}
							custom={direction}
							variants={imageVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
							className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
						>
							<Link href={`/portefolio/${activeRealisation.attributes.slug}`} className="absolute inset-0 w-full h-full">
								<Image
									src={activeRealisation.attributes.image_presentation?.data?.attributes?.url ?? ''}
									alt={activeRealisation.attributes.image_presentation?.data?.attributes?.alternativeText ?? ''}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
									priority={currentIndex === 0}
								/>
							</Link>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* === Right Column: Text and Navigation === */}
				<div className="md:col-span-5 flex flex-col justify-between md:pl-8 order-3 md:order-3">
					{/* Text Content */}
					<div className="relative overflow-hidden pt-4 md:pt-24 min-h-[200px]">
						<AnimatePresence initial={false} custom={direction} mode="wait">
							<motion.div
								key={currentIndex}
								custom={direction}
								variants={textVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
							>
								<p className="text-sm font-medium text-cyan-400">{activeRealisation.attributes.type ?? 'Projet'}</p>
								<h3 className="text-xl font-semibold mt-1">{activeRealisation.attributes.title}</h3>
								<blockquote className="mt-6 text-2xl md:text-3xl font-medium leading-snug">
									{activeRealisation.attributes.subtitle}
								</blockquote>
								{activeRealisation.attributes.excerpt && (
									<p className="mt-4 text-sm text-muted-foreground line-clamp-3">
										{activeRealisation.attributes.excerpt}
									</p>
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation Buttons */}
					<div className="flex items-center space-x-2 mt-8 md:mt-0">
						<button
							type="button"
							className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 transition-all duration-300 shadow-lg"
							onClick={handlePrev}
							aria-label="Réalisation précédente"
						>
							<ArrowLeft className="w-5 h-5" />
						</button>
						<button
							type="button"
							className="rounded-full w-12 h-12 flex items-center justify-center bg-cyan-600 text-white hover:bg-cyan-500 hover:scale-105 transition-all duration-300 shadow-lg"
							onClick={handleNext}
							aria-label="Réalisation suivante"
						>
							<ArrowRight className="w-5 h-5" />
						</button>
						{activeRealisation.attributes.slug && (
							<Link
								href={`/portefolio/${activeRealisation.attributes.slug}`}
								className="button-cyan rounded px-6 py-3 text-xs ml-4"
							>
								<span className="button-cyan-title">Voir le projet</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
