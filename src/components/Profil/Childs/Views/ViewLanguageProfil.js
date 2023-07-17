import React, { useEffect } from 'react'

function ViewLanguageProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
		}
	}, [props.user])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>Langues</h2>
			<ul className={'flex flex-col gap-4'} data-cy={'language'}>
				{/* map on language -> name */}
				{user?.language.length !== 0 ? (
					user?.language?.map((language, index) => {
						return (
							<li key={index} className={'text-gray-700'}>
								→&nbsp;
								<div className="inline-flex flex-nowrap items-center rounded-full px-3 py-2 text-sm font-medium text-gray-700">
									{language?.name}
								</div>
							</li>
						)
					})
				) : (
					<></>
				)}
			</ul>
		</div>
	)
}

export default ViewLanguageProfil
