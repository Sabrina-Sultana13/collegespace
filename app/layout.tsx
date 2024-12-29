import './globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import Providers from '@/context/providers'
import { Toaster } from 'sonner'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen scroll-smooth bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          {children}
          <Toaster position="bottom-left" />
        </Providers>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </body>
    </html>
  )
}
