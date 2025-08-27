import type {Metadata} from 'next'
import './globals.css'
import {Londrina_Outline, Londrina_Solid} from "next/font/google";

const londrinaOutline = Londrina_Outline({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-londrinaOutline'
})

const londrinaSolid = Londrina_Solid({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-londrinaSolid'
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
        <body className={`${londrinaOutline.variable} ${londrinaSolid.variable}`}>{children}</body>
        </html>
    )
}
