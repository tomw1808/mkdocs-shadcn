import { Pre, RawCode, highlight } from "codehike/code"
import { lineNumbers } from '@/components/codehike/line-numbers'
import { CopyButton } from '@/components/codehike/copy-button'

import { parseHighlightLines, insertHighlightAnnotations } from '@/lib/highlight-parser'
import { borderHandler } from "./codehike/highlight";



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
  
  return <div className="relative">
    <CopyButton text={highlighted.code} />
    <Pre className="bg-gray-50 dark:bg-gray-900 p-2" code={highlighted} handlers={[borderHandler, lineNumbers]} />
  </div>
}
