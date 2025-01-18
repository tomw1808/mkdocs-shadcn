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
}

export async function Code({ code, lang, showLineNumbers = true, highlights }: CodeProps) {
    // Construct the markdown code block
    const codeBlock = [
        '```' + lang + (showLineNumbers ? ' showLineNumbers' : '') + (highlights ? ' {' + highlights + '}' : ''),
        code,
        '```'
    ].join('\n');

    const highlightedCode = await highlightCode(codeBlock);

    return (
        <section
            dangerouslySetInnerHTML={{
                __html: highlightedCode,
            }}
        />
    );
}

import { Options } from 'rehype-pretty-code';

const rehypePrettyCodeOptions: Options = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: true,
  defaultLang: 'plaintext',
  transformers: [
    transformerCopyButton({
      visibility: 'always',
      feedbackDuration: 3_000,
    }),
  ]
};

async function highlightCode(code: string) {
    
    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, rehypePrettyCodeOptions)
        .use(rehypeStringify)
        .process(code);

    return String(file);
}
