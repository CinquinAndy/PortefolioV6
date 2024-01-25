import '@/styles/btn.css'
import '@/styles/carroussel.css'
import '@/styles/distorsions.css'
import '@/styles/main.css'
import '@/styles/nav.css'
import 'react-toastify/dist/ReactToastify.css'

import {GoogleAnalytics} from '@next/third-parties/google'
import {ToastContainer} from "react-toastify";
import {Noto_Serif_Display, Be_Vietnam_Pro} from 'next/font/google'


const noto_serif_display = Noto_Serif_Display({subsets: ['latin'], variable: '--font-be-vietnam-pro'})
const be_vietnam_pro = Be_Vietnam_Pro({
        weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        variable: '--font-noto-serif-display',
        style: ['italic', 'normal'],
        subsets: ['latin']
    }
)

export default function RootLayout({children, params}) {
    return (
        <html lang={`${params.lang}`}>
        <body className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable}`}
        >
        <ToastContainer/>
        <GoogleAnalytics gaId="UA-150969790-2"/>
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg" className={"gradient_svg"}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"/>
                        <feBlend in="SourceGraphic" in2="goo"/>
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>
            </div>
        </div>
        {children}
        </body>
        </html>
    )
}
