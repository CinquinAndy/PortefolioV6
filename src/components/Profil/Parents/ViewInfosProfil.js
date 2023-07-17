import React, { useEffect } from 'react'
import ViewLocationProfil from '@/components/Profil/Childs/Views/ViewLocationProfil'
import ViewSocialMediaProfil from '@/components/Profil/Childs/Views/ViewSocialMediaProfil'
import ViewSkillsProfil from '@/components/Profil/Childs/Views/ViewSkillsProfil'
import ViewLanguageProfil from '@/components/Profil/Childs/Views/ViewLanguageProfil'
import ViewCoursesProfil from '@/components/Profil/Childs/Views/ViewCoursesProfil'
import ViewDescriptionProfil from '@/components/Profil/Childs/Views/ViewDescriptionProfil'
import ViewPortfolioProfil from '@/components/Profil/Childs/Views/ViewPortfolioProfil'
import ViewServiceOffersProfil from '@/components/Profil/Childs/Views/ViewServiceOffersProfil'
import ViewExperiencesProfil from '@/components/Profil/Childs/Views/ViewExperiencesProfil'
import ViewContainer from '@/components/Profil/Childs/Views/ViewContainer'

function ViewInfosProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user.attributes)
		}
	}, [props.user])

	return (
		<div className={''}>
			<div className="relative mx-auto max-w-7xl px-4 pt-4 md:px-8 2xl:px-0">
				<div className={'grid grid-cols-12 gap-5 pt-24'}>
					{props.isPublicView && (
						<>
							<div
								className={
									'col-span-12 flex flex-col items-start gap-5 md:col-span-4'
								}
							>
								<ViewContainer user={user} Component={ViewLocationProfil} />
								<ViewContainer user={user} Component={ViewSocialMediaProfil} />
								<ViewContainer user={user} Component={ViewSkillsProfil} />
								<ViewContainer user={user} Component={ViewLanguageProfil} />
								<ViewContainer user={user} Component={ViewCoursesProfil} />
							</div>
							<div
								className={
									'col-span-12 flex flex-col items-start gap-5 md:col-span-8'
								}
							>
								<ViewContainer user={user} Component={ViewDescriptionProfil} />
								<ViewContainer user={user} Component={ViewPortfolioProfil} />
								<ViewContainer
									user={user}
									Component={ViewServiceOffersProfil}
								/>
								<ViewContainer user={user} Component={ViewExperiencesProfil} />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ViewInfosProfil
