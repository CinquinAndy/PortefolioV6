import React from 'react'
import LoaderAnimation from '@/components/Global/Loader/LoaderAnimation'

function Loader(props) {
	return (
		<>
			<div className={'z-50 flex h-full w-full items-center justify-center '}>
				<LoaderAnimation />
			</div>
		</>
	)
}

export default Loader
