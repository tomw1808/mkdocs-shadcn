import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './theme-provider'
import { getMkDocsConfig } from '@/lib/mkdocs'
import NavWrapper from './nav-wrapper'

const inter = Inter({ subsets: ['latin'] })

const mkdocsConfig = getMkDocsConfig()

export const metadata: Metadata = {
  title: mkdocsConfig.site_name,
  description: mkdocsConfig.site_description || 'Documentation built with MkDocs-Shadcn',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className + ' overscroll-y-none'}>
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
