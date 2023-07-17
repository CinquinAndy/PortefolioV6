import React, { useEffect } from 'react'
import Image from 'next/image'
import { BadgeDispo } from '@/components/Profil/Atoms/BadgeDispo'
import { BadgeIndispo } from '@/components/Profil/Atoms/BadgeIndispo'

function ViewResumeProfil(props) {
	const [user, setUser] = React.useState(null)
	const [availability, setAvailability] = React.useState(true)
	const [mainPicture, setMainPicture] = React.useState(
		user?.main_picture?.url ?? null
	)

	useEffect(() => {
		if (props.user) {
			setUser(props.user?.attributes)
			if (user?.main_picture && user?.main_picture?.data === undefined) {
				setMainPicture(user?.main_picture?.url)
			} else {
				setMainPicture(user?.main_picture?.data?.attributes?.url)
			}
		}
	}, [props.user, user?.main_picture])

	useEffect(() => {
		setAvailability(!!user?.available)
	}, [user?.available])

	return (
		<div className={'relative bg-white px-4 pb-24 shadow-xl md:px-8 2xl:px-0'}>
			<div className="mx-auto max-w-7xl pt-[90px]">
				<div className={'grid grid-cols-12 gap-5 pt-24'}>
					<div
						className={
							'relative col-span-12 flex items-center justify-center xl:col-span-2 xl:justify-start'
						}
					>
						<div className={'relative h-[200px] w-[200px]'}>
							<Image
								src={mainPicture ?? '/assets/pp_makeup.webp'}
								alt={'ppmakeup'}
								priority={true}
								fill={true}
								sizes={
									'(max-width: 768px) 150px, (max-width: 1200px) 175px, 200px'
								}
								className={'rounded-full object-cover'}
							></Image>
						</div>
					</div>
					<div
						className={
							'col-span-12 flex items-center md:col-span-8 xl:col-span-7'
						}
					>
						<div
							className={
								'flex h-full w-full flex-col justify-between py-8 md:py-0 md:pl-20'
							}
						>
							<div className={'flex w-full cursor-default flex-col gap-2'}>
								<h3
									className={'text-3xl font-bold tracking-tight text-gray-800'}
									data-cy="resume-name"
								>
									{user?.first_name} {user?.last_name}
								</h3>
								<h2
									className={
										'text-xl font-semibold tracking-tight text-gray-700'
									}
									data-cy="resume-speciality"
								>
									{user?.speciality}
								</h2>
								<h3
									className={'text-lg tracking-tight text-gray-800'}
									data-cy="resume-company-artist-name"
								>
									{user?.company_artist_name}
								</h3>
							</div>
							<div>
								<div className={'flex items-center'}>
									<span className="material-icons-round text-indigo-900">
										directions_run
									</span>
									<span data-cy={'resume-city-action-radius'}>
										peut se déplacer à {user?.city} & dans un rayon de{' '}
										{user?.action_radius}km
									</span>
								</div>
							</div>
							<div></div>
							{/*<div className={'flex flex-row items-center gap-4'}>*/}
							{/*	<Stars starsToDisplay={user?.score} />{' '}*/}
							{/*	/!* todo connect the score to the number of reviews *!/*/}
							{/*	<span className={'text-sm italic'}>( {user?.score} avis )</span>*/}
							{/*</div>*/}
						</div>
					</div>
					<div className={'col-span-3 flex items-center'}>
						<div
							className={
								'flex h-full w-full flex-col items-start justify-between'
							}
						>
							<div className={'flex cursor-default items-center gap-5'}>
								{availability ? (
									<>
										<BadgeDispo />
									</>
								) : (
									<>
										<BadgeIndispo />
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewResumeProfil
