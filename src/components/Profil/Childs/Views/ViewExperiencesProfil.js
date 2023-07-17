import React, { useEffect } from 'react'

function ViewExperiencesProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
		}
	}, [props.user])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>
				Expériences professionnelles
			</h2>
			<div className={'flex flex-wrap gap-4'}>
				{/* map on experiences */}
				{
					// company
					// job_name
					// city
					// date_start
					// date_end
					// description
				}
				{user?.experiences && (
					<div className={'flex flex-col gap-4'}>
						{user?.experiences?.map((experience, index) => {
							return (
								<div key={index} className={'flex w-full text-indigo-800'}>
									<span className="material-icons-round">apartment</span>
									<div className={'ml-2 flex w-full flex-col gap-2'}>
										<div className={'flex w-full flex-col'}>
											<p
												className={'font-semibold text-gray-700'}
												data-cy={'experience-company'}
											>
												{experience?.company}
											</p>
											<div className={'flex justify-between gap-2'}>
												<p
													className={'text-sm italic text-gray-600'}
													data-cy={'experience-job-name'}
												>
													{experience?.job_name}
												</p>
												<p
													className={'text-sm italic text-gray-600'}
													data-cy={'experience-date'}
												>
													{/* format date to month year ( like july 1998 )  */}
													{/*{experience.date_start} - {experience.date_end}*/}
													{new Date(experience?.date_start).toLocaleString(
														'fr-FR',
														{
															year: 'numeric',
															month: 'long',
														}
													)}
													{' - '}
													{experience?.date_end === null ||
													experience?.date_end === ''
														? "Aujourd'hui"
														: new Date(experience?.date_end).toLocaleString(
																'fr-FR',
																{
																	year: 'numeric',
																	month: 'long',
																}
														  )}
												</p>
											</div>
										</div>
										<div>
											<p
												className={'text-sm italic text-gray-600'}
												data-cy={'experience-city'}
											>
												à {experience?.city}
											</p>
										</div>
										<div>
											<p
												className={'text-sm italic text-gray-500'}
												data-cy={'experience-description'}
											>
												{experience?.description}
											</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default ViewExperiencesProfil
