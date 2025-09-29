import LoaderAnimation from '@/components/Global/Loader/LoaderAnimation'

function FullLoader() {
	return (
		<div
			className={'fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-white'}
		>
			<LoaderAnimation></LoaderAnimation>
		</div>
	)
}

export default FullLoader
