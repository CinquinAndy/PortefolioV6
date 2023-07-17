import React, { useEffect } from 'react'

function ViewCoursesProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
		}
	}, [props.user])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>
				Formations & diplomes
			</h2>
			{user?.courses &&
				user?.courses?.length !== 0 &&
				user?.courses?.map((course, index) => {
					return (
						<div key={index} className={'flex text-gray-700'}>
							<span className="material-icons-round text-indigo-900">
								school
							</span>
							<div className={'ml-2 flex w-full flex-col gap-2'}>
								<div className={'flex flex-col'}>
									<p
										className={'font-semibold text-gray-700'}
										data-cy={'course-diploma'}
									>
										{course?.diploma}
									</p>
									<div className={'flex w-full justify-between'}>
										<p
											className={'text-sm italic text-gray-600'}
											data-cy={'course-school'}
										>
											{course?.school}
										</p>
										<p
											className={'text-sm italic text-gray-600'}
											data-cy={'course-date-graduation'}
										>
											{course?.date_graduation}
										</p>
									</div>
								</div>
								<div data-cy={'course-description'}>
									{
										// display the user description
										// if \n is present, split the string and display each part in a new line
										course?.course_description?.split('\n').map((item, i) => {
											return (
												<p key={i} className={'text-sm italic text-gray-500'}>
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
	)
}

export default ViewCoursesProfil
