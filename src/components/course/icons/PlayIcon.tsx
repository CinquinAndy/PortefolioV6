import { clsx } from 'clsx'
import type React from 'react'

export function PlayIcon({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-label="Play icon" className={clsx(className, 'h-4 shrink-0')} {...props}>
			<title>Play icon</title>
			<path d="M3 2.5L12.5 8L3 13.5V2.5Z" />
		</svg>
	)
}
