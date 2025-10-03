'use client'

import type { Course, Lesson } from '@/types/course'
import {
	CloseButton,
	Dialog,
	DialogBackdrop,
	DialogPanel,
} from '@headlessui/react'
import { clsx } from 'clsx'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { createContext, useContext, useState } from 'react'

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
			{modules.map((module) => (
				<div key={module.course.id}>
					<h2 className="text-base/7 font-semibold text-pretty text-slate-50 sm:text-sm/6">
						{module.course.attributes.title}
					</h2>
					<ul className="mt-4 flex flex-col gap-4 border-l border-slate-50/10 text-base/7 text-slate-300 sm:mt-3 sm:gap-3 sm:text-sm/6">
						{module.lessons.map((lesson) => {
							const lessonHref = `/${locale}/course/${module.course.attributes.slug}/${lesson.attributes.slug}`
							return (
								<li
									key={lesson.id}
									className={clsx(
										'-ml-px flex border-l border-transparent pl-4',
										'hover:text-slate-50 hover:not-has-aria-[current=page]:border-cyan-400',
										'has-aria-[current=page]:border-cyan-400'
									)}
								>
									<Link
										href={lessonHref}
										aria-current={lessonHref === pathname ? 'page' : undefined}
										onClick={onNavigate}
										className="aria-[current=page]:font-medium aria-[current=page]:text-cyan-400"
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
			<DialogBackdrop className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
			<DialogPanel className="fixed inset-y-0 left-0 isolate w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto bg-slate-900/95 backdrop-blur-md ring ring-slate-50/10 sm:w-xs">
				<div className="sticky top-0 z-10 px-4 py-4 backdrop-blur-sm sm:px-6">
					<div className="flex h-6 shrink-0 justify-between items-center">
						<span className="text-slate-50 font-semibold">Navigation</span>
						<CloseButton className="rounded-lg p-1.5 hover:bg-slate-50/10 transition-colors">
							<X className="h-5 w-5 stroke-slate-50" />
						</CloseButton>
					</div>
				</div>
				<CourseNavigation
					modules={modules}
					onNavigate={onClose}
					className="px-4 pb-4 sm:px-6"
					locale={locale}
				/>
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
			<div data-sidebar-collapsed={isSidebarOpen ? undefined : ''} className="group min-h-screen">
				<aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r border-slate-50/10 bg-slate-900/50 backdrop-blur-md group-data-sidebar-collapsed:hidden max-xl:hidden">
					<nav aria-label="Course" className="px-6 py-4">
						<div className="sticky top-4 flex h-6 justify-between items-center mb-6">
							<Link
								href={`/${locale}/course`}
								className="text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
							>
								Cours
							</Link>
							<button
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
								className="rounded-lg p-1.5 hover:bg-slate-50/10 transition-colors"
							>
								<Menu className="h-5 w-5 stroke-slate-50" />
							</button>
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
	const { isSidebarOpen, setIsSidebarOpen, setIsMobileDialogOpen, isMobileDialogOpen } =
		useContext(SidebarContext)

	return (
		<>
			<nav className="sticky top-0 z-10 border-b border-slate-50/10 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6">
				<div className="flex min-w-0 shrink items-center gap-x-4 py-4">
					<button
						onClick={() => setIsMobileDialogOpen(!isMobileDialogOpen)}
						className="rounded-lg p-1.5 hover:bg-slate-50/10 transition-colors xl:hidden"
					>
						<Menu className="h-5 w-5 stroke-slate-50" />
					</button>
					{!isSidebarOpen && (
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							className="rounded-lg p-1.5 hover:bg-slate-50/10 transition-colors max-xl:hidden"
						>
							<Menu className="h-5 w-5 stroke-slate-50" />
						</button>
					)}
					<div className="min-w-0">{breadcrumbs}</div>
				</div>
			</nav>
			<main className="px-4 sm:px-6">{children}</main>
		</>
	)
}
