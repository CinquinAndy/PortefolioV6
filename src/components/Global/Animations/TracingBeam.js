'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/utils/cn'

export const TracingBeam = ({ children, className }) => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)

	const ref = useRef(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	})

	const contentRef = useRef(null)
	const [svgHeight, setSvgHeight] = useState(0)

	useEffect(() => {
		if (!isDesktop) return
		const handleResize = () => {
			setIsDesktop(window.innerWidth > 1024)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (!isDesktop) return

		if (contentRef.current) {
			setSvgHeight(contentRef.current.offsetHeight)
		}
	}, [])

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
		{
			stiffness: 500,
			damping: 90,
		}
	)
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
		{
			stiffness: 500,
			damping: 90,
		}
	)

	return (
		<>
			{isDesktop ? (
				<div className={'hidden xl:block'}>
					<motion.div
						ref={ref}
						className={cn('relative mx-auto w-full max-w-4xl', className)}
					>
						<div className="absolute -left-4 top-3 md:-left-44">
							<motion.div
								transition={{
									duration: 0.2,
									delay: 0.5,
								}}
								animate={{
									boxShadow:
										scrollYProgress.get() > 0
											? 'none'
											: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
								}}
								className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
							>
								<motion.div
									transition={{
										duration: 0.2,
										delay: 0.5,
									}}
									animate={{
										backgroundColor:
											scrollYProgress.get() > 0
												? 'white'
												: 'var(--emerald-500)',
										borderColor:
											scrollYProgress.get() > 0
												? 'white'
												: 'var(--emerald-600)',
									}}
									className="h-2 w-2  rounded-full border border-neutral-300 bg-white"
								/>
							</motion.div>
							<svg
								viewBox={`0 0 20 ${svgHeight}`}
								width="20"
								height={svgHeight} // Set the SVG height
								className=" ml-4 block"
								aria-hidden="true"
							>
								<motion.path
									d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
									fill="none"
									stroke="#9091A0"
									strokeOpacity="0.16"
									transition={{
										duration: 10,
									}}
								></motion.path>
								<motion.path
									d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
									fill="none"
									stroke="url(#gradient)"
									strokeWidth="1.25"
									className="motion-reduce:hidden"
									transition={{
										duration: 10,
									}}
								></motion.path>
								<defs>
									<motion.linearGradient
										id="gradient"
										gradientUnits="userSpaceOnUse"
										x1="0"
										x2="0"
										y1={y1} // set y1 for gradient
										y2={y2} // set y2 for gradient
									>
										<stop stopColor="#18CCFC" stopOpacity="0"></stop>
										<stop stopColor="#18CCFC"></stop>
										<stop offset="0.325" stopColor="#6344F5"></stop>
										<stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
									</motion.linearGradient>
								</defs>
							</svg>
						</div>
						<div ref={contentRef}>{children}</div>
					</motion.div>
				</div>
			) : (
				<div className={'block xl:hidden'}>{children}</div>
			)}
		</>
	)
}
