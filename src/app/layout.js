import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/distorsions.css'
import '@/styles/main.css'
import '@/styles/nav.css'
import 'react-toastify/dist/ReactToastify.css'
import i18nConfig from '/i18nConfig'

export function generateStaticParams() {
	return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({ children }) {
	return <>{children}</>
}
