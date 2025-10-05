interface StarRatingProps {
	rating: number
	maxStars?: number
	className?: string
	showNumber?: boolean
}

export function StarRating({ rating, maxStars = 5, className = '', showNumber = false }: StarRatingProps) {
	const stars = Math.min(Math.max(rating, 0), maxStars)
	const fullStars = Math.floor(stars)
	const hasHalfStar = stars % 1 >= 0.5

	return (
		<div className={`flex items-center gap-1 ${className}`}>
			<div className="flex items-center">
				{Array.from({ length: maxStars }).map((_, index) => {
					const isFilled = index < fullStars
					const isHalf = index === fullStars && hasHalfStar

					return (
						<svg
							key={index}
							className={`h-4 w-4 ${
								isFilled
									? 'fill-yellow-400 text-yellow-400'
									: isHalf
										? 'fill-yellow-400/50 text-yellow-400/50'
										: 'fill-slate-600 text-slate-600'
							}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					)
				})}
			</div>
			{showNumber && <span className="ml-1 text-sm text-slate-400">({stars.toFixed(1)})</span>}
		</div>
	)
}
