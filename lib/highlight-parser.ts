interface HighlightRange {
  start: number;
  end: number;
}

export function parseHighlightLines(meta: string): HighlightRange[] {
  // Match hl_line="..." pattern
  const hlMatch = /hl_lines="([^"]+)"/.exec(meta);
  if (!hlMatch) return [];

  const ranges: HighlightRange[] = [];
  
  // Split by spaces to handle multiple ranges
  const parts = hlMatch[1].split(/\s+/);
  
  for (const part of parts) {
    // Handle range (e.g., "1-5")
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        ranges.push({ start, end });
      }
    }
    // Handle single line (e.g., "1")
    else {
      const line = Number(part);
      if (!isNaN(line)) {
        ranges.push({ start: line, end: line });
      }
    }
  }

  return ranges;
}

export function insertHighlightAnnotations(code: string, ranges: HighlightRange[]): string {
  const lines = code.split('\n');
  
  // Sort ranges in reverse order to insert from bottom to top
  // This prevents line numbers from shifting as we insert
  const sortedRanges = [...ranges].sort((a, b) => b.start - a.start);
  
  for (const range of sortedRanges) {
    const annotation = `# !highlight(1:${range.end - range.start + 1})`;
    lines.splice(range.start - 1, 0, annotation);
  }
  
  return lines.join('\n');
}
