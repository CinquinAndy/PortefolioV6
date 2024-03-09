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
			
			:root {
    			--cursor-before-bg-color: #fff;
			}

			.cursor {
				position: fixed;
				width: 30px;
				height: 30px;
				/*border from the circle*/
				background: rgba(0,0,0,0.7);
				border-radius: 50%;
				top: var(--y, 0);
				left: var(--x, 0);
				transform: translate(-50%, -50%);
				mix-blend-mode: multiply;
				z-index: 999999;
				pointer-events: none;
				transition: transform 0.2s ease-out, background-color 0.2s ease;
			}
			
			.cursor::before {
				content: '';
				position: fixed;
				width: 27px;
				height: 27px;
				background-color: var(--cursor-before-bg-color);
				border-radius: 50%;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				pointer-events: none;
				transition: transform 0.2s ease-out, background-color 0.2s ease;
			}
			
			.cursor.hover {
				transform: translate(-50%, -50%) scale(1.4);
			}
			
			.cursor.expand{
				transform: translate(-50%, -50%) scale(1.4);
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
			cursor.style.backgroundColor = color
		}

		document
			.querySelectorAll(
				'a, button, .cursor-pointer,.custom-button-icons, .Toastify'
			)
			.forEach(element => {
				element.addEventListener('mouseenter', () => {
					cursor.classList.add('hover')
					changeCursorColor('#919191')
					changeCursorBorderColor('rgba(0, 0, 0, 0.8)')
				})
				element.addEventListener('mouseleave', () => {
					cursor.classList.remove('hover')
					changeCursorColor('#ccc')
					changeCursorBorderColor('rgba(0,0,0,0.7)')
				})
			})

		document.addEventListener('click', () => {
			cursor.classList.add('expand')
			changeCursorColor('#919191')
			changeCursorBorderColor('rgba(0, 0, 0, 0.8)')

			setTimeout(() => {
				cursor.classList.remove('expand')
				changeCursorColor('#ccc')
				changeCursorBorderColor('rgba(0,0,0,0.7)')
			}, 500)
		})

		let isMouseDown = false

		document.addEventListener('mousedown', () => {
			isMouseDown = true
			setTimeout(() => {
				if (isMouseDown) {
					cursor.classList.add('expand')
					changeCursorColor('#919191')
					changeCursorBorderColor('rgba(0, 0, 0, 0.8)')
				}
			}, 100)
		})

		document.addEventListener('mouseup', () => {
			isMouseDown = false
			cursor.classList.remove('expand')
			changeCursorColor('#ccc')
			changeCursorBorderColor('rgba(0,0,0,0.7)')
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
