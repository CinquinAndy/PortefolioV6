import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import * as zod from 'zod'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { patchMeMakeup } from '@/services/PatchMeMakeup'
import { toast } from 'react-toastify'
import Info from '@/components/Global/Info'

const MAX_PHOTOS = 10
const schema = zod.object({})
export default function ModalUpdatePortfolioProfil(props) {
	const { handleSubmit, reset } = useForm({
		resolver: zodResolver(schema),
	})

	const [user, setUser] = React.useState(props.user)
	const [fileObj, setFileObj] = useState('')
	const [open, setOpen] = useState(props.isModalOpen)
	const [imageUrl, setImageUrl] = useState('')
	const [mySwiperModal, setMySwiperModal] = React.useState(null)
	const [userImageGallery, setUserImageGallery] = useState(
		user.image_gallery ?? []
	)

	const { data: session } = useSession()

	const onSubmit = data => {
		// 	upload file if fileObj is not empty
		if (fileObj !== '' && fileObj !== undefined && fileObj !== null) {
			const form = new FormData()
			form.append('files', fileObj)

			if (userImageGallery.length >= MAX_PHOTOS) {
				toast('La limite du nombre de photos est atteinte.', {
					type: 'error',
					icon: '⛔',
					toastId: 'toast-alert',
				})
				return
			}
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
					data_blob = data_blob[0]
					// props.handleIsModalOpen()
					// 	add image to gallery
					setUserImageGallery([...userImageGallery, data_blob])

					// props.handleUpdateUser([
					// 	...props.user,
					// 	{ image_gallery: userImageGallery },
					// ])
					let userTemp = props.user
					userTemp.image_gallery = userImageGallery
					setUser(userTemp)
					setImageUrl('')
					reset()
				})
				.catch(err =>
					toast('Une erreur est survenue, veuillez réessayer plus tard', {
						type: 'error',
						icon: '⛔',
						toastId: 'toast-alert',
					})
				)
		} else {
			// putMakeupArtisteViaId(queryClient, user, session, data)
			reset()
			// props.handleIsModalOpen()
			setImageUrl('')
		}
	}

	const handleSubmitGallery = () => {
		const data = {
			image_gallery: userImageGallery,
		}
		patchMeMakeup(session, data)
		setImageUrl('')
		let userTemp = user
		userTemp.image_gallery = userImageGallery
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

	const handleFileChange = event => {
		const fileObject = event.target.files && event.target.files[0]
		if (!fileObject) {
			return
		}

		// Ajouter une vérification de la taille du fichier ici.
		if (fileObject.size > 1500000) {
			// Taille du fichier en octets (1.5 Mo)
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

	const handleDeletePortfolio = index => {
		const newGallery = userImageGallery.filter(item => item.id !== index)
		setUserImageGallery(newGallery)
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
			setImageUrl('')
			setUserImageGallery(user.image_gallery ?? [])
			props.handleUpdateUser(user)
			reset()
		}
	}, [open, reset, user.image_gallery])

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
								<div>
									<div className="flex flex-col items-start gap-8">
										<div className="text-left">
											<Dialog.Title
												as="h3"
												className="text-lg font-semibold text-gray-900"
											>
												Modifier votre portfolio
											</Dialog.Title>
										</div>
										<div
											className={'flex w-full flex-wrap gap-16 md:flex-nowrap'}
										>
											<div className="grid w-full grid-cols-1 gap-4 md:w-2/6 ">
												<div className={'flex flex-col gap-4'}>
													<label
														htmlFor="cover-photo"
														className="text-base font-normal text-gray-700"
													>
														Ajouter une photo à votre portfolio
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
																		data-cy="file-upload-portefolio"
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
													<div
														className={'flex w-full items-center justify-end'}
													>
														<Info
															description={
																'Vous ne pouvez upload que 10 images maximum.'
															}
														/>
													</div>
													<div className=" flex justify-end">
														<button
															data-cy="add-button-portefolio"
															type="button"
															className="btn-primary"
															onClick={handleSubmit(onSubmit)}
														>
															Ajouter
														</button>
													</div>
												</div>
											</div>
											<div className={'flex w-full md:w-4/6'}>
												<div className={'flex w-full flex-col gap-4 rounded'}>
													<h2 className={'text-xl font-bold text-gray-700'}>
														Portfolio
													</h2>
													<>
														<Swiper
															slidesPerView={'auto'}
															spaceBetween={32}
															pagination={{
																clickable: true,
															}}
															loop={true}
															modules={[Pagination]}
															className="h-[500px] w-full"
															onInit={eve => {
																setMySwiperModal(eve)
															}}
														>
															{
																// 	map on user?.image_gallery and return a SwiperSlide with the image
															}
															{userImageGallery.map((image, index) => {
																return (
																	<SwiperSlide
																		key={index}
																		style={{
																			aspectRatio: `${image.width}/${image.height}`,
																			height: '100%',
																		}}
																		className={'relative !h-[500px] !w-auto'}
																	>
																		<button
																			data-cy="delete-button-portefolio"
																			className={
																				'absolute left-0 top-0 z-40 m-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 shadow md:left-auto md:right-0'
																			}
																			onClick={() =>
																				handleDeletePortfolio(image.id)
																			}
																		>
																			<span className="material-icons-round text-xl text-red-500">
																				delete
																			</span>
																		</button>
																		<Image
																			src={image.url}
																			alt={
																				image.alternativeText ??
																				image.name ??
																				'portefolio image'
																			}
																			fill={true}
																			sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
																			className={'rounded object-cover'}
																		/>
																	</SwiperSlide>
																)
															})}
														</Swiper>
													</>
													{/* btn to go on next slide */}
													<div
														className={
															'flex w-full items-center justify-between'
														}
													>
														<div>
															<button
																className={
																	'flex items-center justify-center gap-2'
																}
																onClick={() => {
																	mySwiperModal.slidePrev()
																}}
															>
																<Image
																	alt={'next'}
																	src={'/assets/down-arrow.svg'}
																	className={'rotate-90'}
																	width={20}
																	height={20}
																></Image>
																<span
																	className={'font-semibold text-indigo-950'}
																>
																	Précédent
																</span>
															</button>
														</div>
														<div>
															<button
																className={
																	'flex items-center justify-center gap-2'
																}
																onClick={() => {
																	mySwiperModal.slideNext()
																}}
															>
																<span
																	className={'font-semibold text-indigo-950'}
																>
																	Suivant
																</span>
																<Image
																	alt={'next'}
																	src={'/assets/down-arrow.svg'}
																	className={'-rotate-90'}
																	width={20}
																	height={20}
																></Image>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4 flex justify-end">
									<button
										data-cy="save-button-portefolio"
										type="button"
										className="btn-primary"
										onClick={handleSubmitGallery}
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
