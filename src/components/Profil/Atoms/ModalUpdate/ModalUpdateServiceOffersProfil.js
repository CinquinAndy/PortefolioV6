import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { patchMeMakeup } from '@/services/PatchMeMakeup'
import { DescriptionPriceOffer } from '@/components/Profil/Childs/ServiceOffers/DescriptionPriceOffer'
import { OptionsOffers } from '@/components/Profil/Childs/ServiceOffers/OptionsOffers'

const schema = zod
	.object({
		name: zod
			.string({ required_error: 'Le nom du service est requis.' })
			.min(1, 'Le nom du service est requis.')
			.max(70, 'Le nom du service ne doit pas dépasser 70 caractères.'),
		price: zod
			.string({
				required_error: 'Le prix du service est requis.',
			})
			.min(1, 'Le prix du service est requis.')
			.max(70, 'Le prix du service ne doit pas dépasser 70 caractères.'),
		description: zod
			.string({ required_error: 'La description du service est requise.' })
			.min(1, 'La description du service est requise.')
			.max(2000, 'La description ne doit pas dépasser 2000 caractères.'),
		services: zod
			.array(
				zod.object({
					name: zod
						.string({ required_error: 'Le nom du service est requis.' })
						.min(1, 'Le nom du service est requis.')
						.max(70, 'Le nom du service ne doit pas dépasser 70 caractères.'),
					price: zod
						.string({
							required_error: 'Le prix du service est requis.',
						})
						.min(1, 'Le prix du service est requis.')
						.max(70, 'Le prix du service ne doit pas dépasser 70 caractères.'),
					description: zod
						.string({
							required_error: 'La description du service est requise.',
						})
						.min(1, 'La description du service est requise.')
						.max(2000, 'La description ne doit pas dépasser 2000 caractères.'),
				})
			)
			.optional(),
	})
	.required({ name: true, price: true, description: true })

