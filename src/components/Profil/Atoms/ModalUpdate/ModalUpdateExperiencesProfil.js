import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import * as zod from 'zod'
import { patchMeMakeup } from '@/services/PatchMeMakeup'

const schema = zod
	.object({
		company: zod
			.string({
				required_error: "Le nom de l'entreprise est requise.",
			})
			.min(1, "Le nom de l'entreprise est requis.")
			.max(70, "Le nom de l'entreprise ne doit pas dépasser 70 caractères."),
		job_name: zod
			.string({
				required_error: "Le nom de l'expérience est requis.",
			})
			.min(1, "Le nom de l'expérience est requis.")
			.max(70, "Le nom de l'expérience ne doit pas dépasser 70 caractères."),
		city: zod
			.string({ required_error: 'La ville est requise.' })
			.min(1, 'La ville est requise.')
			.max(70, 'La ville ne doit pas dépasser 70 caractères.'),
		date_start: zod.string({
			required_error: "La date de début de l'expérience est requise.",
		}),
		date_end: zod.string().optional(),
		description: zod
			.string({ required_error: 'La description est requise.' })
			.min(1, 'La description est requise.')
			.max(2000, 'La description ne doit pas dépasser 2000 caractères.'),
	})
	.required({
		company: true,
		job_name: true,
		city: true,
		date_start: true,
		description: true,
	})

