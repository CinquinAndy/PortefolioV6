import React from 'react'

function ViewContainer({ user, Component }) {
	return (
		<div className={'w-full'}>
			<div
				className={
					'flex w-full flex-col gap-4 rounded border border-gray-300 bg-white p-8'
				}
			>
				<div className={'flex w-full flex-col gap-4'}>
					<Component user={user} />
				</div>
			</div>
		</div>
	)
}

export default ViewContainer
