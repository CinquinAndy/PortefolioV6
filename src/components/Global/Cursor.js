'use client'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// // Custom hook to detect path changes
// function usePathChangeEffect(effect, deps = []) {
// 	const pathname = usePathname()
//
// 	useEffect(effect, [pathname, ...deps])
// }

// function Cursor() {
// usePathChangeEffect(() => {
// 	// Logic to reset your cursor here
// 	// For example, resetting colors or CSS classes based on page state
// 	const cursor = document.querySelector('.cursor')
// 	if (cursor) {
// 		cursor.classList.remove('expand', 'hover')
// 		// Reset other states or styles as necessary
// 	}
// }, [])
//
// useEffect(() => {
// 	const style = document.createElement('style')
// 	style.innerHTML = `
//
// 	  `
// 	document.head.appendChild(style)
//
// 	let cursor = document.querySelector('.cursor')
// 	if (!cursor) {
// 		cursor = document.createElement('span')
// 		cursor.className = 'cursor'
// 		document.body.appendChild(cursor)
// 	}
//
// 	const elements = document.querySelectorAll(
// 		'a, button, .cursor-pointer, .custom-button-icons, .Toastify'
// 	)
// 	elements.forEach(element => {
// 		element.addEventListener('mouseenter', () => {
// 			cursor.classList.add('hover')
// 		})
// 		element.addEventListener('mouseleave', () => {
// 			cursor.classList.remove('hover')
// 		})
// 	})
//
// 	document.addEventListener('click', () => {
// 		cursor.classList.add('expand')
//
// 		setTimeout(() => {
// 			cursor.classList.remove('expand')
// 		}, 500)
// 	})
//
// 	let isMouseDown = false
//
// 	document.addEventListener('mousedown', () => {
// 		isMouseDown = true
// 		setTimeout(() => {
// 			if (isMouseDown) {
// 				cursor.classList.add('expand')
// 			}
// 		}, 100)
// 	})
//
// 	document.addEventListener('mouseup', () => {
// 		isMouseDown = false
// 		cursor.classList.remove('expand')
// 	})
//
// 	let lastX = 0
// 	let lastY = 0
// 	let cursorX = 0
// 	let cursorY = 0
// 	const speed = 0.5 // Adjust speed for smoother cursor movement
//
// 	function animate() {
// 		const dx = (lastX - cursorX) * speed
// 		const dy = (lastY - cursorY) * speed
//
// 		cursorX += dx
// 		cursorY += dy
//
// 		cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
// 		requestAnimationFrame(animate)
// 	}
//
// 	document.addEventListener('mousemove', e => {
// 		lastX = e.clientX
// 		lastY = e.clientY
// 	})
//
// 	animate()
// }, [])
const Cursor = () => {
	const [cursorVisible, setCursorVisible] = useState(true)
	const [cursorEnlarged, setCursorEnlarged] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [velocity, setVelocity] = useState({ x: 0, y: 0 })
	const [outlinePosition, setOutlinePosition] = useState({ x: 0, y: 0 })

	const acceleration = 0.1 // Control the acceleration rate
	const damping = 0.1 // Control the damping to slow down the cursor

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

		const animate = () => {
			const dx = position.x - outlinePosition.x
			const dy = position.y - outlinePosition.y

			const updatedVelocity = {
				x: velocity.x + dx * acceleration,
				y: velocity.y + dy * acceleration,
			}

			const updatedPosition = {
				x: outlinePosition.x + updatedVelocity.x,
				y: outlinePosition.y + updatedVelocity.y,
			}

			setVelocity({
				x: updatedVelocity.x * damping,
				y: updatedVelocity.y * damping,
			})

			setOutlinePosition(updatedPosition)

			requestAnimationFrame(animate)
		}

		animate()

		return () => {
			window.removeEventListener('mousemove', updateCursor)
			window.removeEventListener('mouseenter', () => setCursorVisible(true))
			window.removeEventListener('mouseleave', () => setCursorVisible(false))
			window.removeEventListener('mousedown', () => setCursorEnlarged(true))
			window.removeEventListener('mouseup', () => setCursorEnlarged(false))
		}
	}, [position, velocity, outlinePosition])

	return (
		<>
			<div
				className={`pointer-events-none fixed z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${cursorEnlarged ? 'scale-90' : 'scale-100'}`}
				style={{ left: `${position.x}px`, top: `${position.y}px` }}
			></div>
			<div
				className={`pointer-events-none fixed z-50 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/10 transition-transform duration-300 ease-in-out ${cursorEnlarged ? 'scale-150' : 'scale-100'}`}
				style={{
					left: `${outlinePosition.x}px`,
					top: `${outlinePosition.y}px`,
				}}
			></div>
		</>
	)
}

export default Cursor
