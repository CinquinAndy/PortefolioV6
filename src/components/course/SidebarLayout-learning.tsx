'use client'

import { CloseButton, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { createContext, useContext, useState } from 'react'
import type { Course, Lesson } from '@/types/course'

// Simple icon components matching compass-ts
function SidebarIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" className={clsx('h-4 w-4', className)} aria-label="Menu">
			<title>Menu</title>
			<path d="M2 4h12M2 8h12M2 12h12" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	)
}

function IconButton({
	onClick,
	children,
	className,
}: {
	onClick?: () => void
	children: React.ReactNode
	className?: string
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={clsx(
				'relative *:relative',
				'before:absolute before:top-1/2 before:left-1/2 before:size-8 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md',
				'before:bg-white/75 before:backdrop-blur-sm dark:before:bg-gray-950/75',
				'hover:before:bg-gray-950/5 dark:hover:before:bg-white/5',
				'focus:outline-none data-[focus]:before:outline-2 data-[focus]:before:outline-blue-700',
				className
			)}
		>
			{children}
		</button>
	)
}

export const SidebarContext = createContext<{
	isSidebarOpen: boolean
	setIsSidebarOpen: (isSidebarOpen: boolean) => void
	isMobileDialogOpen: boolean
	setIsMobileDialogOpen: (isMobileDialogOpen: boolean) => void
}>({
	isSidebarOpen: true,
	setIsSidebarOpen: () => {},
	isMobileDialogOpen: false,
	setIsMobileDialogOpen: () => {},
})

interface CourseModule {
	course: Course
	lessons: Lesson[]
}

function CourseNavigation({
	modules,
	onNavigate,
	className,
	locale,
}: {
	modules: CourseModule[]
	onNavigate?: () => void
	className?: string
	locale: string
}) {
	const pathname = usePathname()

	return (
		<div className={clsx(className, 'space-y-8')}>
			{modules.map(module => (
				<div key={module.course.id}>
					<h2 className="text-base/7 font-semibold text-pretty text-gray-950 sm:text-sm/6 dark:text-white">
						{module.course.attributes.title}
					</h2>
					<ul className="mt-4 flex flex-col gap-4 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-3 sm:text-sm/6 dark:border-white/10 dark:text-gray-400">
						{module.lessons.map(lesson => {
							const lessonHref = `/${locale}/course/${module.course.attributes.slug}/${lesson.attributes.slug}`
							return (
								<li
									key={lesson.id}
									className={clsx(
										'-ml-px flex border-l border-transparent pl-4',
										'hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 dark:hover:text-white',
										'has-aria-[current=page]:border-gray-950 dark:has-aria-[current=page]:border-white'
									)}
								>
									<Link
										href={lessonHref}
										aria-current={lessonHref === pathname ? 'page' : undefined}
										onClick={onNavigate}
										className="aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white"
									>
										{lesson.attributes.title}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			))}
		</div>
	)
}

function MobileNavigation({
	open,
	onClose,
	modules,
	locale,
}: {
	open: boolean
	onClose: () => void
	modules: CourseModule[]
	locale: string
}) {
	return (
		<Dialog open={open} onClose={onClose} className="xl:hidden">
			<DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
			<DialogPanel className="fixed inset-y-0 left-0 isolate w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto bg-white ring ring-gray-950/10 sm:w-xs dark:bg-gray-950 dark:ring-white/10">
				<div className="sticky top-0 z-10 px-4 py-4 sm:px-6">
					<div className="flex h-6 shrink-0">
						<CloseButton as={IconButton}>
							<SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
						</CloseButton>
					</div>
				</div>
				<CourseNavigation modules={modules} onNavigate={onClose} className="px-4 pb-4 sm:px-6" locale={locale} />
			</DialogPanel>
		</Dialog>
	)
}

export function SidebarLayout({
	modules,
	children,
	locale,
}: {
	modules: CourseModule[]
	children: React.ReactNode
	locale: string
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false)

	return (
		<SidebarContext.Provider
			value={{
				isSidebarOpen,
				setIsSidebarOpen,
				isMobileDialogOpen,
				setIsMobileDialogOpen,
			}}
		>
			<div data-sidebar-collapsed={isSidebarOpen ? undefined : ''} className="group">
				<aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r border-gray-950/10 group-data-sidebar-collapsed:hidden max-xl:hidden dark:border-white/10">
					<nav aria-label="Course" className="px-6 py-4">
						<div className="sticky top-4 flex h-6">
							<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
								<SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
							</IconButton>
							<MobileNavigation
								open={isMobileDialogOpen}
								onClose={() => setIsMobileDialogOpen(false)}
								modules={modules}
								locale={locale}
							/>
						</div>
						<div className="mt-3">
							<CourseNavigation modules={modules} className="max-xl:hidden" locale={locale} />
						</div>
					</nav>
				</aside>
				<div className="xl:not-group-data-sidebar-collapsed:ml-(--container-2xs)">{children}</div>
			</div>
		</SidebarContext.Provider>
	)
}

export function SidebarLayoutContent({
	breadcrumbs,
	children,
}: {
	breadcrumbs: React.ReactNode
	children: React.ReactNode
}) {
	const { isSidebarOpen, setIsSidebarOpen, isMobileDialogOpen, setIsMobileDialogOpen } = useContext(SidebarContext)

	return (
		<>
			<div className="sticky top-0 z-10 flex items-center justify-between gap-x-8 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 dark:bg-gray-950/90">
				<div className="flex min-w-0 shrink items-center gap-x-4">
					<IconButton onClick={() => setIsMobileDialogOpen(!isMobileDialogOpen)} className="xl:hidden">
						<SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
					</IconButton>
					{!isSidebarOpen && (
						<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="max-xl:hidden">
							<SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
						</IconButton>
					)}
					<div className="min-w-0">{breadcrumbs}</div>
				</div>
			</div>
			<main className="px-4 sm:px-6">{children}</main>
		</>
	)
}
