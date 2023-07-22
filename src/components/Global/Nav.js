import React, { useState } from 'react'

function Nav() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleClickMenuIcon = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	return <></>
}

export default Nav
