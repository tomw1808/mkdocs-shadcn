import { Pre, RawCode, highlight } from "codehike/code"
import { lineNumbers } from '@/components/codehike/line-numbers'
import { CopyButton } from '@/components/codehike/copy-button'

import { parseHighlightLines, insertHighlightAnnotations } from '@/lib/highlight-parser'
import { borderHandler } from "./codehike/highlight";



export async function CodeHikeCodeblock({ codeblock }: { codeblock: RawCode }) {
  // Parse highlight ranges from meta
  const ranges = parseHighlightLines(codeblock.meta);
  
  // Insert highlight annotations if needed
  if (ranges.length > 0) {
    codeblock.value = insertHighlightAnnotations(codeblock.value, ranges);
  }

  const highlighted = await highlight(codeblock, "github-from-css")
  console.log(highlighted)
  
  return <div className="relative">
    <CopyButton text={highlighted.code} />
    <Pre className="bg-gray-50 dark:bg-gray-900 p-2" code={highlighted} handlers={[borderHandler, lineNumbers]} />
  </div>
}
