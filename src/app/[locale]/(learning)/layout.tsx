import '@/app/course-typography.css'
import type React from 'react'

export default function LearningLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-white text-gray-950 antialiased dark:bg-gray-950 dark:text-white">
			{children}
		</div>
	)
}
