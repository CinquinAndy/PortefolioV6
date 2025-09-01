'use client'
import { useEffect, useState } from 'react'

export function ComponentLoadComponent({ FallBack, children }) {
	const [loaded, setLoaded] = useState(false)

	// check if children is loaded
	useEffect(() => {
		if (children) {
			setLoaded(true)
		}
	}, [children])

	return (
		<>
			{!loaded && FallBack && <FallBack />}

			{!!loaded && children}
		</>
	)
}
