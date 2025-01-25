'use client'

import { useTheme } from 'next-themes'
import { Suspense } from 'react'
import { ServerCode } from './ServerCode'

export interface ClientCodeProps {
  code: string
  lang: string
  showLineNumbers?: boolean
  highlights?: string
  title?: string
}



export function ClientCode(props: ClientCodeProps) {
  const { resolvedTheme } = useTheme()
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <ServerCode {...props} theme={resolvedTheme || 'light'} />
    </Suspense>
  )
}
