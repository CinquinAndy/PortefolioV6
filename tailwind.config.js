/** @type {import("tailwindcss").Config} */
module.exports = {
	theme: {
		extend: {
			colors: {
				'andy-purple': {
					500: '#6c00a2',
				},
				'andy-blue': {
					500: '#001152',
				},
				slate: {
					50: '#f8fafc',
					1000: '#0d1321',
					1100: '#090d16',
				},
				sky: {
					1000: '#042c44',
					1100: '#011623',
				},
				neutral: {
					1000: '#0f0f0f',
					1100: '#080808',
				},
				indigo: {
					400: '#6366f1',
					500: '#6366f1',
					1000: '#1e1c5e',
					1100: '#0d0c3c',
				},
			},
			spacing: {
				112: '28rem',
				128: '32rem',
			},
			borderWidth: {
				20: '20px',
				40: '40px',
			},
			skew: {
				17: '17deg',
				20: '20deg',
				24: '24deg',
				28: '28deg',
				30: '30deg',
				32: '32deg',
			},
			brightness: {
				10: '0.1',
				25: '0.25',
			},
		},
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
