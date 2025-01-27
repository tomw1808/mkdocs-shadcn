import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

interface CodeProps {
  code: string;
  lang: string;
  showLineNumbers?: boolean;
  highlights?: string;
  theme?: string;
}

interface HighlightedCodeProps {
  highlightedCode: string;
}

export function Code(props: HighlightedCodeProps) {
  return (
    <section 
      className=' [&:not(:first-child)]:mt-6'
      dangerouslySetInnerHTML={{
        __html: props.highlightedCode,
      }}
    />
  );
}

export async function highlightCode({ code, lang, showLineNumbers = true, highlights, theme = 'light' }: CodeProps) {
  // Construct the markdown code block
  const codeBlock = [
    '````' + lang + (showLineNumbers ? ' showLineNumbers' : '') + (highlights ? ' {' + highlights + '}' : ''),
    code,
    '````'
  ].join('\n');

  const highlighter = await getHighlighter(theme);
  const file = await highlighter.process(codeBlock);
  return String(file);
}

import { Options } from 'rehype-pretty-code';

const getRehypePrettyCodeOptions = (theme: string): Options => ({
  theme: theme === 'dark' ? 'github-dark-dimmed' : 'github-light',
  keepBackground: true,
  defaultLang: 'plaintext',
  transformers: [
    transformerCopyButton({
      visibility: 'always',
      feedbackDuration: 3_000,
    }),
  ]
});

async function getHighlighter(theme: string) {
  // Create new highlighter for each theme to prevent caching
  const highlighter = unified()
    .use(remarkParse as any)
    .use(remarkRehype as any)
    .use(rehypePrettyCode, getRehypePrettyCodeOptions(theme))
    .use(rehypeStringify as any);
  return highlighter;
}
