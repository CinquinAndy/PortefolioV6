import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(new Date(dateString))
}
