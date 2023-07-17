import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import * as zod from 'zod'
import { patchMeMakeup } from '@/services/PatchMeMakeup'

const schema = zod
	.object({
		city: zod
			.string({ required_error: 'La localisation est requise.' })
			.min(1, 'La localisation est requise.')
			.max(70, 'La localisation ne doit pas dépasser 70 caractères.')
			.or(zod.literal('')),
		action_radius: zod
			.string({
				required_error: "Le rayon d'action est requis.",
			})
			.min(1, "Le rayon d'action est requis.")
			.max(10, "Le rayon d'action ne doit pas dépasser 10 caractères.")
			.or(zod.literal('')),
	})
	.required({ city: true, action_radius: true })

export default function ModalUpdateLocationProfil(props) {
	const user = props.user

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	})

	const [open, setOpen] = useState(props.isModalOpen)
	const [userCity, setUserCity] = useState(user.city ?? '')
	const [userActionRadius, setUserActionRadius] = useState(
		user.action_radius ?? ''
	)

	const { data: session } = useSession()

	const onSubmit = data => {
		if (data.action_radius === '') {
			data.action_radius = null
		}
		data = {
			...data,
		}
		patchMeMakeup(session, data)

		let userTemp = user
		userTemp.city = userCity
		userTemp.action_radius = userActionRadius

		// to change to object reference
		const newUser = JSON.parse(JSON.stringify(userTemp))
		props.handleUpdateUser(newUser)

		reset()
		props.handleIsModalOpen()
	}

	useEffect(() => {
		setOpen(props.isModalOpen)
	}, [props.isModalOpen])

	const cancelButtonRef = useRef(null)
	const inputRef = useRef(null)

	const handleClick = event => {
		// 👇️ open file input box on click of another element
		// 👇️ trigger click event on input element to open file dialog
		inputRef.current.click()
	}

	const handleUpdateCity = event => {
		setUserCity(event.target.value)
	}

	const handleUpdateActionRadius = event => {
		// to int
		setUserActionRadius(event.target.value)
	}

	// reset the form when the modal is closed
	useEffect(() => {
		if (!open) {
			setUserActionRadius(user.action_radius ?? '')
			setUserCity(user.city ?? '')
			reset()
		}
	}, [open, reset, user.action_radius, user.city])

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-30"
				initialFocus={cancelButtonRef}
				onClose={props.handleIsModalOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-30 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative w-full transform rounded-lg bg-white p-8 text-left shadow-2xl transition-all sm:max-w-xl">
								<button
									type="button"
									onClick={props.handleIsModalOpen}
									ref={cancelButtonRef}
									className={
										'absolute right-0 top-0 m-3 flex items-center justify-center md:m-6'
									}
								>
									<span className="material-icons-round">close</span>
								</button>
								<div className="flex flex-col items-start gap-8">
									<div className="text-left">
										<Dialog.Title
											as="h3"
											className="text-lg font-semibold text-gray-900"
										>
											{"Modifier votre localisation et votre rayon d'action"}
										</Dialog.Title>
									</div>
									<div className={'w-full md:w-3/5'}>
										<div className="grid grid-cols-1 gap-4">
											<div className={'flex flex-col gap-4'}>
												<form
													onSubmit={handleSubmit(onSubmit)}
													method="POST"
													className="flex flex-col gap-4"
												>
													<div>
														<label
															htmlFor="city"
															className="block text-sm text-gray-700"
														>
															Localisation
														</label>
														<div className="mt-2">
															<input
																data-cy="city-input"
																id="city"
																name="city"
																type="text"
																{...register('city')}
																value={userCity ?? ''}
																onChange={handleUpdateCity}
																className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
															/>
															{errors.city && (
																<p
																	data-cy={'error-city'}
																	className={'mt-2 text-xs text-red-500/80'}
																>
																	{errors.city.message}
																</p>
															)}
														</div>
													</div>
													<div>
														<label
															htmlFor="action_radius"
															className="block text-sm text-gray-700"
														>
															{"Rayon d'action"}
														</label>
														<div className="mt-2">
															<input
																data-cy="action-radius-input"
																id="action_radius"
																name="action_radius"
																type="number"
																{...register('action_radius')}
																value={userActionRadius}
																onChange={handleUpdateActionRadius}
																className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
															/>
															{errors.action_radius && (
																<p
																	data-cy={'error-action-radius'}
																	className={'mt-2 text-xs text-red-500/80'}
																>
																	{errors.action_radius.message}
																</p>
															)}
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4 flex justify-end">
									<button
										data-cy="save-button-location"
										type="button"
										className="btn-primary"
										onClick={handleSubmit(onSubmit)}
									>
										Sauvegarder
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
