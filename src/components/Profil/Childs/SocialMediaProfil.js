import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import ModalUpdateSocialMediaProfil from '@/components/Profil/Atoms/ModalUpdate/ModalUpdateSocialMediaProfil'
import ViewSocialMediaProfil from '@/components/Profil/Childs/Views/ViewSocialMediaProfil'

export function SocialMediaProfil(props) {
	// import router
	const router = useRouter()
	// get query param
	const { publicView } = router.query
	const [isPublic, setIsPublic] = React.useState(props.isPublic)

	const user = props.user

	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const handleIsModalOpen = () => {
		if (!isPublic) {
			setIsModalOpen(!isModalOpen)
		}
	}

	useEffect(() => {
		setIsPublic(!!publicView)
	}, [])

	useEffect(() => {
		setIsPublic(props.isPublic)
	}, [props.isPublic])

	return (
		<div className={'w-full'}>
			<ModalUpdateSocialMediaProfil
				isModalOpen={isModalOpen}
				handleUpdateUser={props.handleUpdateUser}
				handleIsModalOpen={handleIsModalOpen}
				user={user}
			/>
			<div
				className={
					(!isPublic ? 'group relative' : '') +
					' flex w-full flex-col gap-4 rounded border border-gray-300 bg-white p-8'
				}
			>
				{!isPublic ? (
					<button
						data-cy={'update-social-medias-button'}
						onClick={handleIsModalOpen}
						className={
							'absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center px-4 opacity-0 ' +
							'bg-white/75 backdrop-blur-none group-hover:z-20 group-hover:opacity-100 ' +
							'pointer-events-none transition duration-300 group-hover:pointer-events-auto group-hover:backdrop-blur-[2px] ' +
							'user-select-none group-hover:user-select-auto focus:outline-none'
						}
					>
						<div
							className={
								'btn-alt-primary flex items-center gap-3 bg-white text-indigo-900'
							}
						>
							<span className="material-icons-round">edit</span>
							<span className={'font-semibold'}>
								Modifier vos informations de contacts
							</span>
						</div>
					</button>
				) : null}
				<div className={'flex w-full flex-col gap-4'}>
					<ViewSocialMediaProfil user={user} />
				</div>
			</div>
		</div>
	)
}
