import React from 'react'

export function Stars(props) {
	return (
		<div
			className={'stars h-[18px] w-[115px] scale-90 lg:scale-100'}
			style={{
				background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
					props.starsToDisplay * 20
				}%, #fff ${props.starsToDisplay * 20}%, 
                            #fff 100%) no-repeat center`,
			}}
		></div>
	)
}
