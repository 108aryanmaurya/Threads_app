export const metadata={
    title:"Threads",
    description:"A Next.js 13 Meta Threads Application"
}

import {ClerkProvider} from '@clerk/nextjs'
// import { Inter } from 'next/font/google'
import '../globals.css'
export default function RootLayout({children}:{children:React.ReactNode}){

// const inter=Inter({subsets:['latin']})

    return <ClerkProvider>
        <html lang='en'>
            <body className={` bg-dark-1` }>
                <div className='w-full flex justify-center items-center min-h-screen'>

                {children}
                </div>
            </body>
        </html>
    </ClerkProvider>
}