export default function ModalUpdateExperiencesProfil(props) {
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
	// diploma
	// school
	// date_graduation
	// experience_description
	const [userExperiences, setUserExperiences] = useState(user.experiences ?? [])
	const [userExperiencesId, setUserExperiencesId] = useState('')
	const [userExperiencesCompany, setUserExperiencesCompany] = useState('')
	const [userExperiencesJobName, setUserExperiencesJobName] = useState('')
	const [userExperiencesCity, setUserExperiencesCity] = useState('')
	const [userExperiencesDateStart, setUserExperiencesDateStart] = useState('')
	const [userExperiencesDateEnd, setUserExperiencesDateEnd] = useState('')
	const [userExperiencesDescription, setUserExperiencesDescription] =
		useState('')

	const { data: session } = useSession()

	/**
	 * onSubmit function called when the form is submitted
	 * @param data
	 */
	const onSubmit = data => {
		// add a new experience to the user courses only if the form is valid
		// check if the experience is already in the user courses
		const experienceAlreadyInUserExperiences = userExperiences.filter(
			experience =>
				experience.company === userExperiencesCompany &&
				experience.job_name === userExperiencesJobName &&
				experience.city === userExperiencesCity &&
				experience.date_start === userExperiencesDateStart &&
				experience.date_end === userExperiencesDateEnd &&
				experience.description === userExperiencesDescription
		)
		// if the experience is not already in the user courses, add it
		if (experienceAlreadyInUserExperiences.length === 0) {
			// if the experience has an id, it's an existing experience
			if (userExperiencesId !== '') {
				// 	then update the experience
				const userExperiencesUpdated = userExperiences.map(experience => {
					if (experience.id === userExperiencesId) {
						experience.company = userExperiencesCompany
						experience.job_name = userExperiencesJobName
						experience.city = userExperiencesCity
						experience.date_start = userExperiencesDateStart
						experience.date_end = userExperiencesDateEnd
						experience.description = userExperiencesDescription
					}
					return experience
				})
				setUserExperiences(userExperiencesUpdated)
				// reset the form
				setUserExperiencesId('')
				setUserExperiencesCompany('')
				setUserExperiencesJobName('')
				setUserExperiencesCity('')
				setUserExperiencesDateStart('')
				setUserExperiencesDateEnd('')
				setUserExperiencesDescription('')
				reset()
			} else {
				if (data) {
					const userExperiencesUpdated = [
						...userExperiences,
						{
							id: 'added' + userExperiencesCompany + userExperiencesJobName,
							company: userExperiencesCompany,
							job_name: userExperiencesJobName,
							city: userExperiencesCity,
							date_start: userExperiencesDateStart,
							date_end: userExperiencesDateEnd,
							description: userExperiencesDescription,
						},
					]
					setUserExperiences(userExperiencesUpdated)
					// reset the form
					setUserExperiencesId('')
					setUserExperiencesCompany('')
					setUserExperiencesJobName('')
					setUserExperiencesCity('')
					setUserExperiencesDateStart('')
					setUserExperiencesDateEnd('')
					setUserExperiencesDescription('')
					reset()
				}
			}
		}
	}

	const handleSubmitExperiences = event => {
		// clean the experiences, remove the id field
		let userExperiencesCleaned = userExperiences.map(experience => {
			const { id, ...rest } = experience
			// replace the date_end field if it's empty by null
			if (rest.date_end === '') {
				rest.date_end = null
			}
			return rest
		})

		const data = {
			experiences: userExperiencesCleaned,
		}
		patchMeMakeup(session, data)
		// close the modal & reset the zod form
		setUserExperiencesId('')
		setUserExperiencesCompany('')
		setUserExperiencesJobName('')
		setUserExperiencesCity('')
		setUserExperiencesDateStart('')
		setUserExperiencesDateEnd('')
		setUserExperiencesDescription('')

		let userTemp = user
		userTemp.experiences = userExperiencesCleaned
		// to change to object reference
		const newUser = JSON.parse(JSON.stringify(userTemp))
		props.handleUpdateUser(newUser)

		// formState.reset()
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

	const handleUpdateExperiencesCompany = event => {
		setUserExperiencesCompany(event.target.value)
	}

	const handleUpdateExperiencesJobName = event => {
		setUserExperiencesJobName(event.target.value)
	}

	const handleUpdateExperiencesCity = event => {
		setUserExperiencesCity(event.target.value)
	}

	const handleUpdateExperiencesDateStart = event => {
		setUserExperiencesDateStart(event.target.value)
	}

	const handleUpdateExperiencesDateEnd = event => {
		setUserExperiencesDateEnd(event.target.value)
	}

	const handleUpdateExperiencesDescription = event => {
		setUserExperiencesDescription(event.target.value)
	}

	const handleDeleteExperience = id => {
		const userExperiencesFiltered = userExperiences.filter(
			experience => experience.id !== id
		)
		setUserExperiences(userExperiencesFiltered)
	}

	const handleEditExperience = id => {
		const userExperiencesToUpdate = userExperiences.filter(
			experience => experience.id === id
		)
		reset()
		setUserExperiencesId(userExperiencesToUpdate[0].id)
		setUserExperiencesCompany(userExperiencesToUpdate[0].company)
		setUserExperiencesJobName(userExperiencesToUpdate[0].job_name)
		setUserExperiencesCity(userExperiencesToUpdate[0].city)
		setUserExperiencesDateStart(userExperiencesToUpdate[0].date_start)
		setUserExperiencesDateEnd(userExperiencesToUpdate[0].date_end)
		setUserExperiencesDescription(userExperiencesToUpdate[0].description)
	}

	// reset the form when the modal is closed
	useEffect(() => {
		if (!open) {
			setUserExperiencesId('')
			setUserExperiencesCompany('')
			setUserExperiencesJobName('')
			setUserExperiencesCity('')
			setUserExperiencesDateStart('')
			setUserExperiencesDateEnd('')
			setUserExperiencesDescription('')
			reset()
		}
	}, [open, reset])

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
					enterFrom="opaexperiences-0"
					enterTo="opaexperiences-100"
					leave="ease-in duration-200"
					leaveFrom="opaexperiences-100"
					leaveTo="opaexperiences-0"
				>
					<div className="bg-opaexperiences-75 transition-opaexperiences fixed inset-0 bg-gray-500" />
				</Transition.Child>

				<div className="fixed inset-0 z-30 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opaexperiences-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opaexperiences-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opaexperiences-100 translate-y-0 sm:scale-100"
							leaveTo="opaexperiences-0 translate-y-4 sm:translate-y-0 sm:scale-95"
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
											Les expériences professionnelles que vous avez
										</Dialog.Title>
									</div>
									<div
										className={
											'flex h-full w-full flex-wrap gap-16 md:flex-nowrap'
										}
									>
										<div className={'w-full md:w-2/5'}>
											<div className="grid grid-cols-1 gap-4">
												<div className={'flex flex-col gap-4'}>
													<form
														onSubmit={handleSubmit(onSubmit)}
														method="POST"
														className="flex flex-col gap-4"
													>
														<div>
															<label
																htmlFor="company"
																className="block text-sm text-gray-700"
															>
																{"Nom de l'entreprise"}
															</label>
															<div className="mt-2">
																<input
																	data-cy="company-input"
																	id="company"
																	name="company"
																	type={'text'}
																	{...register('company', {
																		required: true,
																	})}
																	required
																	value={userExperiencesCompany ?? ''}
																	onChange={handleUpdateExperiencesCompany}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.company && (
																	<p
																		data-cy={'error-company'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.company.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="job_name"
																className="block text-sm text-gray-700"
															>
																Nom du poste
															</label>
															<div className="mt-2">
																<input
																	data-cy="job-name-input"
																	id="job_name"
																	name="job_name"
																	type={'text'}
																	{...register('job_name', {
																		required: true,
																	})}
																	required
																	value={userExperiencesJobName ?? ''}
																	onChange={handleUpdateExperiencesJobName}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.job_name && (
																	<p
																		data-cy={'error-job-name'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.job_name.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="city"
																className="block text-sm text-gray-700"
															>
																Nom de la ville
															</label>
															<div className="mt-2">
																<input
																	data-cy="city-input"
																	id="city"
																	name="city"
																	type={'text'}
																	{...register('city', {
																		required: true,
																	})}
																	required
																	value={userExperiencesCity ?? ''}
																	onChange={handleUpdateExperiencesCity}
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
																htmlFor="date_start"
																className="block text-sm text-gray-700"
															>
																Date de début
															</label>
															<div className="mt-2">
																<input
																	data-cy="date-start-input"
																	id="date_start"
																	name="date_start"
																	type={'date'}
																	{...register('date_start', {
																		required: true,
																	})}
																	required
																	value={userExperiencesDateStart ?? ''}
																	onChange={handleUpdateExperiencesDateStart}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.date_start && (
																	<p
																		data-cy={'error-date-start'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.date_start.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="date_end"
																className="block text-sm text-gray-700"
															>
																Date de fin (laisser vide si toujours en poste)
															</label>
															<div className="mt-2">
																<input
																	data-cy="date-end-input"
																	id="date_end"
																	name="date_end"
																	type={'date'}
																	{...register('date_end')}
																	value={userExperiencesDateEnd ?? ''}
																	onChange={handleUpdateExperiencesDateEnd}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.date_end && (
																	<p
																		data-cy={'error-date-end'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.date_end.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="description"
																className="block text-sm text-gray-700"
															>
																{"Description de l'expérience"}
															</label>
															<div className="mt-2">
																<textarea
																	data-cy="description-experience-input"
																	id="description"
																	name="description"
																	{...register('description', {
																		required: true,
																	})}
																	required
																	value={userExperiencesDescription ?? ''}
																	onChange={handleUpdateExperiencesDescription}
																	className="block min-h-[150px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.description && (
																	<p
																		data-cy={'error-description-experience'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.description.message}
																	</p>
																)}
															</div>
														</div>
													</form>
													<div className={'flex items-center justify-end'}>
														<button
															data-cy="add-experience-button"
															type="button"
															className="btn-primary"
															onClick={handleSubmit(onSubmit)}
														>
															{userExperiencesId === ''
																? 'Ajouter une expérience'
																: 'Modifier une expérience'}
														</button>
													</div>
												</div>
											</div>
										</div>
										<div
											className={'flex w-full flex-col gap-8 md:w-3/5 md:gap-4'}
										>
											{/*	display the experiences already added */}
											<h3 className={'text-sm text-gray-900'}>
												Les expériences déjà ajoutées
											</h3>
											<div
												className={
													'flex max-h-[600px] w-full flex-col gap-4 overflow-y-scroll pt-4 md:pt-0'
												}
											>
												{userExperiences.map((experience, index) => {
													return (
														<div
															key={index}
															className={
																'relative flex w-full rounded bg-indigo-50/20 p-4 pt-8 text-gray-700 md:pt-4'
															}
														>
															<div
																className={
																	'absolute -top-2 right-0 m-2 flex items-center justify-center gap-4 md:top-0'
																}
															>
																<button
																	data-cy={`experience-selected-${index}`}
																	className={'flex items-center justify-center'}
																	onClick={() =>
																		handleEditExperience(experience.id)
																	}
																>
																	<span className="material-icons-round text-xl text-orange-600">
																		edit
																	</span>
																</button>
																<button
																	data-cy={'experience-selected'}
																	className={'flex items-center justify-center'}
																	onClick={() =>
																		handleDeleteExperience(experience.id)
																	}
																>
																	<span className="material-icons-round text-xl text-red-500">
																		delete
																	</span>
																</button>
															</div>
															<span className="material-icons-round">
																apartment
															</span>
															<div
																className={'ml-2 flex w-full flex-col gap-2'}
															>
																<div className={'flex w-full flex-col'}>
																	<p className={'font-semibold text-gray-700'}>
																		{experience.company}
																	</p>
																	<div
																		className={'flex w-full justify-between'}
																	>
																		<p
																			className={'text-sm italic text-gray-600'}
																		>
																			{experience.job_name}
																		</p>
																		<p
																			className={'text-sm italic text-gray-600'}
																		>
																			{/* format date to month year ( like july 1998 )  */}
																			{/*{experience.date_start} - {experience.date_end}*/}
																			{new Date(
																				experience.date_start
																			).toLocaleString('fr-FR', {
																				year: 'numeric',
																				month: 'long',
																			})}
																			{' - '}
																			{experience.date_end === null ||
																			experience.date_end === ''
																				? "Aujourd'hui"
																				: new Date(
																						experience.date_end
																				  ).toLocaleString('fr-FR', {
																						year: 'numeric',
																						month: 'long',
																				  })}
																		</p>
																	</div>
																</div>
																<div>
																	<p className={'text-sm italic text-gray-500'}>
																		{experience.description}
																	</p>
																</div>
															</div>
														</div>
													)
												})}
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4 flex justify-end">
									<button
										data-cy="save-button-experience"
										type="button"
										className="btn-primary"
										onClick={handleSubmitExperiences}
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
