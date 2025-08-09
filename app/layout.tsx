import type {Metadata} from 'next'
import './globals.css'
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: 'TaDa!',
    description: 'Celebrate your achievements with a burst of confetti and fireworks!',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={poppins.className}>{children}</body>
        </html>
    )
}
