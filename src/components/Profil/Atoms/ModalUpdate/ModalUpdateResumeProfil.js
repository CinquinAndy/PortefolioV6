import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Switch, Transition } from '@headlessui/react'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useSession } from 'next-auth/react'
import { BadgeDispo } from '@/components/Profil/Atoms/BadgeDispo'
import { BadgeIndispo } from '@/components/Profil/Atoms/BadgeIndispo'
import { patchMeMakeup } from '@/services/PatchMeMakeup'
import { toast } from 'react-toastify'

const schema = zod
	.object({
		first_name: zod
			.string({ required_error: 'Le prénom est requis.' })
			.min(1, 'Le prénom est requis.')
			.max(70, 'Le prénom ne doit pas dépasser 70 caractères.'),
		last_name: zod
			.string({ required_error: 'Le nom est requis.' })
			.min(1, 'Le nom est requis.')
			.max(70, 'Le nom ne doit pas dépasser 70 caractères.'),
		speciality: zod
			.string({ required_error: 'La spécialité est requise.' })
			.min(1, 'La spécialité est requise.')
			.max(70, 'La spécialité ne doit pas dépasser 70 caractères.')
			.or(zod.literal('')),
		company_artist_name: zod
			.string({
				required_error: "Le nom d'entreprise / nom d'artiste est requis.",
			})
			.min(1, "Le nom de l'entreprise est requise.")
			.max(70, "Le nom de l'entreprise ne doit pas dépasser 70 caractères.")
			.or(zod.literal('')),
	})
	.required({
		first_name: true,
		last_name: true,
		speciality: true,
		company_artist_name: true,
	})

