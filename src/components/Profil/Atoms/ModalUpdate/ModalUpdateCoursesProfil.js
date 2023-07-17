import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import * as zod from 'zod'
import { patchMeMakeup } from '@/services/PatchMeMakeup'

const schema = zod
	.object({
		id: zod.string().optional(),
		diploma: zod
			.string({ required_error: 'Le nom du diplôme est requis.' })
			.min(1, 'Le nom du diplôme est requis.')
			.max(70, 'Le nom du diplôme ne doit pas dépasser 70 caractères.'),
		school: zod
			.string({ required_error: "Le nom de l'école est requis." })
			.min(1, "Le nom de l'école est requis.")
			.max(70, "Le nom de l'école ne doit pas dépasser 70 caractères."),
		date_graduation: zod
			.string({
				required_error: "La date d'obtention du diplôme est requise.",
			})
			.min(1, "La date d'obtention du diplôme est requise."),
		course_description: zod
			.string({
				required_error: 'La description est requise.',
			})
			.min(1, 'La description est requise.')
			.max(2000, 'La description ne doit pas dépasser 2000 caractères.'),
	})
	.required({
		diploma: true,
		school: true,
		date_graduation: true,
		course_description: true,
	})

export default function ModalUpdateCoursesProfil(props) {
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
	// course_description
	const [userCourses, setUserCourses] = useState(user.courses ?? [])
	const [userCoursesId, setUserCoursesId] = useState('')
	const [userCoursesDiploma, setUserCoursesDiploma] = useState('')
	const [userCoursesSchool, setUserCoursesSchool] = useState('')
	const [userCoursesDateGraduation, setUserCoursesDateGraduation] = useState('')
	const [userCoursesDescription, setUserCoursesDescription] = useState('')

	const { data: session } = useSession()

	/**
	 * onSubmit function called when the form is submitted
	 * @param data
	 */
	const onSubmit = data => {
		// add a new course to the user courses only if the form is valid
		// check if the course is already in the user courses
		const courseAlreadyInUserCourses = userCourses.filter(
			course =>
				course.diploma === userCoursesDiploma &&
				course.school === userCoursesSchool &&
				course.date_graduation === userCoursesDateGraduation &&
				course.course_description === userCoursesDescription
		)
		// if the course is not already in the user courses, add it
		if (courseAlreadyInUserCourses.length === 0) {
			// if the course id is not empty, it means that we are updating a course
			if (userCoursesId !== '') {
				// 	then update the course, replace the course with the same id by the new course
				const userCoursesUpdated = userCourses.map(course => {
					if (course.id === userCoursesId) {
						return {
							id: userCoursesId,
							diploma: userCoursesDiploma,
							school: userCoursesSchool,
							date_graduation: userCoursesDateGraduation,
							course_description: userCoursesDescription,
						}
					} else {
						return course
					}
				})
				setUserCourses(userCoursesUpdated)

				// reset the form
				reset()
				setUserCoursesId('')
				setUserCoursesDiploma('')
				setUserCoursesSchool('')
				setUserCoursesDateGraduation('')
				setUserCoursesDescription('')
			} else {
				if (data) {
					const userCoursesUpdated = [
						...userCourses,
						{
							id: 'added' + userCoursesDiploma + userCoursesSchool,
							diploma: userCoursesDiploma,
							school: userCoursesSchool,
							date_graduation: userCoursesDateGraduation,
							course_description: userCoursesDescription,
						},
					]
					setUserCourses(userCoursesUpdated)
					// reset the form
					setUserCoursesId('')
					setUserCoursesDiploma('')
					setUserCoursesSchool('')
					setUserCoursesDateGraduation('')
					setUserCoursesDescription('')
					reset()
				}
			}
		}
	}

	const handleSubmitCourses = event => {
		// clean the courses, remove the id field from the courses, only if the id is not empty
		let userCoursesCleaned = []
		if (userCoursesId === '') {
			userCoursesCleaned = userCourses.map(course => {
				const { id, ...rest } = course
				return rest
			})
		} else {
			userCoursesCleaned = userCourses
		}
		const data = {
			courses: userCoursesCleaned,
		}
		patchMeMakeup(session, data)
		// close the modal & reset the zod form
		setUserCoursesId('')
		setUserCoursesDiploma('')
		setUserCoursesSchool('')
		setUserCoursesDateGraduation('')
		setUserCoursesDescription('')

		let userTemp = user
		userTemp.courses = userCoursesCleaned
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

	const handleUpdateCoursesDiploma = event => {
		setUserCoursesDiploma(event.target.value)
	}

	const handleUpdateCoursesSchool = event => {
		setUserCoursesSchool(event.target.value)
	}

	const handleUpdateCoursesDateGraduation = event => {
		setUserCoursesDateGraduation(event.target.value)
	}

	const handleUpdateCoursesDescription = event => {
		setUserCoursesDescription(event.target.value)
	}

	const handleDeleteCourse = id => {
		const userCoursesFiltered = userCourses.filter(course => course.id !== id)
		setUserCourses(userCoursesFiltered)
	}

	const handleEditCourse = id => {
		// const userCoursesFiltered = userCourses.filter(course => course.id !== id)
		// setUserCourses(userCoursesFiltered)
		// set the form with the course to update
		const courseToUpdate = userCourses.filter(course => course.id === id)
		reset()
		setUserCoursesId(courseToUpdate[0].id)
		setUserCoursesDiploma(courseToUpdate[0].diploma)
		setUserCoursesSchool(courseToUpdate[0].school)
		setUserCoursesDateGraduation(courseToUpdate[0].date_graduation)
		setUserCoursesDescription(courseToUpdate[0].course_description)
	}

	// reset the form when the modal is closed
	useEffect(() => {
		if (!open) {
			setUserCoursesId('')
			setUserCoursesDiploma('')
			setUserCoursesSchool('')
			setUserCoursesDateGraduation('')
			setUserCoursesDescription('')
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
					enterFrom="opacourses-0"
					enterTo="opacourses-100"
					leave="ease-in duration-200"
					leaveFrom="opacourses-100"
					leaveTo="opacourses-0"
				>
					<div className="bg-opacourses-75 transition-opacourses fixed inset-0 bg-gray-500" />
				</Transition.Child>

				<div className="fixed inset-0 z-30 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacourses-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacourses-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacourses-100 translate-y-0 sm:scale-100"
							leaveTo="opacourses-0 translate-y-4 sm:translate-y-0 sm:scale-95"
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
											Les formations & diplômes que vous avez suivis
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
																htmlFor="diploma"
																className="block text-sm text-gray-700"
															>
																Nom de la formation ou du diplôme
															</label>
															<div className="mt-2">
																<input
																	data-cy={'diploma-input'}
																	id="diploma"
																	name="diploma"
																	type={'text'}
																	{...register('diploma')}
																	value={userCoursesDiploma ?? ''}
																	onChange={handleUpdateCoursesDiploma}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.diploma && (
																	<p
																		data-cy={'error-diploma'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.diploma.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="school"
																className="block text-sm text-gray-700"
															>
																{"Nom de l'école ou de l'organisme"}
															</label>
															<div className="mt-2">
																<input
																	data-cy="school-input"
																	id="school"
																	name="school"
																	type={'text'}
																	{...register('school')}
																	value={userCoursesSchool ?? ''}
																	onChange={handleUpdateCoursesSchool}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.school && (
																	<p
																		data-cy={'error-school'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.school.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="date_graduation"
																className="block text-sm text-gray-700"
															>
																{"Date d'obtention du diplôme"}
															</label>
															<div className="mt-2">
																<input
																	data-cy="date-graduation-input"
																	id="date_graduation"
																	name="date_graduation"
																	type={'date'}
																	{...register('date_graduation')}
																	value={userCoursesDateGraduation ?? ''}
																	onChange={handleUpdateCoursesDateGraduation}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.date_graduation && (
																	<p
																		data-cy={'error-date-graduation'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.date_graduation.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="course_description"
																className="block text-sm text-gray-700"
															>
																Description, ce que vous avez appris
															</label>
															<div className="mt-2">
																<textarea
																	data-cy="course-description-input"
																	id="course_description"
																	name="course_description"
																	{...register('course_description')}
																	value={userCoursesDescription ?? ''}
																	onChange={handleUpdateCoursesDescription}
																	className="block min-h-[200px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.course_description && (
																	<p
																		data-cy={'error-course-description'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.course_description.message}
																	</p>
																)}
															</div>
														</div>
													</form>
													<div className={'flex items-center justify-end'}>
														<button
															data-cy="add-course-button"
															type="button"
															className="btn-primary"
															onClick={handleSubmit(onSubmit)}
														>
															{userCoursesId === ''
																? 'Ajouter une formation / diplôme'
																: 'Modifier la formation / diplôme'}
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className={'flex w-full flex-col gap-4 md:w-3/5'}>
											{/*	display the courses already added */}
											<h3 className={'text-sm text-gray-900'}>
												Les formations & diplômes déjà ajoutés
											</h3>
											<div
												className={
													'flex max-h-[600px] w-full flex-col gap-4 overflow-y-scroll'
												}
											>
												{userCourses.map((course, index) => {
													return (
														<div
															key={index}
															className={
																'relative flex w-full rounded bg-indigo-50/20 p-4 text-gray-700'
															}
														>
															<div
																className={
																	'absolute right-0 top-0 m-2 flex items-center justify-center gap-4'
																}
															>
																<button
																	data-cy={`course-edit-button-${index}`}
																	className={'flex items-center justify-center'}
																	onClick={() => handleEditCourse(course.id)}
																>
																	<span className="material-icons-round text-xl text-orange-600">
																		edit
																	</span>
																</button>
																<button
																	data-cy={'course-delete-button'}
																	className={'flex items-center justify-center'}
																	onClick={() => handleDeleteCourse(course.id)}
																>
																	<span className="material-icons-round text-xl text-red-500">
																		delete
																	</span>
																</button>
															</div>
															<span className="material-icons-round text-indigo-900">
																school
															</span>
															<div
																className={'ml-2 flex w-full flex-col gap-2'}
															>
																<div className={'flex flex-col'}>
																	<p
																		className={
																			'w-4/5 font-semibold text-gray-700 md:w-full'
																		}
																	>
																		{course.diploma}
																	</p>
																	<div className={'flex justify-between'}>
																		<p
																			className={'text-sm italic text-gray-600'}
																		>
																			{course.school}
																		</p>
																		<p
																			className={'text-sm italic text-gray-600'}
																		>
																			{course.date_graduation}
																		</p>
																	</div>
																</div>
																<div>
																	{
																		// display the user description
																		// if \n is present, split the string and display each part in a new line
																		course.course_description
																			.split('\n')
																			.map((item, i) => {
																				return (
																					<p
																						key={i}
																						className={
																							'text-sm italic text-gray-500'
																						}
																					>
																						{item}
																					</p>
																				)
																			})
																	}
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
										data-cy="save-button-courses"
										type="button"
										className="btn-primary"
										onClick={handleSubmitCourses}
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
