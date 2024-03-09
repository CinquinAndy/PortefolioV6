'use client'
import { useEffect, useRef, useState } from 'react'

const Cursor = () => {
	const [cursorVisible, setCursorVisible] = useState(true)
	const [cursorEnlarged, setCursorEnlarged] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [velocity, setVelocity] = useState({ x: 0, y: 0 })
	const [outlinePosition, setOutlinePosition] = useState({ x: 0, y: 0 })

	const requestRef = useRef()
	const previousTimeRef = useRef()
	const acceleration = 0.1 // Control the acceleration rate
	const damping = 0.815 // Adjust the damping for a smoother slowdown

	useEffect(() => {
		const updateCursor = e => {
			setPosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener('mousemove', updateCursor)
		window.addEventListener('mouseenter', () => setCursorVisible(true))
		window.addEventListener('mouseleave', () => setCursorVisible(false))
		window.addEventListener('mousedown', () => setCursorEnlarged(true))
		window.addEventListener('mouseup', () => setCursorEnlarged(false))

		document
			.querySelectorAll(
				'a, button, .cursor-pointer, .custom-button-icons, .Toastify'
			)
			.forEach(el => {
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
	}, [])

	const animate = time => {
		if (previousTimeRef.current != undefined) {
			const deltaTime = time - previousTimeRef.current

			// Update logic goes here
			const dx = (position.x - outlinePosition.x) * acceleration
			const dy = (position.y - outlinePosition.y) * acceleration

			setVelocity({
				x: (velocity.x + dx) * damping,
				y: (velocity.y + dy) * damping,
			})

			setOutlinePosition({
				x: outlinePosition.x + velocity.x * deltaTime * 0.01,
				y: outlinePosition.y + velocity.y * deltaTime * 0.01,
			})
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(requestRef.current)
	}, [animate])

	return (
		<>
			<div
				className={`pointer-events-none fixed z-[99999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${cursorEnlarged ? 'scale-90' : 'scale-100'}`}
				style={{ left: `${position.x}px`, top: `${position.y}px` }}
			></div>
			<div
				className={`pointer-events-none fixed z-[99999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/90 mix-blend-difference transition-transform duration-300 ease-in-out ${cursorEnlarged ? 'scale-[175%]' : 'scale-100'}`}
				style={{
					left: `${outlinePosition.x}px`,
					top: `${outlinePosition.y}px`,
				}}
			></div>
		</>
	)
}

export default Cursor
