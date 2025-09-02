import { ShimmerButton } from '@/components/ui/shimmer-button'

function ShimmerButtonDemo() {
	return (
		<div className="z-10 flex min-h-64 items-center justify-center">
			<ShimmerButton className="shadow-2xl">
				<span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
					Shimmer Button
				</span>
			</ShimmerButton>
		</div>
	)
}

export default ShimmerButtonDemo
