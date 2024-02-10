'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { replaceTitle } from '@/services/utils'
import Image from 'next/image'

function Galery({ open, handleClick, galery, title_galery }) {
	const [expandedItem, setExpandedItem] = useState(null)

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={handleClick}>
				<div className="fixed inset-0" />

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto relative h-screen w-screen">
									<div className="flex h-full flex-col overflow-y-scroll border-slate-50 border-opacity-10 bg-gradient-to-b from-indigo-1100 to-sky-1100 py-6 text-slate-50 shadow-xl md:border-l-40">
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title>
													<div
														className={
															'!font-display text-lg font-black md:text-3xl [&>*]:!font-display [&>*]:text-lg [&>*]:font-black md:[&>*]:text-3xl'
														}
														dangerouslySetInnerHTML={{
															__html: replaceTitle(title_galery),
														}}
													/>
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md text-slate-100 hover:text-slate-200 "
														onClick={handleClick}
													>
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										<div
											className={
												'columns-1 gap-5 p-4 sm:columns-2 sm:gap-8 md:columns-3 [&>img:not(:first-child)]:mt-8'
											}
										>
											{/*	map on galery */}
											{galery.map((item, index) => {
												const isExpanded = index === expandedItem
												return (
													<button
														type={'button'}
														key={index}
														className={`cursor-pointer ${
															isExpanded
																? 'absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black px-2'
																: 'relative'
														}`}
														onClick={() => {
															setExpandedItem(isExpanded ? null : index)
														}}
													>
														<Image
															src={item?.attributes?.url}
															alt={
																item?.attributes?.alternativeText ??
																'Project Image'
															}
															width={item?.attributes?.width}
															height={item?.attributes?.height}
															className={`${
																isExpanded
																	? 'p-2 lg:m-8 xl:m-10 2xl:m-40'
																	: 'rounded-lg object-cover p-1 hover:ring-1 hover:ring-indigo-500 hover:ring-offset-2 hover:ring-offset-transparent'
															} `}
															sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
														/>
													</button>
												)
											})}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default Galery
