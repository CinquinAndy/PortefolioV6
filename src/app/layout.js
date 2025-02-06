import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/main.css'
import '@/styles/lottie.css'
import '@/styles/nav.css'
import 'react-toastify/dist/ReactToastify.css'
import 'highlight.js/styles/atom-one-dark-reasonable.min.css'
import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'

export function generateStaticParams() {
    const i18nConfig = {
        locales: ['fr', 'en'],
    }
    return i18nConfig.locales.map(locale => ({locale}))
}

export default function RootLayout({children}) {
    return (
        <>
            <Analytics/>
            <SpeedInsights/>
            {children}
        </>
    )
}