export default function ModalUpdateResumeProfil(props) {
	const user = props.user

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	})

	const [fileObj, setFileObj] = useState('')
	const [open, setOpen] = useState(props.isModalOpen)
	const [imageUrl, setImageUrl] = useState('')
	const [available, setAvailable] = useState(user.available)
	const [userLastName, setUserLastName] = useState(user.last_name ?? '')
	const [userFirstName, setUserFirstName] = useState(user.first_name ?? '')
	const [userSpeciality, setUserSpeciality] = useState(user.speciality ?? '')
	const [userCompanyOrArtist, setUserCompanyOrArtist] = useState(
		user.company_artist_name ?? ''
	)

	const { data: session } = useSession()

	const onSubmit = data => {
		data = {
			...data,
			available: available,
		}

		// 	upload file if fileObj is not empty
		if (fileObj !== '' && fileObj !== undefined && fileObj !== null) {
			const form = new FormData()
			form.append('files', fileObj)

			const res_post = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${session.jwt}`,
				},
				body: form,
			})
				.then(response => {
					return response.json()
				})
				.then(data_blob => {
					const newData = {
						...data,
						main_picture: data_blob[0],
					}

					// put data in api : with fetch : /api/makeup-artistes/{user.id}
					patchMeMakeup(session, newData)
					reset()
					props.handleIsModalOpen()
					props.handleProfilPicture(imageUrl)

					let userTemp = user
					userTemp.available = available
					userTemp.last_name = userLastName
					userTemp.first_name = userFirstName
					userTemp.speciality = userSpeciality
					userTemp.company_artist_name = userCompanyOrArtist
					userTemp.main_picture = data_blob[0]
					// to change to object reference
					const newUser = JSON.parse(JSON.stringify(userTemp))
					props.handleUpdateUser(newUser)

					setImageUrl('')
				})
				.catch(err =>
					toast('Une erreur est survenue, veuillez réessayer plus tard', {
						type: 'error',
						icon: '⛔',
						toastId: 'toast-alert',
					})
				)
		} else {
			patchMeMakeup(session, data)
			reset()

			props.handleProfilPicture(imageUrl)
			let userTemp = user
			userTemp.available = available
			userTemp.last_name = userLastName
			userTemp.first_name = userFirstName
			userTemp.speciality = userSpeciality
			userTemp.company_artist_name = userCompanyOrArtist
			// to change to object reference
			const newUser = JSON.parse(JSON.stringify(userTemp))
			props.handleUpdateUser(newUser)

			props.handleIsModalOpen()
			setImageUrl('')
		}
	}

	useEffect(() => {
		setOpen(props.isModalOpen)
		setAvailable(props.user.available)
	}, [props.isModalOpen])

	const cancelButtonRef = useRef(null)
	const inputRef = useRef(null)

	const handleClick = event => {
		// 👇️ open file input box on click of another element
		// 👇️ trigger click event on input element to open file dialog
		inputRef.current.click()
	}

	const handleFileChange = event => {
		const fileObject = event.target.files && event.target.files[0]
		if (!fileObject) {
			return
		}

		// Ajouter une vérification de la taille du fichier ici.
		if (fileObject.size > 1500000) {
			// Taille du fichier en octets (1.5MB)
			toast(
				'Le fichier est trop grand, veuillez télécharger un fichier de moins de 1.5 Mo.',
				{
					type: 'error',
					icon: '⛔',
					toastId: 'toast-alert',
				}
			)
			return
		}

		const imageUrl = URL.createObjectURL(fileObject)
		setImageUrl(imageUrl)
		setFileObj(fileObject)

		// reset file input
		event.target.value = null
	}

	const handleUpdateLastName = event => {
		setUserLastName(event.target.value)
	}

	const handleUpdateFirstName = event => {
		setUserFirstName(event.target.value)
	}

	const handleUpdateSpeciality = event => {
		setUserSpeciality(event.target.value)
	}

	const handleUpdateCompanyOrArtist = event => {
		setUserCompanyOrArtist(event.target.value)
	}

	const handleUpdateAvailable = event => {
		setAvailable(event)
	}

	useEffect(() => {
		return () => {
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl)
			}
		}
	}, [imageUrl])

	// reset the form when the modal is closed
	useEffect(() => {
		if (!open) {
			setFileObj('')
			setImageUrl(user?.main_picture?.url ?? '')
			setAvailable(user.available)
			setUserLastName(user.last_name ?? '')
			setUserFirstName(user.first_name ?? '')
			setUserSpeciality(user.speciality ?? '')
			setUserCompanyOrArtist(user.company_artist_name ?? '')

			reset()
		}
	}, [
		open,
		reset,
		user.available,
		user.first_name,
		user.last_name,
		user.speciality,
		user.main_picture,
		user.company_artist_name,
		user,
	])

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
							<Dialog.Panel className="relative w-full transform rounded-lg bg-white p-8 text-left shadow-2xl transition-all sm:max-w-3xl">
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
											Modifier votre profil
										</Dialog.Title>
									</div>
									<div className={''}>
										<div className="grid grid-cols-1 gap-4">
											<div className={'flex flex-col gap-4'}>
												<label
													htmlFor="cover-photo"
													className="text-base font-normal text-gray-700"
												>
													Modifier votre photo de profil
												</label>
												<button
													className="mt-2 sm:col-span-2 sm:mt-0"
													onClick={handleClick}
												>
													<div className="relative flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
														{!!imageUrl && imageUrl !== '' ? (
															<div
																className={
																	'relative flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-full'
																}
															>
																<Image
																	src={imageUrl}
																	alt={'photo de profil'}
																	fill={true}
																	sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
																	className="rounded-full object-cover object-center"
																/>
															</div>
														) : null}
														<div
															className={
																'text-center' +
																(!!imageUrl && imageUrl !== ''
																	? ' hidden'
																	: ' block')
															}
														>
															<PhotoIcon
																className="mx-auto h-12 w-12 text-gray-300"
																aria-hidden="true"
															/>
															<div className="mt-4 flex text-sm leading-6 text-gray-600">
																<label className="relative rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
																	<span>Télécharger une nouvelle photo</span>
																</label>
																<input
																	data-cy="file-main-upload"
																	id="file-upload"
																	name="file-upload"
																	type="file"
																	className="sr-only hidden"
																	ref={inputRef}
																	onChange={handleFileChange}
																/>
															</div>
															<p className="text-xs leading-5 text-gray-600">
																{"PNG, JPG, WEBP jusqu'à 1.5 Mo"}
															</p>
														</div>
													</div>
												</button>
											</div>
											<div className={'flex flex-col gap-4'}>
												<form
													onSubmit={handleSubmit(onSubmit)}
													method="POST"
													className="flex flex-col gap-4"
												>
													<div className={'flex gap-2'}>
														<div>
															<label
																htmlFor="first_name"
																className="block text-sm text-gray-700"
															>
																Prénom
															</label>
															<div className="mt-2">
																<input
																	data-cy="first-name-input"
																	id="first_name"
																	name="first_name"
																	type="text"
																	{...register('first_name', {
																		required: true,
																	})}
																	required
																	value={userFirstName ?? ''}
																	onChange={handleUpdateFirstName}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.first_name && (
																	<p
																		data-cy={'error-first-name'}
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.first_name.message}
																	</p>
																)}
															</div>
														</div>
														<div>
															<label
																htmlFor="last_name"
																className="block text-sm text-gray-700"
															>
																Nom
															</label>
															<div className="mt-2">
																<input
																	data-cy="last-name-input"
																	id="last_name"
																	name="last_name"
																	type="text"
																	{...register('last_name', {
																		required: true,
																	})}
																	required
																	value={userLastName ?? ''}
																	onChange={handleUpdateLastName}
																	className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
																/>
																{errors.last_name && (
																	<p
																		data-cy="error-last-name"
																		className={'mt-2 text-xs text-red-500/80'}
																	>
																		{errors.last_name.message}
																	</p>
																)}
															</div>
														</div>
													</div>
													<div>
														<label
															htmlFor="speciality"
															className="block text-sm text-gray-700"
														>
															Specialité
														</label>
														<div className="mt-2">
															<input
																data-cy="speciality-input"
																id="speciality"
																name="speciality"
																type="text"
																{...register('speciality', {
																	required: true,
																})}
																required
																value={userSpeciality ?? ''}
																onChange={handleUpdateSpeciality}
																className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
															/>
															{errors.speciality && (
																<p
																	data-cy="error-speciality"
																	className={'mt-2 text-xs text-red-500/80'}
																>
																	{errors.speciality.message}
																</p>
															)}
														</div>
													</div>
													<div>
														<label
															htmlFor={'company_artist_name'}
															className="block text-sm text-gray-700"
														>
															{"Nom de l'entreprise ou de l'artiste"}
														</label>
														<div className="mt-2">
															<input
																id="company_artist_name"
																data-cy="company-artist-input"
																name="company_artist_name"
																type="text"
																{...register('company_artist_name', {
																	required: true,
																})}
																required
																value={userCompanyOrArtist ?? ''}
																onChange={handleUpdateCompanyOrArtist}
																className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
															/>
															{errors.company_artist_name && (
																<p
																	data-cy={'error-company-artist-name'}
																	className={'mt-2 text-xs text-red-500/80'}
																>
																	{errors.company_artist_name.message}
																</p>
															)}
														</div>
													</div>
													<div>
														<label
															htmlFor="available"
															className="block text-sm text-gray-700"
														>
															Disponibilité
														</label>
														<div className="mt-2 flex items-center gap-4">
															<Switch
																data-cy="available-input"
																value={available}
																checked={available}
																onChange={handleUpdateAvailable}
																className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
															>
																<span className="sr-only">
																	Toggle disponibility
																</span>
																<span
																	aria-hidden="true"
																	className="pointer-events-none absolute h-full w-full rounded-md bg-white"
																/>
																<span
																	aria-hidden="true"
																	className={
																		(available
																			? 'bg-indigo-600'
																			: 'bg-gray-200') +
																		' pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
																	}
																/>
																<span
																	aria-hidden="true"
																	className={
																		(available
																			? 'translate-x-5'
																			: 'translate-x-0') +
																		' pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
																	}
																/>
															</Switch>
															{available ? <BadgeDispo /> : <BadgeIndispo />}
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4 flex justify-end">
									<button
										data-cy="save-button-resume"
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
