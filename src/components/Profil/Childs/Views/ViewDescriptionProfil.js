import React, { useEffect } from 'react'

function ViewDescriptionProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
		}
	}, [props.user])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>
				Vous en quelques mots
			</h2>
			{
				// display the user description
				// if \n is present, split the string and display each part in a new line
				user?.description?.split('\n').map((item, i) => {
					return (
						<p data-cy={'description'} key={i} className={'text-gray-800'}>
							{item}
						</p>
					)
				})
			}
		</div>
	)
}

export default ViewDescriptionProfil
