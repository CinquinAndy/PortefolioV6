import React from 'react'

export function LowGradientBackground(): React.JSX.Element {
	return (
		<div className={`gradient-bg`}>
			<div className="gradients-container">
				<div className="g1"></div>
				<div className="g5"></div>
			</div>
		</div>
	)
}
