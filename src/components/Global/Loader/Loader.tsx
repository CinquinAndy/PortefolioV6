import LoaderAnimation from '@/components/Global/Loader/LoaderAnimation'
import React from 'react'

function Loader() {
	return (
		<div className={'z-50 flex h-full w-full items-center justify-center'}>
			<LoaderAnimation />
		</div>
	)
}

export default Loader
