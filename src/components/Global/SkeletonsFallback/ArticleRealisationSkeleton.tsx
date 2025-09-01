'use client'
import React from 'react'

export const ArticleRealisationSkeleton = (): React.JSX.Element => (
	<div className="custom-card shadow-innercustom relative z-10 my-2 h-full w-full animate-pulse brightness-90">
		<div className="z-20 h-full w-full bg-white/30"></div>
		<div className="custom-image-hover absolute left-0 top-0 z-20 h-full w-full backdrop-brightness-75"></div>
	</div>
)
