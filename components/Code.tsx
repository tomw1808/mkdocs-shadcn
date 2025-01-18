import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

/**
 * Server Component example
 */

export async function Code({ code }: { code: string }) {

    const highlightedCode = await highlightCode(code);

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