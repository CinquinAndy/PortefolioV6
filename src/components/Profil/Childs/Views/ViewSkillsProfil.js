import React, { useEffect } from 'react'

function ViewSkillsProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
		}
	}, [props.user])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>Compétences</h2>
			{user?.skills && (
				<div className={'flex flex-wrap gap-4'}>
					{/* map on skills -> name */}
					{user?.skills?.length !== 0 &&
						user?.skills?.map((skill, index) => {
							return (
								<div
									data-cy="skill"
									key={index}
									className="inline-flex flex-nowrap items-center rounded-full bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-700"
								>
									{skill.name}
								</div>
							)
						})}
				</div>
			)}
		</div>
	)
}

export default ViewSkillsProfil
