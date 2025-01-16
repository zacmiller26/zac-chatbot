import './globals.css'

import { FULL_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: FULL_NAME,
  description: 'A web portfolio'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        {children}
        <Analytics />
        <Toaster position='top-right' />
      </body>
    </html>
  )
}
