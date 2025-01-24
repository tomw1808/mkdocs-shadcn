import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from './theme-provider'
import { getMkDocsConfig } from '@/lib/mkdocs'

const inter = Inter({ subsets: ['latin'] })

const mkdocsConfig = getMkDocsConfig()

export const metadata: Metadata = {
  title: mkdocsConfig.site_name,
  description: mkdocsConfig.site_description || 'Documentation site built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className+ ' overscroll-y-none'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavWrapper />
          {children}
        </ThemeProvider>
      </body>

    </html>
  )
}
