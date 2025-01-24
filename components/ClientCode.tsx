'use client'

import { useTheme } from 'next-themes'
import { Code } from './Code'

interface ClientCodeProps {
  code: string
  lang: string
  showLineNumbers?: boolean
  highlights?: string
  title?: string
}

export function ClientCode(props: ClientCodeProps) {
  const { resolvedTheme } = useTheme()
  return <Code {...props} theme={resolvedTheme} />
}