export default function ModalUpdateServiceOffersProfil(props) {
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

	const [userServiceOffers, setUserServiceOffers] = useState(
		user.service_offers ?? []
	)
	const [userServiceOffersId, setUserServiceOffersId] = useState('')
	const [userServiceOffersName, setUserServiceOffersName] = useState('')
	const [userServiceOffersPrice, setUserServiceOffersPrice] = useState('')
	const [userServiceOffersDescription, setUserServiceOffersDescription] =
		useState('')
	const [userServiceOffersOptions, setUserServiceOffersOptions] = useState([])

	const { data: session } = useSession()

	const setResetFormState = () => {
		setUserServiceOffersId('')
		setUserServiceOffersName('')
		setUserServiceOffersPrice('')
		setUserServiceOffersDescription('')
		setUserServiceOffersOptions([])
		reset()
	}

	/**
	 * onSubmit function called when the form is submitted
	 * @param data
	 */
	const onSubmit = data => {
		// replace all ";" with "\n" in userServiceOffersPrice
		const newPrice = userServiceOffersPrice.replace(/;/g, '\n')

		// replace all ";" with "\n" in each option's price
		const newOptions = userServiceOffersOptions.map(option => {
			const newOptionPrice = option.price.replace(/;/g, '\n')
			return { ...option, price: newOptionPrice }
		})

		// add a new serviceOffers to the user serviceOffers only if the form is valid
		// check if the serviceOffers is already in the user serviceOffers
		const serviceOffersAlreadyInUserServiceOffers = userServiceOffers.filter(
			service_offers =>
				service_offers.name === userServiceOffersName &&
				service_offers.price === userServiceOffersPrice &&
				service_offers.description === userServiceOffersDescription &&
				JSON.stringify(service_offers.options) ===
					JSON.stringify(userServiceOffersOptions)
		)
		// if the service_offers is not already in the service_offers courses, add it
		if (serviceOffersAlreadyInUserServiceOffers.length === 0) {
			if (userServiceOffersId !== '') {
				// if the service_offers is already in the service_offers courses, update it
				const userServiceOffersCopy = userServiceOffers.map(serviceOffer => {
					if (serviceOffer.id === userServiceOffersId) {
						return {
							id: serviceOffer.id,
							name: userServiceOffersName,
							price: newPrice,
							description: userServiceOffersDescription,
							options: newOptions,
						}
					} else {
						return serviceOffer
					}
				})

				setUserServiceOffers(userServiceOffersCopy)
				setResetFormState()
			} else {
				// if the service_offers is not already in the service_offers courses, add it
				if (data) {
					setUserServiceOffers([
						...userServiceOffers,
						{
							id: 'added' + userServiceOffersName + userServiceOffersPrice,
							name: userServiceOffersName,
							price: newPrice,
							description: userServiceOffersDescription,
							options: newOptions,
						},
					])
					setResetFormState()
				}
			}
		}
	}

	const handleSubmitServiceOffers = event => {
		// copy userServiceOffers to data, but remove the id field (only if the id start by "added"),
		// and in the options array, remove the id field on each object too (only if the id start by "added")
		let userServiceOffersCopy = []
		if (userServiceOffersId === '') {
			userServiceOffersCopy = userServiceOffers.map(serviceOffer => {
				if (
					serviceOffer &&
					serviceOffer?.id &&
					serviceOffer.id.toString().startsWith('added')
				) {
					const options = serviceOffer.options.map(option => {
						if (
							option &&
							option?.id &&
							option.id.toString().startsWith('added')
						) {
							return {
								name: option.name,
								price: option.price,
								description: option.description,
							}
						} else {
							return option
						}
					})
					return {
						name: serviceOffer.name,
						price: serviceOffer.price,
						description: serviceOffer.description,
						options: options,
					}
				} else {
					const options = serviceOffer.options.map(option => {
						if (
							option &&
							option?.id &&
							option.id.toString().startsWith('added')
						) {
							return {
								name: option.name,
								price: option.price,
								description: option.description,
							}
						} else {
							return option
						}
					})
					return {
						name: serviceOffer.name,
						price: serviceOffer.price,
						description: serviceOffer.description,
						options: options,
					}
				}
			})
		} else {
			userServiceOffersCopy = userServiceOffers.map(serviceOffer => {
				const options = serviceOffer.options.map(option => {
					if (
						option &&
						option?.id &&
						option.id.toString().startsWith('added')
					) {
						return {
							name: option.name,
							price: option.price,
							description: option.description,
						}
					} else {
						return option
					}
				})
				return {
					name: serviceOffer.name,
					price: serviceOffer.price,
					description: serviceOffer.description,
					options: options,
				}
			})
		}

		const updatedUser = { ...user }
		updatedUser.service_offers = userServiceOffersCopy

		// set data
		const data = {
			service_offers: userServiceOffersCopy,
		}
		patchMeMakeup(session, data)
		// close the modal & reset the zod form
		setUserServiceOffersId('')
		setUserServiceOffersName('')
		setUserServiceOffersPrice('')
		setUserServiceOffersDescription('')
		setUserServiceOffersOptions([])

		let userTemp = user
		userTemp.service_offers = userServiceOffersCopy
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

	const handleUpdateServiceOffersName = event => {
		setUserServiceOffersName(event.target.value)
	}

	const handleUpdateServiceOffersPrice = event => {
		setUserServiceOffersPrice(event.target.value)
	}

	const handleUpdateServiceOffersDescription = event => {
		setUserServiceOffersDescription(event.target.value)
	}

	const handleAddServiceOffersOption = () => {
		const userServiceOffersOptionsUpdated = [
			...userServiceOffersOptions,
			{
				id: 'added' + userServiceOffersOptions.length,
				name: '',
				price: '',
				description: '',
			},
		]

		setUserServiceOffersOptions(userServiceOffersOptionsUpdated)
	}

	const handleEditServiceOffers = id => {
		const userServiceOffersFiltered = userServiceOffers.filter(
			service_offers => service_offers.id === id
		)

		// replace all ";" with "\n" in userServiceOffersPrice
		const newPrice = userServiceOffersFiltered[0].price.replace(/\n/g, ';')

		// replace all ";" with "\n" in each option's price
		const newOptions = userServiceOffersFiltered[0].options.map(option => {
			const newOptionPrice = option.price.replace(/\n/g, ';')
			return { ...option, price: newOptionPrice }
		})

		reset()
		setUserServiceOffersId(userServiceOffersFiltered[0].id)
		setUserServiceOffersName(userServiceOffersFiltered[0].name)
		setUserServiceOffersPrice(newPrice)
		setUserServiceOffersDescription(userServiceOffersFiltered[0].description)
		setUserServiceOffersOptions(newOptions)
	}

	const handleDeleteServiceOffers = id => {
		const userServiceOffersFiltered = userServiceOffers.filter(
			service_offers => service_offers.id !== id
		)
		setUserServiceOffers(userServiceOffersFiltered)
	}

	// reset the form when the modal is closed
	useEffect(() => {
		if (!open) {
			setUserServiceOffers(user.service_offers)
			setUserServiceOffersId('')
			setUserServiceOffersName('')
			setUserServiceOffersPrice('')
			setUserServiceOffersDescription('')
			setUserServiceOffersOptions([])
			reset()
		}
	}, [open, reset, user.service_offers])

	useEffect(() => {
		if (user && user.service_offers) {
			const serviceOffersWithId = user.service_offers.map(
				(serviceOffer, index) => {
					return {
						id: index,
						name: serviceOffer.name,
						price: serviceOffer.price,
						description: serviceOffer.description,
						options: serviceOffer.options,
					}
				}
			)
			setUserServiceOffers(serviceOffersWithId)
		} else {
			setUserServiceOffers([])
		}
	}, [open, user])

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
					enterFrom="opaserviceOffers-0"
					enterTo="opaserviceOffers-100"
					leave="ease-in duration-200"
					leaveFrom="opaserviceOffers-100"
					leaveTo="opaserviceOffers-0"
				>
					<div className="bg-opaserviceOffers-75 transition-opaserviceOffers fixed inset-0 bg-gray-500" />
				</Transition.Child>

				<div className="fixed inset-0 z-30 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opaserviceOffers-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opaserviceOffers-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opaserviceOffers-100 translate-y-0 sm:scale-100"
							leaveTo="opaserviceOffers-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative w-full transform rounded-lg bg-white p-8 text-left shadow-2xl transition-all sm:max-w-7xl">
								<button
									type="button"
									onClick={props.handleIsModalOpen}
									ref={cancelButtonRef}
									className={
										'absolute right-0 top-0 m-6 flex items-center justify-center'
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
											Les services que vous proposez
										</Dialog.Title>
									</div>
									<div
										className={
											'flex h-full w-full flex-wrap gap-16 md:flex-nowrap'
										}
									>
										<div
											className={
												'max-h-[600px] w-full overflow-y-scroll  pr-4 md:w-2/5'
											}
										>
											<div className="grid grid-cols-1 gap-4">
												<div className={'flex flex-col gap-4'}>
													<form
														onSubmit={handleSubmit(onSubmit)}
														method="POST"
														className="flex flex-col gap-4"
													>
														<div>
															<label
																htmlFor="name"
																className="block text-sm text-gray-700"
															>
																Nom de la prestation
															</label>
															<div className="mt-2">
																<input
																	data-cy="name-service-offers-input"
																	id="name"
																	name="name"
																	type={'text'}
																	{...register('name', {
																		required: true,
																	})}
																	required
																	value={userServiceOffersName ?? ''}
																	onChange={handleUpdateServiceOffersName}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.name && (
																	<p
																		data-cy={'error-name'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.name.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="description"
																className="block text-sm text-gray-700"
															>
																{'Description de la prestation'}
															</label>
															<div className="mt-2">
																<textarea
																	data-cy="description-service-offers-input"
																	id="description"
																	name="description"
																	{...register('description', {
																		required: true,
																	})}
																	required
																	value={userServiceOffersDescription ?? ''}
																	onChange={
																		handleUpdateServiceOffersDescription
																	}
																	className="block min-h-[150px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.description && (
																	<p
																		data-cy={'error-description'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.description.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="price"
																className="block text-sm text-gray-700"
															>
																Prix de la prestation
															</label>
															<p className={'text-xs italic text-gray-700/70'}>
																Vous pouvez ajouter plusieurs formules/prix en
																les séparant par un point-virgule.
															</p>
															<div className="mt-2">
																<input
																	data-cy="price-service-offers-input"
																	id="price"
																	name="price"
																	type={'text'}
																	{...register('price', {
																		required: true,
																	})}
																	required
																	value={userServiceOffersPrice ?? ''}
																	onChange={handleUpdateServiceOffersPrice}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.price && (
																	<p
																		data-cy={'error-price'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.price.message}
																	</p>
																)}
															</div>
														</div>
													</form>
													{/* loop on table of options */}
													<div>
														{userServiceOffersOptions.map((option, index) => (
															<div
																key={index}
																className={
																	'flex w-full flex-col gap-4 py-4 pl-8'
																}
															>
																<h3
																	className={
																		'text-sm font-semibold text-gray-900'
																	}
																>
																	Option {index + 1}
																</h3>
																<div>
																	<label
																		htmlFor="name"
																		className="block text-sm text-gray-700"
																	>
																		Nom de la prestation
																	</label>
																	<div className="relative mt-2">
																		<input
																			data-cy={`name-service-offers-option-input-${index}`}
																			id={`services[${index}].name`}
																			name={`services[${index}].name`}
																			type={'text'}
																			{...register(`services[${index}].name`, {
																				required: true,
																			})}
																			required
																			onChange={event => {
																				// 	change the name value of the correct option
																				setUserServiceOffersOptions(
																					userServiceOffersOptions.map(
																						(option, optionIndex) => {
																							if (optionIndex === index) {
																								return {
																									...option,
																									name: event.target.value,
																								}
																							}
																							return option
																						}
																					)
																				)
																			}}
																			value={
																				userServiceOffersOptions[index].name
																			}
																			className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																		/>
																		{errors.services &&
																			errors.services[index] &&
																			errors.services[index].name && (
																				<p
																					data-cy={`error-name-${index}`}
																					className={
																						'mt-2 text-xs text-red-500/80'
																					}
																				>
																					{errors.services[index].name.message}
																				</p>
																			)}
																	</div>
																</div>
																<div>
																	<label
																		htmlFor="description"
																		className="block text-sm text-gray-700"
																	>
																		{'Description de la prestation'}
																	</label>
																	<div className="mt-2">
																		<textarea
																			data-cy={`description-service-offers-option-input-${index}`}
																			id={`services[${index}].description`}
																			name={`services[${index}].description`}
																			{...register(
																				`services[${index}].description`,
																				{
																					required: true,
																				}
																			)}
																			required
																			onChange={event => {
																				// 	change the name value of the correct option
																				setUserServiceOffersOptions(
																					userServiceOffersOptions.map(
																						(option, optionIndex) => {
																							if (optionIndex === index) {
																								return {
																									...option,
																									description:
																										event.target.value,
																								}
																							}
																							return option
																						}
																					)
																				)
																			}}
																			value={
																				userServiceOffersOptions[index]
																					.description
																			}
																			className="block min-h-[150px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																		/>
																		{errors.services &&
																			errors.services[index] &&
																			errors.services[index].description && (
																				<p
																					data-cy={`error-description-${index}`}
																					className={
																						'mt-2 text-xs text-red-500/80'
																					}
																				>
																					{
																						errors.services[index].description
																							.message
																					}
																				</p>
																			)}
																	</div>
																</div>
																<div>
																	<label
																		htmlFor="price"
																		className="block text-sm text-gray-700"
																	>
																		Prix de la prestation
																	</label>
																	<p
																		className={
																			'text-xs italic text-gray-700/70'
																		}
																	>
																		Vous pouvez ajouter plusieurs formules/prix
																		en les séparant par un point-virgule.
																	</p>
																	<div className="mt-2">
																		<input
																			data-cy={`price-service-offers-option-input-${index}`}
																			id={`services[${index}].price`}
																			name={`services[${index}].price`}
																			type={'text'}
																			{...register(`services[${index}].price`, {
																				required: true,
																			})}
																			required
																			onChange={event => {
																				// 	change the name value of the correct option
																				setUserServiceOffersOptions(
																					userServiceOffersOptions.map(
																						(option, optionIndex) => {
																							if (optionIndex === index) {
																								return {
																									...option,
																									price: event.target.value,
																								}
																							}
																							return option
																						}
																					)
																				)
																			}}
																			value={
																				userServiceOffersOptions[index].price
																			}
																			className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																		/>
																		{errors.services &&
																			errors.services[index] &&
																			errors.services[index].price && (
																				<p
																					data-cy={`error-price-${index}`}
																					className={
																						'mt-2 text-xs text-red-500/80'
																					}
																				>
																					{errors.services[index].price.message}
																				</p>
																			)}
																	</div>
																</div>
															</div>
														))}
													</div>
													<div
														className={'flex w-full items-center justify-start'}
													>
														<button
															data-cy={'add-service-offers-option-button'}
															className={
																'flex w-full items-center justify-center gap-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
															}
															onClick={handleAddServiceOffersOption}
														>
															<span className={'text-gray-700'}>
																Ajouter une option à la prestation
															</span>
															<span className="material-icons-round text-base text-gray-900">
																add
															</span>
														</button>
													</div>
													<div className={'flex items-center justify-end'}>
														<button
															data-cy={'add-service-offers-button'}
															type="button"
															className="btn-primary"
															onClick={handleSubmit(onSubmit)}
														>
															{userServiceOffersId === ''
																? 'Ajouter une prestation'
																: 'Modifier une prestation'}
														</button>
													</div>
												</div>
											</div>
										</div>
										<div
											className={
												'flex max-h-[600px] w-full flex-col gap-4 overflow-y-scroll rounded-2xl border border-gray-300 p-4 pr-4 pt-6 md:w-3/5 md:rounded-none md:border-none md:p-0'
											}
										>
											{/*	display the serviceOffers already added */}
											<h3 className={'text-sm text-gray-900'}>
												Les services déjà ajoutés
											</h3>
											<div className={'flex w-full flex-col gap-4 '}>
												<Tab.Group>
													<Tab.List
														className={
															'flex w-full flex-col justify-center py-4 md:flex-row'
														}
													>
														{userServiceOffers.map((service_offer, index) => {
															return (
																<Tab
																	key={index}
																	className={
																		'h-full w-full border-b border-gray-300 bg-gray-50/30 p-4 text-xs text-gray-600 hover:bg-gray-50/50 focus:outline-none ' +
																		// 	aria selected
																		' aria-selected:border-b-2 aria-selected:border-indigo-800 aria-selected:font-semibold aria-selected:text-gray-900'
																	}
																>
																	{service_offer.name}
																</Tab>
															)
														})}
													</Tab.List>
													<Tab.Panels>
														{userServiceOffers.map((service_offer, index) => {
															return (
																<Tab.Panel key={index}>
																	<div
																		className={
																			'relative flex flex-col gap-4 bg-white py-4'
																		}
																	>
																		<div
																			className={
																				'absolute -top-6 right-0 m-2 flex items-center justify-center gap-4 md:top-0'
																			}
																		>
																			<button
																				data-cy={`edit-service-offers-button-${index}`}
																				className={
																					'flex items-center justify-center'
																				}
																				onClick={() =>
																					handleEditServiceOffers(
																						service_offer.id
																					)
																				}
																			>
																				<span className="material-icons-round text-xl text-orange-600">
																					edit
																				</span>
																			</button>
																			<button
																				data-cy="delete-service-offers-button"
																				className={
																					'flex items-center justify-center'
																				}
																				onClick={() =>
																					handleDeleteServiceOffers(
																						service_offer.id
																					)
																				}
																			>
																				<span className="material-icons-round text-xl text-red-500">
																					delete
																				</span>
																			</button>
																		</div>
																		<div className={'flex flex-col'}>
																			<h2
																				className={
																					'text-start text-lg font-bold text-indigo-900'
																				}
																			>
																				{service_offer.name}
																			</h2>
																		</div>
																		<DescriptionPriceOffer
																			serviceOffer={service_offer}
																		/>
																	</div>
																	<div
																		className={
																			'flex w-full flex-col gap-2 py-2'
																		}
																	>
																		<OptionsOffers
																			serviceOffer={service_offer}
																		/>
																	</div>
																</Tab.Panel>
															)
														})}
													</Tab.Panels>
												</Tab.Group>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4 flex justify-end">
									<button
										data-cy="save-button-service-offers"
										type="button"
										className="btn-primary"
										onClick={handleSubmitServiceOffers}
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
