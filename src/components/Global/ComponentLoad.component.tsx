'use client'
import { useEffect, useState } from 'react'
import React from 'react'

interface ComponentLoadComponentProps {
	FallBack?: React.ComponentType
	children?: React.ReactNode
}

export function ComponentLoadComponent({ FallBack, children }: ComponentLoadComponentProps): React.JSX.Element {
	const [loaded, setLoaded] = useState(false)

	// check if children is loaded
	useEffect(() => {
		if (children != null) {
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
