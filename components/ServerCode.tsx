import { ClientCodeProps } from "./ClientCode"
import { Code, highlightCode } from "./Code"

export async function ServerCode(props: ClientCodeProps & { theme: string }) {
  const highlightedCode = await highlightCode(props)
  return <Code highlightedCode={highlightedCode} />
}