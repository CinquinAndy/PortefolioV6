/** @type {import("tailwindcss").Config} */
module.exports = {
	theme: {
		screens: {
			xl: '(min-width: 1280px) and (min-height: 650px)',
			sm: '(min-width: 640px) and (min-height: 575px)',
			md: '(min-width: 768px) and (min-height: 650px)',
			lg: '(min-width: 1024px) and (min-height: 650px)',
			'2xl': '(min-width: 1536px) and (min-height: 650px)',
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('tailwindcss-animate')],
	darkMode: ['class'],
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
