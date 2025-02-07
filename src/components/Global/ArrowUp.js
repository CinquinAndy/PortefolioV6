'use client'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

function ArrowUp() {
	// State to manage whether the button is shown or not
	const [showButton, setShowButton] = useState(false)

	useEffect(() => {
		// Function to handle scroll events
		const handleScroll = () => {
			// Show the button if user has scrolled down at least one viewport height
			if (window.scrollY > window.innerHeight) {
				setShowButton(true)
			} else {
				// Hide the button if user scrolls back to the top of the page
				setShowButton(false)
			}
		}

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll)

		// Cleanup function to remove the event listener when the component unmounts
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<button
			className={
				'fixed bottom-0 right-0 z-50 m-4 flex cursor-pointer items-center justify-center rounded-xl border border-white bg-white/5 p-2 transition-opacity ' +
				`backdrop-blur-sm lg:m-8 ${showButton ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`
			}
			onClick={() => {
				// Scroll to the top of the page smoothly when button is clicked
				window.scrollTo({ behavior: 'smooth', top: 0 })
			}}
		>
			<ChevronUpIcon className="h-8 w-8 text-white" />
		</button>
	)
}

export default ArrowUp
