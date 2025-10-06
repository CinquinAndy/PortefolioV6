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
				'before:bg-white/5 before:backdrop-blur-sm',
				'hover:before:bg-white/10',
				'focus:outline-none data-[focus]:before:outline-2 data-[focus]:before:outline-indigo-500',
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
	parentCourseSlug: string
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
			{modules.map(module => {
				const chapterHref = `/${locale}/course/${module.parentCourseSlug}/${module.course.attributes.slug}`
				return (
					<div key={module.course.id}>
						<Link
							href={chapterHref}
							onClick={onNavigate}
							className={clsx(
								'block text-base/7 font-semibold text-pretty text-slate-50 sm:text-sm/6 font-sans',
								'hover:text-indigo-300 transition-colors',
								pathname === chapterHref && 'text-indigo-400'
							)}
						>
							{module.course.attributes.title}
						</Link>
						<ul className="mt-4 flex flex-col gap-4 border-l border-white/10 text-base/7 text-slate-300 sm:mt-3 sm:gap-3 sm:text-sm/6">
							{module.lessons.map(lesson => {
								const lessonHref = `/${locale}/course/${module.parentCourseSlug}/${module.course.attributes.slug}/${lesson.attributes.slug}`
								return (
									<li
										key={lesson.id}
										className={clsx(
											'-ml-px flex border-l border-transparent pl-4',
											'hover:text-slate-50 hover:not-has-aria-[current=page]:border-indigo-400',
											'has-aria-[current=page]:border-indigo-400'
										)}
									>
										<Link
											href={lessonHref}
											aria-current={lessonHref === pathname ? 'page' : undefined}
											onClick={onNavigate}
											className="aria-[current=page]:font-medium aria-[current=page]:text-indigo-400 font-sans"
										>
											{lesson.attributes.title}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
				)
			})}
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
			<DialogBackdrop className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm" />
			<DialogPanel className="fixed inset-y-0 left-0 isolate w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto bg-gradient-to-b from-indigo-950/90 to-sky-950/90 backdrop-blur-lg ring ring-white/10 sm:w-xs">
				<div className="sticky top-0 z-10 px-4 py-4 sm:px-6">
					<div className="flex h-6 shrink-0">
						<CloseButton as={IconButton}>
							<SidebarIcon className="shrink-0 stroke-slate-50" />
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
				<aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r border-white/10 bg-gradient-to-b from-indigo-950/20 to-sky-950/20 backdrop-blur-sm group-data-sidebar-collapsed:hidden max-xl:hidden">
					<nav aria-label="Course" className="px-6 py-4">
						<div className="sticky top-4 flex h-6">
							<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
								<SidebarIcon className="shrink-0 stroke-slate-50" />
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
			<div className="sticky top-0 z-10 flex items-center justify-between gap-x-8 bg-gradient-to-r from-indigo-950/30 via-purple-950/30 to-sky-950/30 px-4 py-4 backdrop-blur-md border-b border-white/5 sm:px-6">
				<div className="flex min-w-0 shrink items-center gap-x-4">
					<IconButton onClick={() => setIsMobileDialogOpen(!isMobileDialogOpen)} className="xl:hidden">
						<SidebarIcon className="shrink-0 stroke-slate-50" />
					</IconButton>
					{!isSidebarOpen && (
						<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="max-xl:hidden">
							<SidebarIcon className="shrink-0 stroke-slate-50" />
						</IconButton>
					)}
					<div className="min-w-0">{breadcrumbs}</div>
				</div>
			</div>
			<main className="px-4 sm:px-6">{children}</main>
		</>
	)
}
