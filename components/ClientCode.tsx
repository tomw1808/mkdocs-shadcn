'use client'

import { useTheme } from 'next-themes'
import { Code, highlightCode } from './Code'
import { Suspense } from 'react'

interface ClientCodeProps {
  code: string
  lang: string
  showLineNumbers?: boolean
  highlights?: string
  title?: string
}

async function ServerCode(props: ClientCodeProps & { theme: string }) {
  const highlightedCode = await highlightCode(props)
  return <Code highlightedCode={highlightedCode} />
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
