import React, { useEffect } from 'react'
import { LocationProfil } from '@/components/Profil/Childs/LocationProfil'
import { DescriptionProfil } from '@/components/Profil/Childs/DescriptionProfil'
import { SocialMediaProfil } from '@/components/Profil/Childs/SocialMediaProfil'
import { SkillsProfil } from '@/components/Profil/Childs/SkillsProfil'
import { PortfolioProfil } from '@/components/Profil/Childs/PortfolioProfil'
import { LanguageProfil } from '@/components/Profil/Childs/LanguageProfil'
import { ServiceOffersProfil } from '@/components/Profil/Childs/ServiceOffers/ServiceOffersProfil'
import { CoursesProfil } from '@/components/Profil/Childs/CoursesProfil'
import { ExperiencesProfil } from '@/components/Profil/Childs/ExperiencesProfil'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CompletionProfilProgressBar from '@/components/Global/CompletionProfilProgressBar'

function InfosProfil(props) {
	// import router
	const router = useRouter()
	// get query param
	const { publicView } = router.query

	const [user, setUser] = React.useState(props.user)
	const [isPublic, setIsPublic] = React.useState(props.isPublic)

	const handleUpdateUser = user => {
		props.handleUpdateUser(user)
	}

	useEffect(() => {
		setIsPublic(!!publicView)
	}, [])

	useEffect(() => {
		const newUser = JSON.parse(JSON.stringify(user))
		handleUpdateUser(newUser)
	}, [props.isPublic])

	return (
		<div className={''}>
			<div className="relative mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-0 2xl:px-0">
				<div
					className={
						'absolute left-0 top-0 mx-auto mt-8 flex w-full max-w-7xl flex-col items-start justify-start gap-4' +
						' px-4 md:mt-16 md:flex-row md:items-end md:justify-between md:gap-0 md:px-8'
					}
				>
					{!isPublic ? (
						<>
							<CompletionProfilProgressBar
								user={user}
								handleUpdateUser={handleUpdateUser}
							/>
							<Link
								data-cy="profil-public-view"
								href={'#'}
								onClick={e => {
									e.preventDefault() // Pour empêcher le comportement par défaut
									setIsPublic(true)
									props.handleIsPublic(true)
									router.push({
										pathname: '/auth/profil',
										query: { publicView: true },
									})
								}}
								className={'flex gap-2 font-semibold text-indigo-900 '}
							>
								<span className="material-icons-round text-indigo-900">
									visibility
								</span>
								<span className={'hover:underline'}>
									Voir mon profil public
								</span>
							</Link>
						</>
					) : (
						<div className={'flex w-full justify-end'}>
							<Link
								href={'#'}
								onClick={e => {
									e.preventDefault() // Pour empêcher le comportement par défaut
									setIsPublic(false)
									props.handleIsPublic(false)
									router.push({ pathname: '/auth/profil' })
								}}
								className={'flex gap-2 font-semibold text-indigo-900'}
							>
								<span className="material-icons-round text-indigo-900">
									edit
								</span>
								<span className={'hover:underline'}>Modifier mon profil</span>
							</Link>
						</div>
					)}
				</div>
				<div className={'grid grid-cols-12 gap-5 pt-32'}>
					<div
						className={
							'col-span-12 flex flex-col items-start gap-5 md:col-span-4'
						}
					>
						<LocationProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<SocialMediaProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<SkillsProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<LanguageProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<CoursesProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
					</div>
					<div
						className={
							'col-span-12 flex flex-col items-start gap-5 md:col-span-8'
						}
					>
						<DescriptionProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<PortfolioProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<ServiceOffersProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
						<ExperiencesProfil
							user={user}
							handleUpdateUser={props.handleUpdateUser}
							isPublic={isPublic}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfosProfil
