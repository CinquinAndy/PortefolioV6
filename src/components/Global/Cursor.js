'use client'
import { Suspense, useEffect } from 'react'

function Cursor() {
	useEffect(() => {
		const style = document.createElement('style')
		style.innerHTML = `
			body {
			  cursor: none;
			}
			*:hover {
			  cursor: none !important;
			}
			
			
			
		  `
		document.head.appendChild(style)
		const cursor = document.querySelector('.cursor')

		const changeCursorColor = color => {
			document.documentElement.style.setProperty(
				'--cursor-before-bg-color',
				color
			)
		}

		const changeCursorBorderColor = color => {
			cursor.style.borderColor = color
		}

		document
			.querySelectorAll(
				'a, button, .cursor-pointer,.custom-button-icons, .Toastify'
			)
			.forEach(element => {
				element.addEventListener('mouseenter', () => {
					cursor.classList.add('hover')
					changeCursorColor('#181818')
					changeCursorBorderColor('#fff')
				})
				element.addEventListener('mouseleave', () => {
					cursor.classList.remove('hover')
					changeCursorColor('#ccc')
					changeCursorBorderColor('#000')
				})
			})

		document.addEventListener('click', () => {
			cursor.classList.add('expand')
			changeCursorColor('#181818')
			changeCursorBorderColor('#fff')

			setTimeout(() => {
				cursor.classList.remove('expand')
				changeCursorColor('#ccc')
				changeCursorBorderColor('#000')
			}, 500)
		})

		let isMouseDown = false

		document.addEventListener('mousedown', () => {
			isMouseDown = true
			setTimeout(() => {
				if (isMouseDown) {
					cursor.classList.add('expand')
					changeCursorColor('#181818')
					changeCursorBorderColor('#fff')
				}
			}, 100)
		})

		document.addEventListener('mouseup', () => {
			isMouseDown = false
			cursor.classList.remove('expand')
			changeCursorColor('#ccc')
			changeCursorBorderColor('#000')
		})

		let lastX = 0
		let lastY = 0

		document.addEventListener('mousemove', e => {
			lastX = e.clientX
			lastY = e.clientY
			requestAnimationFrame(() => {
				cursor.style.left = `${lastX}px`
				cursor.style.top = `${lastY}px`
			})
		})
	}, [])

	return (
		<Suspense>
			<span className="cursor"></span>
		</Suspense>
	)
}

export default Cursor
