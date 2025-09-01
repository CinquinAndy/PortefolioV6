'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react'

const Cursor = (): React.JSX.Element => {
	const [isDesktop, setIsDesktop] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [cursorVisible, setCursorVisible] = useState(true)
	const [cursorEnlarged, setCursorEnlarged] = useState(false)
	const [position, setPosition] = useState({ y: 0, x: 0 })
	const [velocity, setVelocity] = useState({ y: 0, x: 0 })
	const [outlinePosition, setOutlinePosition] = useState({ y: 0, x: 0 })

	const requestRef = useRef<number | null>(null)
	const previousTimeRef = useRef<number | null>(null)
	const acceleration = 0.1 // Control the acceleration rate
	const damping = 0.815 // Adjust the damping for a smoother slowdown

	useEffect(() => {
		setIsDesktop(window.innerWidth > 1024)

		const handleResize = () => {
			setIsDesktop(window.innerWidth > 1024)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (!isDesktop) return
		const updateCursor = (e: MouseEvent) => {
			setPosition({ y: e.clientY, x: e.clientX })
		}

		window.addEventListener('mousemove', updateCursor)
		window.addEventListener('mouseenter', () => setCursorVisible(true))
		window.addEventListener('mouseleave', () => setCursorVisible(false))
		window.addEventListener('mousedown', () => setCursorEnlarged(true))
		window.addEventListener('mouseup', () => setCursorEnlarged(false))

		document.querySelectorAll('a, button, .cursor-pointer, .custom-button-icons, .Toastify').forEach(el => {
			el.addEventListener('mouseenter', () => setCursorEnlarged(true))
			el.addEventListener('mouseleave', () => setCursorEnlarged(false))
		})

		return () => {
			window.removeEventListener('mousemove', updateCursor)
			window.removeEventListener('mouseenter', () => setCursorVisible(true))
			window.removeEventListener('mouseleave', () => setCursorVisible(false))
			window.removeEventListener('mousedown', () => setCursorEnlarged(true))
			window.removeEventListener('mouseup', () => setCursorEnlarged(false))
		}
	}, [isDesktop])

	const animate = (time: number) => {
		if (!isDesktop) return
		if (previousTimeRef.current != undefined) {
			const deltaTime = time - previousTimeRef.current

			// Update logic goes here
			const dx = (position.x - outlinePosition.x) * acceleration
			const dy = (position.y - outlinePosition.y) * acceleration

			setVelocity({
				y: (velocity.y + dy) * damping,
				x: (velocity.x + dx) * damping,
			})

			setOutlinePosition({
				y: outlinePosition.y + velocity.y * deltaTime * 0.01,
				x: outlinePosition.x + velocity.x * deltaTime * 0.01,
			})
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		if (!isDesktop) return
		requestRef.current = requestAnimationFrame(animate)
		return () => {
			if (requestRef.current !== null) {
				cancelAnimationFrame(requestRef.current)
			}
		}
	}, [animate, isDesktop])

	return (
		<>
			{isDesktop && (
				<>
					<div
						className={`pointer-events-none fixed z-[99999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${cursorEnlarged ? 'scale-90' : 'scale-100'}`}
						style={{ top: `${position.y}px`, left: `${position.x}px` }}
					></div>
					<div
						className={`pointer-events-none fixed z-[99999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/90 mix-blend-difference transition-transform duration-300 ease-in-out ${cursorEnlarged ? 'scale-[175%]' : 'scale-100'}`}
						style={{
							top: `${outlinePosition.y}px`,
							left: `${outlinePosition.x}px`,
						}}
					></div>
				</>
			)}
		</>
	)
}

export default Cursor
