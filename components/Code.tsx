import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

/**
 * Server Component example
 */

interface CodeProps {
    code: string;
    lang: string;
    showLineNumbers?: boolean;
    highlights?: string;
    theme?: string;
}

let highlighterInstance: any = null;


export async function Code({ code, lang, showLineNumbers = true, highlights, theme = 'light' }: CodeProps) {
    // Construct the markdown code block
    const codeBlock = [
        '```' + lang + (showLineNumbers ? ' showLineNumbers' : '') + (highlights ? ' {' + highlights + '}' : ''),
        code,
        '```'
    ].join('\n');

    const highlightedCode = await highlightCode(codeBlock, theme);

    return (
        <section className=' [&:not(:first-child)]:mt-6 '
            dangerouslySetInnerHTML={{
                __html: highlightedCode,
            }}
        />
    );
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
};

async function getHighlighter(theme: string) {
    // Create new highlighter for each theme to prevent caching
    const highlighter = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, getRehypePrettyCodeOptions(theme))
      .use(rehypeStringify);
    return highlighter;
  }

  async function highlightCode(code: string, theme: string) {
    const highlighter = await getHighlighter(theme);
    const file = await highlighter.process(code);
    return String(file);
  }
