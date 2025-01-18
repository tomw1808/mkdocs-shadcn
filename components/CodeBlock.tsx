'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { codeToHast } from 'shiki'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, JSX } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [nodes, setNodes] = useState<JSX.Element | null>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    async function highlight() {
      const hast = await codeToHast(code, {
        lang: language,
        theme: 'github-dark'
      })

      const rendered = toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        components: {
          pre: (props) => (
            <pre
              ref={preRef}
              className={`overflow-x-auto p-4 text-sm ${showLineNumbers ? 'pl-12' : ''}`}
              style={{ counterReset: 'line' }}
              {...props}
            />
          )
        }
      }) as JSX.Element

      setNodes(rendered)
    }

    highlight()
  }, [code, language, showLineNumbers])

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const onCopy = async () => {
    if (preRef.current?.textContent) {
      await navigator.clipboard.writeText(preRef.current.textContent)
      setCopied(true)
    }
  }

  if (!nodes) {
    return <div>Loading...</div>
  }

  return (
    <div className="group relative my-4 rounded-lg bg-zinc-950">
      {title && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="text-sm text-zinc-100">{title}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={onCopy}
          className="absolute right-3 top-3 z-10 rounded-lg border border-zinc-700 p-2 
                     opacity-0 transition group-hover:opacity-100 hover:bg-zinc-800"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <CopyIcon className="h-4 w-4 text-zinc-400" />
          )}
        </button>
        {nodes}
      </div>
    </div>
  )
}
