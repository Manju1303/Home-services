import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Home Services - Book Hourly Home Services',
    description: 'Book professional maid, cooking, electrician, plumbing, and cleaning services on hourly basis',
    keywords: ['home services', 'maid', 'cook', 'electrician', 'plumber', 'cleaning', 'hourly booking'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    )
}
