'use client'
import React from 'react'
import { useEffect, useState } from 'react'

interface ComponentLoadComponentProps {
	FallBack?: React.ComponentType
	children?: React.ReactNode
}

export function ComponentLoadComponent({ FallBack, children }: ComponentLoadComponentProps): React.JSX.Element {
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
