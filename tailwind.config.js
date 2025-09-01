/** @type {import("tailwindcss").Config} */
module.exports = {
	theme: {
		screens: {
			xl: {
				raw: '(min-width: 1280px) and (min-height: 650px)',
			},
			sm: {
				raw: '(min-width: 640px) and (min-height: 575px)',
			},
			md: {
				raw: '(min-width: 768px) and (min-height: 650px)',
			},
			lg: {
				raw: '(min-width: 1024px) and (min-height: 650px)',
			},
			'2xl': {
				raw: '(min-width: 1536px) and (min-height: 650px)',
			},
		},
		extend: {
			spacing: {
				128: '32rem',
				112: '28rem',
			},
			skew: {
				32: '32deg',
				30: '30deg',
				28: '28deg',
				24: '24deg',
				20: '20deg',
				17: '17deg',
			},
			colors: {
				slate: {
					1100: '#090D16',
					1000: '#0D1321',
				},
				sky: {
					1100: '#011623',
					1000: '#042C44',
				},
				secondary: {
					foreground: 'hsl(var(--secondary-foreground))',
					DEFAULT: 'hsl(var(--secondary))',
				},
				ring: 'hsl(var(--ring))',
				primary: {
					foreground: 'hsl(var(--primary-foreground))',
					DEFAULT: 'hsl(var(--primary))',
				},
				popover: {
					foreground: 'hsl(var(--popover-foreground))',
					DEFAULT: 'hsl(var(--popover))',
				},
				neutral: {
					1100: '#080808',
					1000: '#0F0F0F',
				},
				muted: {
					foreground: 'hsl(var(--muted-foreground))',
					DEFAULT: 'hsl(var(--muted))',
				},
				input: 'hsl(var(--input))',
				indigo: {
					1100: '#0D0C3C',
					1000: '#1E1C5E',
				},
				foreground: 'hsl(var(--foreground))',
				destructive: {
					foreground: 'hsl(var(--destructive-foreground))',
					DEFAULT: 'hsl(var(--destructive))',
				},
				chart: {
					5: 'hsl(var(--chart-5))',
					4: 'hsl(var(--chart-4))',
					3: 'hsl(var(--chart-3))',
					2: 'hsl(var(--chart-2))',
					1: 'hsl(var(--chart-1))',
				},
				card: {
					foreground: 'hsl(var(--card-foreground))',
					DEFAULT: 'hsl(var(--card))',
				},
				border: 'hsl(var(--border))',
				background: 'hsl(var(--background))',
				accent: {
					foreground: 'hsl(var(--accent-foreground))',
					DEFAULT: 'hsl(var(--accent))',
				},
			},
			brightness: {
				25: '.25',
				10: '.10',
			},
			borderWidth: {
				40: '40px',
				20: '20px',
			},
			borderRadius: {
				sm: 'calc(var(--radius) - 4px)',
				md: 'calc(var(--radius) - 2px)',
				lg: 'var(--radius)',
			},
		},
	},
	safelist: [
		'fill-indigo-500',
		'fill-sky-500',
		'fill-lime-500',
		'fill-rose-500',
		'fill-amber-500',
		'fill-emerald-500',
		'fill-cyan-500',
		'fill-violet-500',
		'fill-fuchsia-500',
		'fill-orange-500',
		'fill-teal-500',
		'*:border-white',
		'border-white',
		'from-andy-purple-500',
		'to-andy-blue-500',
		'bg-andy-purple-500',
		'bg-andy-blue-500',
		'text-andy-purple-500',
		'text-andy-blue-500',
	],
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('tailwindcss-animate'),
	],
	darkMode: ['class'],
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
