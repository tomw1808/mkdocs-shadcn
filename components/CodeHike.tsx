import { Pre, RawCode, highlight } from "codehike/code"
import { lineNumbers } from '@/components/codehike/line-numbers'
import { CopyButton } from '@/components/codehike/copy-button'

import { parseHighlightLines } from '@/lib/highlight-parser'
import { borderHandler } from "./codehike/highlight";
import { wordWrap } from "./codehike/word-wrap";
import { cookies } from 'next/headers'



export async function CodeHikeCodeblock({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css")
  
  // Parse highlight ranges from meta and add to annotations
  const ranges = parseHighlightLines(codeblock.meta);
  if (ranges.length > 0) {
    highlighted.annotations = [
      ...(highlighted.annotations || []),
      ...ranges.map(range => ({
        name: 'highlight',
        query: '',
        fromLineNumber: range.start,
        toLineNumber: range.end
      }))
    ]
  }

  const title = codeblock.meta.match(/title="([^"]*)"/);




  
  return <div className="[&:not(:first-child)]:mt-6">
    {title && <div className="text-left p-2 text-sm font-light font-mono bg-gray-100 dark:bg-gray-900 border-b-2">
        {title[1]}
    </div>}<div className="relative">

    <CopyButton text={highlighted.code} />
    
    <Pre className="p-2 bg-muted" code={highlighted} handlers={[borderHandler, lineNumbers, wordWrap]} />

  </div>
  </div>
}
