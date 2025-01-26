declare global {
  interface Window {
    pagefind: {
      search: (query: string) => Promise<{
        results: Array<{
          id: string;
          data: () => Promise<{
            url: string;
            meta: {
              title: string;
            };
            excerpt: string;
          }>;
        }>;
      }>;
      debouncedSearch: (query: string) => Promise<{
        results: Array<{
          id: string;
          data: () => Promise<{
            url: string;
            meta: {
              title: string;
            };
            excerpt: string;
          }>;
        }>;
      }>;
    };
  }
}

export {}
