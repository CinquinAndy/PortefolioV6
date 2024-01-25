export const metadata = {
    title: 'My Page Title',
}

export default function Page({params}) {
    return <>
        page -- {params.lang}
    </>
}